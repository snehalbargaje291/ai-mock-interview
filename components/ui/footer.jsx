// import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { AnimatedTooltip } from "./animated-tooltip";

function Footer() {
  const ref = useRef(null);
  // const inView = useInView(ref, { once: false });
  const tooltipItems = [
    {
      id: 1,
      name: "GitHub",
      designation: "Check out our GitHub repository",
      image: "/github.png",
      profileUrl: "https://github.com/snehalbargaje291",
    },
    {
      id: 2,
      name: "LinkedIn",
      designation: "Connect with us on LinkedIn",
      image: "/LinkedIn.png",
      profileUrl: "https://www.linkedin.com/in/snehal-bargaje-o2910/",
    },
    {
      id: 3,
      name: "Peerlist",
      designation: "Visit our Peerlist profile",
      image: "/peerlist.jpeg",
      profileUrl: "https://peerlist.io/snehalbargaje",
    },
    {
      id: 4,
      name: "Instagram",
      designation: "Follow us on Instagram",
      image: "/instagram.jpeg",
      profileUrl:"https://www.instagram.com/sneh.al___/",
    },
  ];

  return (
    <div
      className="border-t-2 border-gray-300 bg-gray-200 bottom-0"
    >
      <div className="w-full space-y-4">
        <div className="flex flex-col gap-4 justify-between items-center px-24 pt-4">
          <nav className="flex flex-wrap justify-center md:justify-start -mx-5 -my-2">
            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base leading-6 text-black hover:text-gray-900"
              >
                About
              </a>
            </div>
            {/* <div className="px-5 py-2">
              <a
                href="#"
                className="text-base leading-6 text-black hover:text-gray-900"
              >
                Pricing
              </a>
            </div> */}
            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base leading-6 text-black hover:text-gray-900"
              >
                Contact
              </a>
            </div>
            <div className="px-5 py-2">
              <a
                href="#"
                className="text-base leading-6 text-black hover:text-gray-900"
              >
                Terms
              </a>
            </div>
          </nav>
            <div className="flex justify-center items-center w-[50%]">
              <AnimatedTooltip items={tooltipItems} />
            </div>
        </div>
        <p className="text-sm leading-6 text-center bg-gray-900 text-white">
          © 2024 MockAI, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
