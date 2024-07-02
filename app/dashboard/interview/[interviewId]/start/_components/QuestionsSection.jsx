"use client";
import React from "react";
import { Volume2Icon } from "lucide-react";
// import TypewriterEffect from "./TypeWriter";

function QuestionsSection({
  mockInterviewQuestions,
  activeQuestionIndex,
  interimResult,
}) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const textToSpeech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(textToSpeech);
    } else {
      alert("Your browser does not support text to speech");
    }
  };

  return (
    <div className="flex flex-col w-full bg-white p-4 md:border md:rounded-lg md:shadow-md">
      <div className="flex flex-col justify-start gap-4 flex-1">
        <div className="flex gap-2 flex-wrap">
          {mockInterviewQuestions &&
            mockInterviewQuestions.map((question, index) => (
              <React.Fragment key={index}>
                <button
                  className={`text-sm text-gray-600 ${
                    activeQuestionIndex === index ? "font-bold" : ""
                  }`}
                >
                  Question #{index + 1}
                </button>
                {index !== mockInterviewQuestions.length - 1 && (
                  <span className="text-gray-400">/</span>
                )}
              </React.Fragment>
            ))}
        </div>
        <hr />
        <div className="md:my-4">
          <p className="text-gray-800 text-sm">
            {mockInterviewQuestions &&
              mockInterviewQuestions[activeQuestionIndex]?.question}
          </p>
          <Volume2Icon
            className="text-gray-500 my-4 cursor-pointer"
            onClick={() => {
              textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question);
            }}
          />
        </div>
        {/* {mockInterviewQuestions
        <div className="md:my-4">
          {interimResult}
        </div>
      )} */}
      </div>
    </div>
  );
}

export default QuestionsSection;
