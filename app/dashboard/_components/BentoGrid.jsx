"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/utils/cn";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Check, Wallet2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";

export function BentoGridThirdDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  return (
    <motion.div ref={ref}
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    animate={
      inView
        ? { opacity: 1, y: 0, scale: 1 }
        : { opacity: 0, y: 100, scale: 0.95 }
    }
    transition={{ duration: 0.8 }}>
      <BentoGrid className="w-[100%] mx-auto pt-24 md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
    </motion.div>
  );
}

const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const third = {
    initial: {
      x: 0,
      rotate: 0,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-col md:flex-row gap-8 md:gap-2 w-full min-h-[20rem] p-4"
    >
      {/* Starter Plan */}
      <motion.div
        variants={isSmallScreen ? third : first}
        className="flex-1 rounded-xl p-4 shadow-md bg-white dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <p className="uppercase text-md font-medium text-gray-900">
          Starter
        </p>
        <p className="mt-4 text-gray-700 font-medium text-sm">
          Free
        </p>
        <p className="mt-4 font-medium text-gray-700 text-xs">
          Up to 3 mock interviews monthly
        </p>
        <ul className="mt-4 grid grid-cols-1 gap-4 text-xs">
          <li className="flex items-center text-gray-600">
            <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
            Basic AI-generated questions
          </li>
          <li className="flex items-center text-gray-600">
            <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
            Feedback comparison to expected responses
          </li>
          <li className="flex items-center text-gray-600">
            <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
            Limited storage for recordings
          </li>
        </ul>
        <div className="mt-4">
          <Button className="inline-flex text-sm h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Upgrade
          </Button>
        </div>
      </motion.div>

      {/* Standard Plan */}
      <motion.div
        variants={third}
        className="flex-1 rounded-xl p-4 shadow-md bg-white dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <p className="uppercase text-md font-medium text-gray-900">
          Standard
        </p>
        <p className="mt-4 text-gray-700 font-medium text-sm">
          $30 <span className="text-base font-normal">/month</span>
        </p>
        <p className="mt-4 font-medium text-gray-700 text-xs">
          Up to 10 mock interviews monthly
        </p>
        <ul className="mt-4 grid grid-cols-1 gap-4 text-xs">
          <li className="flex items-center text-gray-600">
            <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
            Advanced AI-generated questions
          </li>
          <li className="flex items-center text-gray-600">
            <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
            Detailed feedback and scoring
          </li>
          <li className="flex items-center text-gray-600">
            <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
            Cloud storage for recordings
          </li>
        </ul>
        <div className="mt-4">
          <Button className="inline-flex text-sm h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Upgrade
          </Button>
        </div>
      </motion.div>

      {/* Premium Plan */}
      <motion.div
        variants={isSmallScreen ? third : second}
        className="flex-1 rounded-xl p-4 shadow-md bg-white dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <p className="uppercase text-md font-medium text-gray-900">
          Premium
        </p>
        <p className="mt-4 text-gray-700 font-medium text-sm">
          $50 <span className="text-base font-normal">/month</span>
        </p>
        <p className="mt-4 font-medium text-gray-700 text-xs">
          Unlimited mock interviews
        </p>
        <ul className="mt-4 grid grid-cols-1 gap-4 text-xs">
          <li className="flex items-center text-gray-600">
            <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
            Customizable AI-generated questions
          </li>
          <li className="flex items-center text-gray-600">
            <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
            Detailed analytics and performance metrics
          </li>
          <li className="flex items-center text-gray-600">
            <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
            Full integration with interview recording tools
          </li>
        </ul>
        <div className="mt-4">
          <Button className="inline-flex text-sm h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Upgrade
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};


const items = [
  {
    title: "Pricing Plans",
    description: (
      <span className="text-sm">
        Understand the sentiment of your text with AI analysis.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <Wallet2 className="h-4 w-4 text-neutral-500" />,
  }
];
