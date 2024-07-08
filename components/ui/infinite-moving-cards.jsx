"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useRef, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-duration",
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
      );
    }
  };

  return (
    <div data-aos="fade-up" className="flex justify-center items-center flex-col relative z-20 max-w-7xl mx-auto overflow-hidden rounded-lg pb-12 pt-12">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-5 text-gray-600">
          What people are saying.
        </h1>
        <h3 className="font-sans text-xl text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          Testimonials.
        </h3>
        <div className="text-center mb-10 gap-1 flex justify-center">
          <span className="inline-block w-1 h-1 rounded-full bg-gray-500"></span>
          <span className="inline-block w-3 h-1 rounded-full bg-gray-500 ml-1"></span>
          <span className="inline-block w-40 h-1 rounded-full bg-gray-500 ml-1"></span>
          <span className="inline-block w-3 h-1 rounded-full bg-gray-500 ml-1"></span>
          <span className="inline-block w-1 h-1 rounded-full bg-gray-500 ml-1"></span>
        </div>
      </div>
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
          className
        )}
        style={{ maxWidth: '100%' }}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item) => (
            <li
              className="w-[350px] max-w-full relative rounded-2xl shadow-lg border border-b-0 flex-shrink-0 border-gray-400 px-8 py-6 md:w-[450px]"
              style={{
                background:
                  "linear-gradient(180deg, var(--gray-500), var(--gray-700))",
                zIndex: 10,
              }}
              key={item.name}
            >
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <span className="relative z-20 text-sm leading-[1.6] text-gray-200 font-normal">
                  {item.quote}
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] text-gray-200 font-normal">
                      {item.name}
                    </span>
                    <span className="text-sm leading-[1.6] text-gray-200 font-normal">
                      {item.title}
                    </span>
                  </span>
                </div>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
