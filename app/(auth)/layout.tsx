import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left: Auth Form - Scrollable */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="flex flex-col justify-center items-center min-h-full p-4 sm:p-8">
          <div className="w-full max-w-md space-y-8">{children}</div>
        </div>
      </div>

      {/* Right: Dashboard Preview - Fixed */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-neutral-50">
        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-center items-center p-8 xl:p-12 w-full">
          {/* Logo/Brand */}
          <div className="absolute top-8 left-8">
            <div className="h-12 w-12 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg">
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
          </div>

          {/* Dashboard Preview with Embossed Effect */}
          <div className="w-full max-w-2xl">
            {/* Outer container - White card (30% of 60-30-10 rule) */}
            <div className="relative rounded-xl bg-white p-4 shadow-xl border border-neutral-200">
              {/* Inner embossed container */}
              <div className="relative rounded-lg overflow-hidden shadow-inner border border-neutral-100">
                <Image
                  src="/dashboard-preview.png"
                  alt="CodeZest Dashboard Preview"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Subtle inner shadow overlay */}
                <div className="absolute inset-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)]" />
              </div>
            </div>

            {/* Caption */}
            <div className="mt-8 text-center space-y-3">
              <h2 className="text-2xl xl:text-3xl font-bold text-neutral-900">
                Your learning dashboard awaits
              </h2>
              <p className="text-neutral-600 text-sm xl:text-base leading-relaxed max-w-md mx-auto">
                Track your progress, master new skills, and level up your coding
                journey with our interactive platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
