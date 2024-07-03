"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/utils/cn";
// import React from "react";
// import {
//   IconBoxAlignRightFilled,
//   IconClipboardCopy,
//   IconFileBroken,
//   IconSignature,
//   IconTableColumn,
// } from "@tabler/icons-react";
// import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Check, Wallet2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

// const SkeletonOne = () => {
//   const variants = {
//     initial: {
//       x: 0,
//     },
//     animate: {
//       x: 10,
//       rotate: 5,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };
//   const variantsSecond = {
//     initial: {
//       x: 0,
//     },
//     animate: {
//       x: -10,
//       rotate: -5,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   return (
//     <motion.div
//       initial="initial"
//       whileHover="animate"
//       className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
//     >
//       <motion.div
//         variants={variants}
//         className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
//       >
//         <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
//         <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
//       </motion.div>
//       <motion.div
//         variants={variantsSecond}
//         className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
//       >
//         <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
//         <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
//       </motion.div>
//       <motion.div
//         variants={variants}
//         className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
//       >
//         <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
//         <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
//       </motion.div>
//     </motion.div>
//   );
// };
// const SkeletonTwo = () => {
//   const variants = {
//     initial: {
//       width: 0,
//     },
//     animate: {
//       width: "100%",
//       transition: {
//         duration: 0.2,
//       },
//     },
//     hover: {
//       width: ["0%", "100%"],
//       transition: {
//         duration: 2,
//       },
//     },
//   };
//   const arr = new Array(6).fill(0);
//   return (
//     <motion.div
//       initial="initial"
//       animate="animate"
//       whileHover="hover"
//       className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
//     >
//       {arr.map((_, i) => (
//         <motion.div
//           key={"skelenton-two" + i}
//           variants={variants}
//           style={{
//             maxWidth: Math.random() * (100 - 40) + 40 + "%",
//           }}
//           className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
//         ></motion.div>
//       ))}
//     </motion.div>
//   );
// };
// const SkeletonThree = () => {
//   const variants = {
//     initial: {
//       backgroundPosition: "0 50%",
//     },
//     animate: {
//       backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
//     },
//   };
//   return (
//     <motion.div
//       initial="initial"
//       animate="animate"
//       variants={variants}
//       transition={{
//         duration: 5,
//         repeat: Infinity,
//         repeatType: "reverse",
//       }}
//       className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
//       style={{
//         background:
//           "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
//         backgroundSize: "400% 400%",
//       }}
//     >
//       <motion.div className="h-full w-full rounded-lg"></motion.div>
//     </motion.div>
//   );
// };
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

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex w-full min-h-[20rem] p-4 space-x-4"
    >
      <motion.div
        variants={first}
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
        variants={second}
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

// const SkeletonFive = () => {
//   const variants = {
//     initial: {
//       x: 0,
//     },
//     animate: {
//       x: 10,
//       rotate: 5,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };
//   const variantsSecond = {
//     initial: {
//       x: 0,
//     },
//     animate: {
//       x: -10,
//       rotate: -5,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   return (
//     <motion.div
//       initial="initial"
//       whileHover="animate"
//       className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
//     >
//       <motion.div
//         variants={variants}
//         className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
//       >
//         <Image
//           src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
//           alt="avatar"
//           height="100"
//           width="100"
//           className="rounded-full h-10 w-10"
//         />
//         <p className="text-xs text-neutral-500">
//           There are a lot of cool framerworks out there like React, Angular,
//           Vue, Svelte that can make your life ....
//         </p>
//       </motion.div>
//       <motion.div
//         variants={variantsSecond}
//         className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
//       >
//         <p className="text-xs text-neutral-500">Use PHP.</p>
//         <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
//       </motion.div>
//     </motion.div>
//   );
// };
const items = [
  // {
  // title: "AI Content Generation",
  //   description: (
  //     <span className="text-sm">
  //       Experience the power of AI in generating unique content.
  //     </span>
  //   ),
  //   header: <SkeletonOne />,
  //   className: "md:col-span-1",
  //   icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  // },
  // {
  //   title: "Automated Proofreading",
  //   description: (
  //     <span className="text-sm">
  //       Let AI handle the proofreading of your documents.
  //     </span>
  //   ),
  //   header: <SkeletonTwo />,
  //   className: "md:col-span-1",
  //   icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  // },
  // {
  //   title: "Contextual Suggestions",
  //   description: (
  //     <span className="text-sm">
  //       Get AI-powered suggestions based on your writing context.
  //     </span>
  //   ),
  //   header: <SkeletonThree />,
  //   className: "md:col-span-1",
  //   icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  // },
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
  },

  // {
  //   title: "Text Summarization",
  //   description: (
  //     <span className="text-sm">
  //       Summarize your lengthy documents with AI technology.
  //     </span>
  //   ),
  //   header: <SkeletonFive />,
  //   className: "md:col-span-1",
  //   icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  // },
];
