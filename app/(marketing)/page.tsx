import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { BookOpen, Users, Activity, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 p-8 font-primary">
      <main className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 font-serif">
              CodeZest Admin
            </h1>
            <p className="text-neutral-500 mt-2">
              Manage your learning platform with ease.
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">Documentation</Button>
            <Button variant="premium">Upgrade Plan</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,345</div>
              <p className="text-xs text-neutral-500">+18% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-neutral-500">+3 new this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Quiz Completions
              </CardTitle>
              <Activity className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,920</div>
              <p className="text-xs text-neutral-500">+24% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Certificates Issued
              </CardTitle>
              <Award className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,203</div>
              <p className="text-xs text-neutral-500">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions across the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-lg bg-neutral-50 border border-neutral-100"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                      JS
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">
                        John Smith completed &quot;React Basics&quot;
                      </p>
                      <p className="text-sm text-neutral-500">2 minutes ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you perform.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button className="h-24 flex-col gap-2" variant="outline">
                <BookOpen className="h-6 w-6" />
                Create Course
              </Button>
              <Button className="h-24 flex-col gap-2" variant="outline">
                <Users className="h-6 w-6" />
                Add Student
              </Button>
              <Button className="h-24 flex-col gap-2" variant="outline">
                <Activity className="h-6 w-6" />
                Review Quizzes
              </Button>
              <Button className="h-24 flex-col gap-2" variant="outline">
                <Award className="h-6 w-6" />
                Issue Certificate
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
