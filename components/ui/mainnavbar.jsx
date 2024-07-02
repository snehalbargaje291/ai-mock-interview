"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

const MainNavbar = () => {
  const { isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 w-full flex flex-row flex-wrap justify-between px-8 py-4 z-50 ${
          isScrolled ? "bg-opacity-75 backdrop-filter backdrop-blur-md" : ""
        }`}
      >
        <Link href={"/"}>
          <h1 className="text-xl font-bold text-black cursor-pointer">
            Mockstar.ai
          </h1>
        </Link>
        <div className="flex justify-center items-center flex-row gap-8">
          <Link href={"#FAQ"}
              className={
                " text-black cursor-pointer text-sm hover:text-gray-400 hover:font-bold transition-all"
              }
            >
              FAQ
          </Link>
          {isSignedIn ? (
            <div className="scale-125">
              <UserButton />
            </div>
          ) : (
            <Link href={"/sign-in"}>
              <button className="inline-flex text-sm h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                Signin
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default MainNavbar;
