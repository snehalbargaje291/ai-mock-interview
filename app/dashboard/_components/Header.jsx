"use client";
import { UserButton } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { usePathname } from "next/navigation";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  });
  const handleScroll = () => {
    if (window.scrollY > 50) {
      controls.start({
        opacity: 0.9,
        transition: { duration: 0.3 },
      });
    } else {
      controls.start({
        opacity: 1,
        transition: { duration: 0.3 },
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 1 }}
        // animate={{ opacity: window.innerWidth < 768 ? controls : 1 }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-gray-300 "
      >
        <div className="container flex justify-between items-center px-8 py-4 m-auto">
          <h1 className="text-xl font-bold text-black">Mockstar.ai</h1>
          <nav className="hidden md:flex space-x-8 justify-between">
            <ul className="flex space-x-6 pt-1">
              <li
                className={`${
                  path == "/dashboard" && "text-gray-600 font-bold"
                } text-black cursor-pointer text-sm hover:text-gray-400 hover:font-bold transition-all`}
              >
                Dashboard
              </li>
              <li
                className={`${
                  path == "/questions" && "text-gray-600 font-bold"
                } text-black cursor-pointer text-sm hover:text-gray-400 hover:font-bold transition-all`}
              >
                Questions
              </li>
              <li
                className={`${
                  path == "/howitworks" && "text-gray-600 font-bold"
                } text-black cursor-pointer text-sm hover:text-gray-400 hover:font-bold transition-all`}
              >
                How it works?
              </li>
              <li><UserButton /></li>
            </ul>
            
          </nav>
          <button
            className="md:hidden text-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            variants={navVariants}
            className="md:hidden backdrop-blur-md flex justify-center items-center"
          >
            <ul className="flex flex-col space-y-4 gap-2 p-4 w-[100%]">
              <motion.li
                variants={itemVariants}
                className={`${
                  path == "/dashboard" && "text-gray-600 font-bold"
                } block hover:font-bold text-black text-center hover:text-gray-400 transition duration-300`}
              >
                Dashboard
              </motion.li>
              <motion.li
                variants={itemVariants}
                className={`${
                  path == "/questions" && "text-gray-600 font-bold"
                } block hover:font-bold text-black text-center hover:text-gray-400 transition duration-300`}
              >
                Questions
              </motion.li>
              <motion.li
                variants={itemVariants}
                className={`${
                  path == "/howitworks" && "text-gray-600 font-bold"
                } block hover:font-bold text-black text-center hover:text-gray-400 transition duration-300`}
              >
                How it works?
              </motion.li>
              <motion.li variants={itemVariants} className="text-center">
                <UserButton />
              </motion.li>
            </ul>
          </motion.div>
        )}
      </motion.header>
    </>
  );
}

export default Header;
