"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswers from "./_components/RecordAnswers";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex]=useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
      console.log(result)
      const toParse = result[0].jsonMockResp.replace(/\n/g, "");
      const jsonMockRespArray = JSON.parse(toParse);
      console.log(jsonMockRespArray)
      setMockInterviewQuestion(jsonMockRespArray); 
      setInterviewData(result[0]);
    } catch (error) {
      console.error('Error fetching or parsing interview details:', error);
    }
  };
  

  return (
    <motion.div initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}>
    <div className="flex flex-col-reverse md:flex-row p-4 rounded-lg md:rounded-none border md:border-none shadow-lg md:shadow-none mb-4">
      <RecordAnswers/>
      <QuestionsSection mockInterviewQuestions={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} setActiveQuestionIndex={setActiveQuestionIndex}/>
    </div>
    <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
          <h3 className="flex flex-row gap-2 mb-2 font-semibold text-blue-600 text-sm"><Lightbulb/> Helpful Tip:</h3>
          <p className="text-blue-600 text-sm">
            You answer the interview question with video recording. We then
            transcribe your video recording to text and will save your answer
            and at the last we will give feedback on how well you answer the
            question.
          </p>
        </div>
    </motion.div>
  );
}

export default StartInterview;
