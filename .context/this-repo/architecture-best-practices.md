# CodeZest Admin - Architecture & Best Practices

**Enterprise-Grade React/Next.js Architecture with SOLID Principles**

---

## 🏗️ Architecture Overview

This document defines the architectural patterns, SOLID principles implementation, and best practices for the CodeZest Admin application.

### Core Principles

1. **SOLID Principles** - Applied to React components and TypeScript code
2. **Clean Architecture** - Separation of concerns and dependency inversion
3. **Domain-Driven Design** - Business logic organized by domain
4. **Feature-Sliced Design** - Scalable folder structure
5. **Composition over Inheritance** - React component patterns
6. **Immutability** - Predictable state management
7. **Type Safety** - Comprehensive TypeScript usage

---

## 📁 Project Structure (Feature-Sliced Design)

```
codezest-admin/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/              # Dashboard route group
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── courses/
│   │   ├── quizzes/
│   │   ├── students/
│   │   └── analytics/
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   ├── courses/
│   │   └── quizzes/
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── providers.tsx             # App providers
│
├── src/
│   ├── features/                 # Feature modules (business logic)
│   │   ├── auth/
│   │   │   ├── api/              # API calls
│   │   │   ├── components/       # Feature-specific components
│   │   │   ├── hooks/            # Feature-specific hooks
│   │   │   ├── types/            # Feature types
│   │   │   ├── utils/            # Feature utilities
│   │   │   └── index.ts          # Public API
│   │   ├── courses/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   ├── quizzes/
│   │   └── analytics/
│   │
│   ├── shared/                   # Shared across features
│   │   ├── api/                  # API client, interceptors
│   │   │   ├── client.ts
│   │   │   ├── interceptors.ts
│   │   │   └── types.ts
│   │   ├── components/           # Shared business components
│   │   │   ├── DataTable/
│   │   │   ├── FormBuilder/
│   │   │   └── Charts/
│   │   ├── hooks/                # Shared hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useDebounce.ts
│   │   │   └── useLocalStorage.ts
│   │   ├── lib/                  # Shared utilities
│   │   │   ├── validation/
│   │   │   ├── formatters/
│   │   │   └── constants/
│   │   ├── types/                # Shared types
│   │   │   ├── api.types.ts
│   │   │   ├── common.types.ts
│   │   │   └── domain.types.ts
│   │   └── store/                # State management
│   │       ├── slices/
│   │       └── index.ts
│   │
│   ├── entities/                 # Domain entities
│   │   ├── user/
│   │   │   ├── model/            # Data models
│   │   │   ├── api/              # Entity API
│   │   │   └── types/            # Entity types
│   │   ├── course/
│   │   ├── quiz/
│   │   └── student/
│   │
│   ├── widgets/                  # Complex UI blocks
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── CourseCard/
│   │   └── QuizBuilder/
│   │
│   └── ui/                       # UI components (shadcn/ui + custom)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       └── ...
│
├── public/                       # Static assets
├── .context/                     # Project documentation
│   ├── this-repo/
│   └── project-wide/
├── components.json               # shadcn/ui config
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🎯 SOLID Principles in React/TypeScript

### 1. Single Responsibility Principle (SRP)

**Definition**: A component/function should have only one reason to change.

#### ❌ Bad Example (Multiple Responsibilities)

```tsx
// UserProfile.tsx - Doing too much!
export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Data fetching
  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  // Validation logic
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Formatting logic
  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  // UI rendering
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1>{user?.name}</h1>
          <p>{validateEmail(user?.email) ? user.email : "Invalid"}</p>
          <p>Joined: {formatDate(user?.createdAt)}</p>
        </div>
      )}
    </div>
  );
}
```

#### ✅ Good Example (Single Responsibility)

```tsx
// hooks/useUser.ts - Data fetching responsibility
export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
}

// lib/validation.ts - Validation responsibility
export const emailValidator = {
  validate: (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  message: "Invalid email format",
};

// lib/formatters.ts - Formatting responsibility
export const dateFormatter = {
  toLocalDate: (date: string): string => new Date(date).toLocaleDateString(),
  toRelative: (date: string): string => {
    // Implementation
  },
};

// components/UserProfile.tsx - UI rendering responsibility
export function UserProfile({ userId }: { userId: string }) {
  const { user, loading, error } = useUser(userId);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <NotFound />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <UserEmail email={user.email} />
        <UserJoinDate date={user.createdAt} />
      </CardContent>
    </Card>
  );
}

