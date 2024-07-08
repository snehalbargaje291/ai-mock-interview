"use client";
import { HeroParallax } from "@/components/ui/hero-parallax";
import React from "react";
import { BentoGridThirdDemo } from "./dashboard/_components/BentoGrid";
import MainNavbar from "@/components/ui/mainnavbar";
import Accordion from "@/components/ui/faq";
import Footer from "@/components/ui/footer";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

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
  const items = [
    {
      name: "John Doe",
      title: "Software Developer",
      quote: "The AI mock interview app helped me prepare for my job interviews. The feedback was precise and helped me improve my answers significantly.",
    },
    {
      name: "Jane Smith",
      title: "Data Scientist",
      quote: "I was able to practice multiple times and get constructive feedback each time. It boosted my confidence for the real interview.",
    },
    {
      name: "Michael Brown",
      title: "UX Designer",
      quote: "The app's interface is user-friendly, and the questions were very relevant to my field. Highly recommend it!",
    },
    {
      name: "Emily Davis",
      title: "Project Manager",
      quote: "This app is a game-changer! It provided me with a realistic interview experience and valuable feedback.",
    },
    {
      name: "David Wilson",
      title: "Marketing Specialist",
      quote: "The detailed feedback on my answers helped me understand my weaknesses and work on them before the actual interview.",
    },
    {
      name: "Olivia Johnson",
      title: "HR Manager",
      quote: "An excellent tool for interview preparation. The AI feedback was spot on and very helpful.",
    },
  ];
  

  return (
    <>
      <MainNavbar />
      <div>
        <HeroParallax products={products} />
      </div>
      <div className="my-10">
        <div id="pricing" className="mb-16 md:mb-28 lg:mb-32">
          <BentoGridThirdDemo />
        </div>
        <div id="FAQ" className="mx-10">
          <Accordion />
        </div>
        <div id="testimonials" className="py-10">
          <InfiniteMovingCards items={items}/>
        </div>
      </div>
      
      <Footer/>
    </>
  );
}

export default Home;
