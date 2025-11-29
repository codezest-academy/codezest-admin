"use client";

import { Users, BookOpen, Zap, Award } from "lucide-react";
import Xarrow, { Xwrapper } from "react-xarrows";

export default function WorkflowDiagram() {
  const steps = [
    {
      step: "01",
      title: "Create Your Account",
      description:
        "Sign up in seconds with your email. No credit card needed, no commitments.",
      icon: Users,
      color: "bg-primary-500",
    },
    {
      step: "02",
      title: "Choose Your Path",
      description:
        "Browse our courses and select the programming language or topic you want to master.",
      icon: BookOpen,
      color: "bg-primary-500",
    },
    {
      step: "03",
      title: "Learn & Practice",
      description:
        "Work through interactive lessons, complete quizzes, and get instant AI feedback on your code.",
      icon: Zap,
      color: "bg-primary-500",
    },
    {
      step: "04",
      title: "Earn & Showcase",
      description:
        "Complete courses, earn certificates, and build your portfolio to show employers.",
      icon: Award,
      color: "bg-success-500",
    },
  ];

  return (
    <div className="w-full bg-neutral-50 rounded-xl py-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
        <Xwrapper>
          {steps.map((item, i) => {
            const Icon = item.icon;
            const isEven = i % 2 === 1;

            return (
              <div
                key={i}
                className={`flex items-start gap-6 mb-40 last:mb-0 ${
                  isEven ? "flex-row-reverse justify-start" : "justify-start"
                }`}
              >
                {/* Icon */}
                <div id={`icon-${i}`} className="shrink-0 relative z-10">
                  <div
                    className={`h-16 w-16 rounded-full ${item.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Content Card */}
                <div className="max-w-sm bg-white rounded-lg p-5 shadow-md border border-neutral-200 relative z-10">
                  <div className="text-xs font-bold text-primary-600 mb-2">
                    STEP {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Arrows */}
          {steps.map((_, i) => {
            if (i === steps.length - 1) return null;
            return (
              <Xarrow
                key={i}
                start={`icon-${i}`}
                end={`icon-${i + 1}`}
                startAnchor="bottom"
                endAnchor="top"
                curveness={0.7}
                color="#94A3B8"
                strokeWidth={2}
                dashness={{ strokeLen: 5, nonStrokeLen: 5 }}
                showHead={true}
                headSize={6}
                path="smooth"
                zIndex={0}
              />
            );
          })}
        </Xwrapper>
      </div>
    </div>
  );
}