// components/UserEmail.tsx - Email display responsibility
function UserEmail({ email }: { email: string }) {
  const isValid = emailValidator.validate(email);

  return (
    <div
      className={cn("flex items-center gap-2", !isValid && "text-error-500")}
    >
      <Mail className="w-4 h-4" />
      <span>{email}</span>
      {!isValid && <Badge variant="destructive">Invalid</Badge>}
    </div>
  );
}

// components/UserJoinDate.tsx - Date display responsibility
function UserJoinDate({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-2 text-neutral-600">
      <Calendar className="w-4 h-4" />
      <span>Joined {dateFormatter.toLocalDate(date)}</span>
    </div>
  );
}
```

---

### 2. Open/Closed Principle (OCP)

**Definition**: Components should be open for extension but closed for modification.

#### ✅ Good Example (Extensible Button)

```tsx
// ui/button.tsx - Base component closed for modification
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-all",
  {
    variants: {
      variant: {
        primary: "bg-primary-500 text-white hover:bg-primary-600",
        secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
        success: "bg-success-500 text-white hover:bg-success-600",
        danger: "bg-error-500 text-white hover:bg-error-600",
        ghost: "hover:bg-neutral-100",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Spinner className="mr-2" /> : null}
        {children}
      </button>
    );
  }
);

// features/courses/components/SaveCourseButton.tsx - Extended without modification
export function SaveCourseButton({ courseId, onSave }: SaveCourseButtonProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(courseId);
    setIsSaving(false);
  };

  return (
    <Button
      variant="success"
      size="lg"
      isLoading={isSaving}
      onClick={handleSave}
    >
      <Save className="mr-2 h-4 w-4" />
      Save Course
    </Button>
  );
}
```

---

### 3. Liskov Substitution Principle (LSP)

**Definition**: Subtypes must be substitutable for their base types.

#### ✅ Good Example (Consistent Interface)

```tsx
// shared/components/FormField/types.ts
export interface FormFieldProps {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

// shared/components/FormField/TextField.tsx
export function TextField({
  name,
  label,
  error,
  required,
  disabled,
  ...props
}: FormFieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        disabled={disabled}
        aria-invalid={!!error}
        {...props}
      />
      {error && <p className="text-sm text-error-500">{error}</p>}
    </div>
  );
}

// shared/components/FormField/SelectField.tsx
export function SelectField({
  name,
  label,
  error,
  required,
  disabled,
  options,
  ...props
}: FormFieldProps & { options: Option[] }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-error-500 ml-1">*</span>}
      </Label>
      <Select disabled={disabled} {...props}>
        <SelectTrigger id={name}>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-error-500">{error}</p>}
    </div>
  );
}

// Usage - Both can be used interchangeably
function CourseForm() {
  return (
    <form>
      <TextField name="title" label="Course Title" required />
      <SelectField
        name="category"
        label="Category"
        required
        options={categories}
      />
    </form>
  );
}
```

---

### 4. Interface Segregation Principle (ISP)

**Definition**: Clients should not depend on interfaces they don't use.

#### ❌ Bad Example (Fat Interface)

```tsx
// Bad: One large interface
interface UserActions {
  // Admin only
  deleteUser: (id: string) => void;
  banUser: (id: string) => void;
  promoteToAdmin: (id: string) => void;

  // Student only
  enrollInCourse: (courseId: string) => void;
  submitQuiz: (quizId: string, answers: Answer[]) => void;

  // Teacher only
  createCourse: (course: Course) => void;
  gradeQuiz: (quizId: string, grade: number) => void;

  // Common
  updateProfile: (data: ProfileData) => void;
  logout: () => void;
}
```

#### ✅ Good Example (Segregated Interfaces)

```tsx
// shared/types/user.types.ts

// Base interface - common to all users
export interface BaseUserActions {
  updateProfile: (data: ProfileData) => Promise<void>;
  logout: () => Promise<void>;
}

// Role-specific interfaces
export interface AdminActions extends BaseUserActions {
  deleteUser: (id: string) => Promise<void>;
  banUser: (id: string) => Promise<void>;
  promoteToAdmin: (id: string) => Promise<void>;
}

export interface StudentActions extends BaseUserActions {
  enrollInCourse: (courseId: string) => Promise<void>;
  submitQuiz: (quizId: string, answers: Answer[]) => Promise<void>;
  viewGrades: () => Promise<Grade[]>;
}

export interface TeacherActions extends BaseUserActions {
  createCourse: (course: Course) => Promise<void>;
  gradeQuiz: (quizId: string, grade: number) => Promise<void>;
  viewStudentProgress: (studentId: string) => Promise<Progress>;
}

