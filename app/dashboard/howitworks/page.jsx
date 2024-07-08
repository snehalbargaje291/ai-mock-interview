"use client";
import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    step: 1,
    title: "Create an Interview",
    description:
      "Fill out details such as job position, job description, skills, and years of experience. The AI will generate relevant questions and answers for the interview.",
  },
  {
    step: 2,
    title: "Record Your Answers",
    description:
      "Use the app to record your answers to the AI-generated questions. Ensure you speak clearly and concisely.",
  },
  {
    step: 3,
    title: "Submit and Get Feedback",
    description:
      "Submit your recorded answers. The AI will compare your responses to the expected answers and provide feedback, including a rating out of 10.",
  },
  {
    step: 4,
    title: "Review and Improve",
    description:
      "Access your dashboard to view feedback, retake interviews, and track your progress over time.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function HowItWorks() {
  return (
    <section className="text-gray-800 py-12">
      <div className="flex md:flex-row flex-col px-4 mx-auto">
        <div className="text-center md:w-[30%] sm:text-left mb-10 before:block before:w-24 before:h-1 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-gray-600">
          <h3 className="text-3xl font-semibold">How It Works</h3>
          <span className="text-sm font-bold tracking-wider uppercase text-gray-600">
            AI Mock Interviews
          </span>
        </div>
        <div className="relative md:w-[70%] col-span-12 sm:col-span-9">
          <div className="col-span-12 space-y-12 relative px-4 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-600">
            {steps.map((step) => (
              <motion.div
                key={step.step}
                className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-gray-700"
                initial="hidden"
                animate="visible"
                variants={itemVariants}
              >
                <div className="flex items-center mb-4">
                    <div className="sm:hidden w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">
                      <span className="font-bold text-md">{step.step}</span>
                    </div>
                  <h3 className="ml-4 text-xl font-semibold tracking-wide">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
