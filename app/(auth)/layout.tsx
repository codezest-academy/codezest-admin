import { Spotlight } from "@/components/ui/spotlight-new";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Auth Form */}
      <div className="flex flex-col justify-center items-center p-4 sm:p-8 bg-white">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>

      {/* Right: Feature Showcase */}
      <div className="hidden lg:flex flex-col justify-center items-center p-8 xl:p-12 bg-neutral-950 text-white relative overflow-hidden">
        {/* Spotlight Effect */}
        <Spotlight
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(217, 91%, 60%, .12) 0, hsla(217, 91%, 60%, .04) 50%, hsla(217, 91%, 60%, 0) 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(217, 91%, 60%, .08) 0, hsla(217, 91%, 60%, .03) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(217, 91%, 60%, .06) 0, hsla(217, 91%, 60%, .02) 80%, transparent 100%)"
        />

        {/* Dot Background Pattern */}
        <div className="absolute inset-0 [background-size:20px_20px] [background-image:radial-gradient(#404040_1px,transparent_1px)]" />

        {/* Radial gradient mask for faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        <div className="relative z-10 max-w-lg text-center space-y-6 px-4">
          <div className="h-12 w-12 bg-primary-500 rounded-xl mx-auto flex items-center justify-center mb-6 shadow-primary-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h2 className="text-3xl xl:text-4xl font-bold font-display bg-gradient-to-b from-neutral-100 via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Master Coding with CodeZest
          </h2>
          <p className="text-neutral-300 text-base xl:text-lg leading-relaxed">
            Join thousands of developers leveling up their skills with our
            interactive quizzes and comprehensive courses.
          </p>
        </div>
      </div>
    </div>
  );
}