// Implementation
export class AdminService implements AdminActions {
  async updateProfile(data: ProfileData) {
    /* ... */
  }
  async logout() {
    /* ... */
  }
  async deleteUser(id: string) {
    /* ... */
  }
  async banUser(id: string) {
    /* ... */
  }
  async promoteToAdmin(id: string) {
    /* ... */
  }
}

export class StudentService implements StudentActions {
  async updateProfile(data: ProfileData) {
    /* ... */
  }
  async logout() {
    /* ... */
  }
  async enrollInCourse(courseId: string) {
    /* ... */
  }
  async submitQuiz(quizId: string, answers: Answer[]) {
    /* ... */
  }
  async viewGrades() {
    /* ... */
  }
}
```

---

### 5. Dependency Inversion Principle (DIP)

**Definition**: Depend on abstractions, not concretions.

#### ✅ Good Example (Dependency Injection)

```tsx
// shared/api/types.ts - Abstraction
export interface ApiClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>;
  post<T>(url: string, data: unknown, config?: RequestConfig): Promise<T>;
  put<T>(url: string, data: unknown, config?: RequestConfig): Promise<T>;
  delete<T>(url: string, config?: RequestConfig): Promise<T>;
}

// shared/api/axios-client.ts - Concrete implementation
export class AxiosApiClient implements ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data: unknown,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  // ... other methods
}

// features/courses/api/course-repository.ts - Depends on abstraction
export class CourseRepository {
  constructor(private apiClient: ApiClient) {}

  async getCourses(): Promise<Course[]> {
    return this.apiClient.get<Course[]>("/courses");
  }

  async getCourse(id: string): Promise<Course> {
    return this.apiClient.get<Course>(`/courses/${id}`);
  }

  async createCourse(course: CreateCourseDto): Promise<Course> {
    return this.apiClient.post<Course>("/courses", course);
  }
}

// app/providers.tsx - Dependency injection
const apiClient = new AxiosApiClient(process.env.NEXT_PUBLIC_API_URL!);
const courseRepository = new CourseRepository(apiClient);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApiClientProvider value={apiClient}>
      <CourseRepositoryProvider value={courseRepository}>
        {children}
      </CourseRepositoryProvider>
    </ApiClientProvider>
  );
}

// features/courses/hooks/useCourses.ts - Uses injected dependency
export function useCourses() {
  const repository = useCourseRepository();

  return useQuery({
    queryKey: ["courses"],
    queryFn: () => repository.getCourses(),
  });
}
```

---

## 🎨 Design Patterns

### 1. Repository Pattern

**Purpose**: Separate data access logic from business logic.

```tsx
// entities/course/api/course.repository.ts
export interface ICourseRepository {
  findAll(filters?: CourseFilters): Promise<Course[]>;
  findById(id: string): Promise<Course | null>;
  create(data: CreateCourseDto): Promise<Course>;
  update(id: string, data: UpdateCourseDto): Promise<Course>;
  delete(id: string): Promise<void>;
}

export class CourseRepository implements ICourseRepository {
  constructor(private apiClient: ApiClient) {}

  async findAll(filters?: CourseFilters): Promise<Course[]> {
    const queryString = filters ? this.buildQueryString(filters) : "";
    return this.apiClient.get<Course[]>(`/courses${queryString}`);
  }

  async findById(id: string): Promise<Course | null> {
    try {
      return await this.apiClient.get<Course>(`/courses/${id}`);
    } catch (error) {
      if (error.status === 404) return null;
      throw error;
    }
  }

  async create(data: CreateCourseDto): Promise<Course> {
    return this.apiClient.post<Course>("/courses", data);
  }

