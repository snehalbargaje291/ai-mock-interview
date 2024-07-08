"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

const Accordion = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  const questions = [
    {
      header: "How long does it take to create an interview?",
      text: "It takes a few minutes to generate an interview. You simply need to fill in details such as job position or title, job description or skills, and years of experience. Our AI will then generate the questions and answers for your interview.",
    },
    {
      header: "What features does the AI mock interview application offer?",
      text: "Our application offers a comprehensive interview simulation experience. You can create interviews, record your answers, receive AI-generated feedback comparing your responses to expected answers, and get a rating out of 10. Completed interviews are stored in your dashboard for retakes, review, or deletion.",
    },
    {
      header: "How do I record my answers and receive feedback?",
      text: "After generating the interview, you can start recording your answers using the provided interface. Once you've completed the interview, the AI will analyze your responses, compare them with expected answers, and provide feedback along with a rating out of 10.",
    },
    {
      header: "Can I retake or review my completed interviews?",
      text: "Yes, all your completed interviews are stored in your dashboard. You can retake any interview, review the feedback provided, or delete them as needed.",
    },
    {
      header: "How is the feedback generated?",
      text: "The feedback is generated using advanced AI algorithms that compare your recorded answers with the expected answers. It evaluates your responses based on relevance, clarity, and completeness, and then provides a rating out of 10 along with detailed feedback.",
    },
    {
      header: "What types of job positions can I create interviews for?",
      text: "You can create interviews for a wide range of job positions across various industries. Our AI is equipped to handle different roles and tailor questions based on the job description and required skills you provide.",
    },
    // {
    //   header: "Is my data secure on the platform?",
    //   text: "Yes, we prioritize your data security. All your personal information, interview details, and recorded answers are stored securely and are only accessible to you. We comply with industry standards and regulations to ensure your data is protected.",
    // },
  ];

  return (
    <section
      data-aos="fade-up"
      className="relative z-20 max-w-7xl mx-auto overflow-hidden rounded-lg pb-12 pt-24 dark:bg-dark"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-10">
              <span className="mb-2 block text-xl font-semibold text-primary">
                FAQ
              </span>
              <h2 className="mb-4 text-md font-bold text-dark dark:text-white sm:text-sm">
                Any Questions? Look Here
              </h2>
              <p className="text-xs text-body-color dark:text-dark-6">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {questions.map((item, index) => (
              // <AccordionItem
              //   key={index}
              //   header={item.header}
              //   text={item.text}
              // />
              <Collapsible
                      key={index}
                      className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <CollapsibleTrigger className="w-full text-sm font-bold text-left flex justify-between items-center">
                        <span className="text-gray-800">{item.header}</span>
                        <ChevronsUpDown className="w-6 h-6 text-purple-500" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-4 space-y-4 text-sm">
                        <p className="text-gray-500 text-xs">
                        {item.text}
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1308.65"
              y1="1142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3056D3" stopOpacity="0.36" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0.096144" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Accordion;