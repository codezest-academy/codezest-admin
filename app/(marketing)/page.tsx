import { Button } from "@/ui/button";
import {
  BookOpen,
  Users,
  Activity,
  Award,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { WobbleCard } from "@/components/ui/wobble-card";

export default function Home() {
  return (
    <div className="font-primary">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center w-full flex-col px-4 pt-24 pb-24 md:pb-32 min-h-screen bg-neutral-50 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50/80 backdrop-blur-sm px-5 py-2 text-sm font-semibold text-primary-700 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2.5 animate-pulse"></span>
            Level up your code game!
          </div>

          <div className="space-y-6 mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 font-display tracking-tight leading-tight">
              Master Coding with
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-primary-500 font-display tracking-tight leading-tight">
              CodeZest Academy
            </h1>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
            The complete platform for developers. Interactive courses,
            AI-powered code analysis, and enterprise-grade certification—all in
            one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-10 text-lg shadow-primary-lg font-semibold hover:shadow-primary transition-all"
              >
                View Dashboard Demo
              </Button>
            </Link>
            <Link href="#capabilities" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-10 text-lg bg-white hover:bg-neutral-50 font-semibold border-2 border-neutral-300 hover:border-primary-300 transition-all"
              >
                Explore Capabilities
              </Button>
            </Link>
          </div>

          {/* Dashboard Preview Placeholder */}
          <div className="relative w-full max-w-6xl mx-auto rounded-xl shadow-2xl border border-neutral-200 overflow-hidden bg-neutral-900 aspect-video group">
            <div className="absolute inset-0 bg-neutral-800/50 flex items-center justify-center group-hover:bg-neutral-800/30 transition-all">
              <div className="text-center">
                <p className="text-white/80 font-medium mb-2">
                  Interactive Dashboard Preview
                </p>
                <Button
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  Click to Explore
                </Button>
              </div>
            </div>
            {/* We will replace this with the actual screenshot later */}
            <img
              src="/dashboard-preview.png"
              alt="CodeZest Dashboard Interface"
              className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-display mb-4">
              Enterprise-Grade Capabilities
            </h2>
            <p className="text-lg text-neutral-600">
              A robust admin infrastructure designed for scalability and
              performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
            {[
              {
                icon: Zap,
                title: "AI Code Analysis",
                description:
                  "Get instant feedback on your code with our advanced AI engine. Fix bugs faster and learn best practices in real-time.",
                color: "bg-white",
                textColor: "text-neutral-900",
                iconBg: "bg-primary-50",
                iconColor: "text-primary-600",
              },
              {
                icon: BookOpen,
                title: "Structured Learning Paths",
                description:
                  "Follow curated learning paths designed by industry experts. Progress from fundamentals to advanced concepts systematically.",
                color: "bg-primary-100",
                textColor: "text-primary-700",
                iconBg: "bg-white/50",
                iconColor: "text-primary-700",
              },
              {
                icon: Activity,
                title: "Interactive Quizzes",
                description:
                  "Test your knowledge with dynamic quizzes that adapt to your skill level. Track your progress and identify areas for improvement.",
                color: "bg-white",
                textColor: "text-neutral-900",
                iconBg: "bg-primary-50",
                iconColor: "text-primary-600",
              },
              {
                icon: Award,
                title: "Certified Growth",
                description:
                  "Earn industry-recognized certificates upon course completion. Showcase your skills to potential employers with verified credentials.",
                color: "bg-white",
                textColor: "text-neutral-900",
                iconBg: "bg-primary-50",
                iconColor: "text-primary-600",
              },
              {
                icon: Users,
                title: "Community Driven",
                description:
                  "Join a thriving community of developers. Share knowledge, collaborate on projects, and get help when you need it.",
                color: "bg-white",
                textColor: "text-neutral-900",
                iconBg: "bg-primary-50",
                iconColor: "text-primary-600",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description:
                  "Bank-grade security for your data. SSO, role-based access control, and compliance features for large teams.",
                color: "bg-primary-100",
                textColor: "text-primary-700",
                iconBg: "bg-white/50",
                iconColor: "text-primary-700",
              },
              {
                icon: Globe,
                title: "Global Access",
                description:
                  "Learn from anywhere, anytime. Our platform is optimized for all devices, ensuring a seamless experience on web and mobile.",
                color: "bg-white",
                textColor: "text-neutral-900",
                iconBg: "bg-primary-50",
                iconColor: "text-primary-600",
              },
            ].map((feature, i) => (
              <WobbleCard
                key={i}
                containerClassName={`col-span-1 min-h-[300px] ${feature.color}`}
                className=""
              >
                <div className="max-w-xs">
                  <div
                    className={`h-12 w-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-6 shadow-sm`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <h2
                    className={`text-left text-balance text-xl md:text-2xl font-bold tracking-[-0.015em] ${feature.textColor}`}
                  >
                    {feature.title}
                  </h2>
                  <p
                    className={`mt-4 text-left text-base/6 ${feature.textColor} opacity-90`}
                  >
                    {feature.description}
                  </p>
                </div>
              </WobbleCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-display mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600">
              Start your coding journey in 4 simple steps
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  step: "01",
                  title: "Create Your Account",
                  description:
                    "Sign up in seconds with your email. No credit card needed, no commitments.",
                  icon: Users,
                  color: "bg-primary-50",
                  textColor: "text-primary-600",
                },
                {
                  step: "02",
                  title: "Choose Your Path",
                  description:
                    "Browse our courses and select the programming language or topic you want to master.",
                  icon: BookOpen,
                  color: "bg-primary-100",
                  textColor: "text-primary-700",
                },
                {
                  step: "03",
                  title: "Learn & Practice",
                  description:
                    "Work through interactive lessons, complete quizzes, and get instant AI feedback on your code.",
                  icon: Zap,
                  color: "bg-primary-200",
                  textColor: "text-primary-800",
                },
                {
                  step: "04",
                  title: "Earn & Showcase",
                  description:
                    "Complete courses, earn certificates, and build your portfolio to show employers.",
                  icon: Award,
                  color: "bg-success-100",
                  textColor: "text-success-700",
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="flex gap-6">
                    <div className="shrink-0">
                      <div
                        className={`h-16 w-16 rounded-2xl ${item.color} flex items-center justify-center shadow-sm`}
                      >
                        <item.icon className={`h-8 w-8 ${item.textColor}`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-neutral-400 mb-2">
                        STEP {item.step}
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-20 left-8 w-0.5 h-16 bg-gradient-to-b from-neutral-200 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-display mb-6">
                Built by developers, <br />
                for developers.
              </h2>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                CodeZest was born from a simple idea: learning to code should be
                intuitive, interactive, and directly applicable to the real
                world.
              </p>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                We combine cutting-edge AI technology with proven pedagogical
                methods to create a learning experience that adapts to you.
                Whether you're writing your first line of code or architecting
                complex systems, CodeZest grows with you.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    50k+
                  </div>
                  <div className="text-sm text-neutral-500">
                    Active Learners
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    100+
                  </div>
                  <div className="text-sm text-neutral-500">
                    Enterprise Partners
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-transparent rounded-3xl transform rotate-3 scale-105 -z-10" />
              <div className="bg-neutral-900 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Activity className="h-32 w-32" />
                </div>
                <div className="font-mono text-sm text-primary-300 mb-4">
                  // Mission Statement
                </div>
                <p className="text-xl font-medium leading-relaxed">
                  "To democratize software engineering education by providing
                  accessible, high-quality, and intelligent learning tools to
                  everyone, everywhere."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary-500" />
                  <div>
                    <div className="font-bold">Alex Johnson</div>
                    <div className="text-sm text-neutral-400">
                      Founder & CEO
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            Explore the Dashboard
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            Experience the power of the CodeZest admin interface firsthand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="h-14 px-10 text-lg bg-white text-neutral-900 hover:bg-neutral-100"
              >
                Launch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
