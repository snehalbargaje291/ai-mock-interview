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
            Up to 5 listings monthly
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-4 text-xs">
            <li className="flex items-center text-gray-600">
              <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
              20 days only
            </li>
            <li className="flex items-center text-gray-600">
              <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
              Weekly Mail newsletter
            </li>
            <li className="flex items-center text-gray-600">
              <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
              Quota renewed monthly
            </li>
          </ul>
          <div className="mt-4">
            <Button className="inline-flex text-sm h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Buy
            </Button>
        </div>
      </motion.div>
      <motion.div
      variants={ third }
        className="flex-1 rounded-xl p-4 shadow-md bg-white dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        
          <p className="uppercase text-md font-medium text-gray-900">
            Standard
          </p>
          <p className="mt-4 text-gray-700 font-medium text-sm">
            $30 <span className="text-base font-normal">/listing</span>
          </p>
          <p className="mt-4 font-medium text-gray-700 text-xs">
            When free quota fully used
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-4 text-xs">
            <li className="flex items-center text-gray-600">
              <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
              30 days only
            </li>
            <li className="flex items-center text-gray-600">
              <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
              Twice weekly Mail newsletter
            </li>
            <li className="flex items-center text-gray-600">
              <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
              Social feed share (3 platforms)
            </li>
          </ul>
          <div className="mt-4">
            <Button className="inline-flex text-sm h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Buy
            </Button>
        </div>
      </motion.div>
      <motion.div
        variants={isSmallScreen ? third : second}
        className="flex-1 rounded-xl p-4 shadow-md bg-white dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
          <p className="uppercase text-md font-medium text-gray-900">
            Premium
          </p>
          <p className="mt-4 text-gray-700 font-medium text-sm">
            $50 <span className="text-base font-normal">/listing</span>
          </p>
          <p className="mt-4 font-medium text-gray-700 text-xs">
            Maximum visibility
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-4 text-xs">
            <li className="flex items-center text-gray-600">
              <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
              60 days only
            </li>
            <li className="flex items-center text-gray-600">
              <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
              Daily Mail newsletter
            </li>
            <li className="flex items-center text-gray-600">
              <Check size={18} className="w-4 h-4 mr-2 text-green-400" />
              Social feed share (5 platforms)
            </li>
          </ul>
          <div className="mt-4">
            <Button className="inline-flex text-sm h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Buy
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
