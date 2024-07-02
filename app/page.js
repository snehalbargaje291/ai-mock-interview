"use client";
import { HeroParallax } from "@/components/ui/hero-parallax";
import React from "react";
import { BentoGridThirdDemo } from "./dashboard/_components/BentoGrid";
import MainNavbar from "@/components/ui/mainnavbar";
import Accordion from "@/components/ui/faq";
import Footer from "@/components/ui/footer";

function Home() {
  const products = [
    { title: "Product 1", link: "/", thumbnail: "/image.png" },
    { title: "Product 3", link: "/", thumbnail: "/image (1).jpeg" },
    { title: "Product 4", link: "/", thumbnail: "/image (2).jpeg" },
    { title: "Product 5", link: "/", thumbnail: "/image (3).jpeg" },
    { title: "Product 6", link: "/", thumbnail: "/image (4).jpeg" },
    { title: "Product 1", link: "/", thumbnail: "/image.png" },
    { title: "Product 3", link: "/", thumbnail: "/image (1).jpeg" },
    { title: "Product 4", link: "/", thumbnail: "/image (2).jpeg" },
    { title: "Product 5", link: "/", thumbnail: "/image (3).jpeg" },
    { title: "Product 6", link: "/", thumbnail: "/image (4).jpeg" },
  ];

  return (
    <>
      <MainNavbar />
      <div>
        <HeroParallax products={products} />
      </div>
      <div className="m-5">
        <BentoGridThirdDemo />
      </div>
      <div id="FAQ" className="m-5 lg:m-7">
        <Accordion/>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
