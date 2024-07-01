"use client";
// import { FlipWords } from "@/components/ui/flip-word";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function Home() {
  const { isSignedIn } = useUser();
  // const words = ["better", "cute", "beautiful", "modern"];
  const products = [
    { title: 'Product 1', link: '/product-1', thumbnail: '/product-1-thumbnail.jpg' },
  ];

  return (
    <>
      <div className="fixed w-full flex flex-row flex-wrap justify-between px-8 py-4">
        <Link href={"/"}>
          <h1 className="text-xl font-bold text-black">Mockstar.ai</h1>
        </Link>
        {isSignedIn ? (
          <div className="scale-125">
            <UserButton />
          </div>
        ) : (
          <Link href={"/sign-in"}>
            <button className="inline-flex text-sm h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">Signin</button>
          </Link>
        )}
      </div>
      {/* <div className="h-[40rem] flex justify-center items-center">
        <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          Build
          <FlipWords words={words} /> <br />
          websites with Aceternity UI
          <br />
          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <button className="inline-flex text-sm h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              Let's Start
            </button>
          </Link>
        </div>
      </div> */}
      <div>
        <HeroParallax products={products}/>
      </div>
    </>
  );
}

export default Home;