  async update(id: string, data: UpdateCourseDto): Promise<Course> {
    return this.apiClient.put<Course>(`/courses/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    await this.apiClient.delete(`/courses/${id}`);
  }

  private buildQueryString(filters: CourseFilters): string {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, String(value));
    });
    return params.toString() ? `?${params.toString()}` : "";
  }
}
```

---

### 2. Factory Pattern

**Purpose**: Create objects without specifying exact class.

```tsx
// shared/components/Charts/factory.ts
export type ChartType = "line" | "bar" | "pie" | "area";

export interface ChartProps {
  data: ChartData;
  title?: string;
  height?: number;
}

export class ChartFactory {
  static create(type: ChartType, props: ChartProps): React.ReactElement {
    switch (type) {
      case "line":
        return <LineChart {...props} />;
      case "bar":
        return <BarChart {...props} />;
      case "pie":
        return <PieChart {...props} />;
      case "area":
        return <AreaChart {...props} />;
      default:
        throw new Error(`Unknown chart type: ${type}`);
    }
  }
}

// Usage
function AnalyticsDashboard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {ChartFactory.create("line", {
        data: performanceData,
        title: "Performance",
      })}
      {ChartFactory.create("bar", {
        data: enrollmentData,
        title: "Enrollments",
      })}
    </div>
  );
}
```

---

### 3. Observer Pattern (Pub/Sub)

**Purpose**: Define one-to-many dependency between objects.

```tsx
// shared/lib/event-bus.ts
type EventCallback<T = any> = (data: T) => void;

export class EventBus {
  private events: Map<string, EventCallback[]> = new Map();

  subscribe<T>(event: string, callback: EventCallback<T>): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    this.events.get(event)!.push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.events.get(event);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) callbacks.splice(index, 1);
      }
    };
  }

  publish<T>(event: string, data: T): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }

  clear(event?: string): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
}

export const eventBus = new EventBus();

// Usage
// Publisher
function CourseCreatedNotification({ courseId }: { courseId: string }) {
  const handleCreate = async () => {
    const course = await createCourse(data);
    eventBus.publish("course:created", course);
  };

  return <Button onClick={handleCreate}>Create Course</Button>;
}

// Subscriber
function CourseListRefresher() {
  const { refetch } = useCourses();

  useEffect(() => {
    const unsubscribe = eventBus.subscribe("course:created", () => {
      refetch();
      toast.success("Course list updated!");
    });

    return unsubscribe;
  }, [refetch]);

  return null;
}
```

---

### 4. Strategy Pattern

**Purpose**: Define family of algorithms, encapsulate each one.

```tsx
// features/quizzes/lib/grading-strategies.ts
export interface GradingStrategy {
  calculate(answers: Answer[], correctAnswers: Answer[]): number;
  getPassingScore(): number;
}

export class StandardGradingStrategy implements GradingStrategy {
  calculate(answers: Answer[], correctAnswers: Answer[]): number {
    const correct = answers.filter(
      (ans, i) => ans === correctAnswers[i]
    ).length;
    return (correct / correctAnswers.length) * 100;
  }

  getPassingScore(): number {
    return 60;
  }
}

export class WeightedGradingStrategy implements GradingStrategy {
  constructor(private weights: number[]) {}

  calculate(answers: Answer[], correctAnswers: Answer[]): number {
    let totalScore = 0;
    let totalWeight = 0;

    answers.forEach((ans, i) => {
      const weight = this.weights[i] || 1;
      totalWeight += weight;
      if (ans === correctAnswers[i]) {
        totalScore += weight;
      }
    });

    return (totalScore / totalWeight) * 100;
  }

  getPassingScore(): number {
    return 70;
  }
}

export class QuizGrader {
  constructor(private strategy: GradingStrategy) {}

  setStrategy(strategy: GradingStrategy): void {
    this.strategy = strategy;
  }

  grade(answers: Answer[], correctAnswers: Answer[]): QuizResult {
    const score = this.strategy.calculate(answers, correctAnswers);
    const passingScore = this.strategy.getPassingScore();

    return {
      score,
      passed: score >= passingScore,
      passingScore,
    };
  }
}

// Usage
const standardGrader = new QuizGrader(new StandardGradingStrategy());
const weightedGrader = new QuizGrader(
  new WeightedGradingStrategy([1, 2, 2, 3])
);

const result = standardGrader.grade(userAnswers, correctAnswers);
```

---

### 5. Adapter Pattern

**Purpose**: Convert interface of class into another interface.

```tsx
// shared/lib/adapters/date-adapter.ts
export interface DateAdapter {
  format(date: Date, format: string): string;
  parse(dateString: string, format: string): Date;
  addDays(date: Date, days: number): Date;
  isValid(date: Date): boolean;
}

// Adapter for date-fns
export class DateFnsAdapter implements DateAdapter {
  format(date: Date, formatStr: string): string {
    return format(date, formatStr);
  }

  parse(dateString: string, formatStr: string): Date {
    return parse(dateString, formatStr, new Date());
  }

  addDays(date: Date, days: number): Date {
    return addDays(date, days);
  }

  isValid(date: Date): boolean {
    return isValid(date);
  }
}

// Adapter for Day.js (if we switch libraries)
export class DayJsAdapter implements DateAdapter {
  format(date: Date, formatStr: string): string {
    return dayjs(date).format(formatStr);
  }

  parse(dateString: string, formatStr: string): Date {
    return dayjs(dateString, formatStr).toDate();
  }

  addDays(date: Date, days: number): Date {
    return dayjs(date).add(days, "day").toDate();
  }

  isValid(date: Date): boolean {
    return dayjs(date).isValid();
  }
}

// Usage - Easy to swap implementations
const dateAdapter: DateAdapter = new DateFnsAdapter();
// const dateAdapter: DateAdapter = new DayJsAdapter();

export const formatDate = (date: Date) =>
  dateAdapter.format(date, "MMM dd, yyyy");
```

---

### 6. Compound Component Pattern

**Purpose**: Create flexible, composable components.

```tsx
// shared/components/Tabs/index.tsx
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export function Tabs({
  defaultTab,
  children,
}: {
  defaultTab: string;
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex border-b border-neutral-200" role="tablist">
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={cn(
        "px-4 py-2 font-medium transition-colors",
        isActive
          ? "border-b-2 border-primary-500 text-primary-500"
          : "text-neutral-600 hover:text-neutral-900"
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");

  const { activeTab } = context;

  if (activeTab !== value) return null;

  return (
    <div role="tabpanel" className="p-4">
      {children}
    </div>
  );
}

// Usage - Highly composable
function CourseDetails() {
  return (
    <Tabs defaultTab="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <CourseOverview />
      </TabsContent>

      <TabsContent value="curriculum">
        <CourseCurriculum />
      </TabsContent>

      <TabsContent value="reviews">
        <CourseReviews />
      </TabsContent>
    </Tabs>
  );
}
```

---

## 🔧 Best Practices

### 1. Custom Hooks for Logic Reuse

```tsx
// shared/hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// shared/hooks/useLocalStorage.ts
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// shared/hooks/useIntersectionObserver.ts
export function useIntersectionObserver(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const node = ref?.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setEntry(entry),
      options
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, options]);

  return entry;
}
```

---

### 2. Error Boundaries

```tsx
// shared/components/ErrorBoundary.tsx
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <AlertCircle className="w-16 h-16 text-error-500 mb-4" />
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-neutral-600 mb-4">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary onError={(error) => logErrorToService(error)}>
      <Dashboard />
    </ErrorBoundary>
  );
}
```

---

### 3. Type-Safe API Calls

```tsx
// shared/api/types.ts
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, string[]>;
}

// shared/api/client.ts
export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new ApiException(error.message, error.code, error.details);
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiException) throw error;
      throw new ApiException("Network error", "NETWORK_ERROR");
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export class ApiException extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiException";
  }
}
```

---

### 4. Form Validation with Zod

```tsx
// features/courses/schemas/course.schema.ts
import { z } from "zod";

export const createCourseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  category: z.enum(["programming", "design", "business", "marketing"]),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  price: z
    .number()
    .min(0, "Price must be positive")
    .max(9999, "Price is too high"),
  duration: z
    .number()
    .int("Duration must be a whole number")
    .min(1, "Duration must be at least 1 hour"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  thumbnail: z.string().url("Must be a valid URL").optional(),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;

// features/courses/components/CreateCourseForm.tsx
export function CreateCourseForm() {
  const form = useForm<CreateCourseInput>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "programming",
      difficulty: "beginner",
      price: 0,
      duration: 1,
      tags: [],
    },
  });

  const onSubmit = async (data: CreateCourseInput) => {
    try {
      await createCourse(data);
      toast.success("Course created successfully!");
    } catch (error) {
      toast.error("Failed to create course");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input placeholder="Introduction to React" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Other fields... */}

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Creating..." : "Create Course"}
        </Button>
      </form>
    </Form>
  );
}
```

---

## 📋 Code Quality Checklist

### Before Committing Code

- [ ] **TypeScript**: No `any` types, all types defined
- [ ] **SOLID**: Each component has single responsibility
- [ ] **DRY**: No duplicated logic, extracted to hooks/utils
- [ ] **Naming**: Clear, descriptive variable/function names
- [ ] **Comments**: Complex logic is documented
- [ ] **Error Handling**: All async operations have try/catch
- [ ] **Accessibility**: ARIA labels, keyboard navigation
- [ ] **Performance**: Memoization where needed (useMemo, useCallback)
- [ ] **Testing**: Unit tests for business logic
- [ ] **Linting**: No ESLint errors or warnings

---

## 🎯 Summary

This architecture ensures:

✅ **Maintainability** - SOLID principles make code easy to modify  
✅ **Scalability** - Feature-sliced design supports growth  
✅ **Testability** - Dependency injection enables easy testing  
✅ **Type Safety** - TypeScript prevents runtime errors  
✅ **Reusability** - Design patterns promote code reuse  
✅ **Performance** - Best practices optimize rendering  
✅ **Developer Experience** - Clear structure, easy onboarding

---

**Document Version**: 1.0  
**Last Updated**: November 24, 2025  
**Maintained by**: CodeZest Development Team
