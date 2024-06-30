"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
  

function Feedback({ params }) {
    const [isOpen, setIsOpen] = React.useState(false)
  const [feedbackList, setFeedbackList] = useState([]);
  useEffect(() => {
    GetFeedback();
  });
  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);
  };
  return (
    <div className="p-10">
      <h2 className="text-lg font-bold text-green-500">Congratulations!</h2>
      <h2 className="text-gray-500 text-lg">
        Here is your interview feedback and rating
      </h2>
      <h2 className="text-primary text-md my-3">
        Rating: <strong>6/10</strong>
      </h2>
      <h2 className="text-gray-500 text-sm">
        Find below interview question with the expected answer as well as your
        annswer and its feedback for improvement
      </h2>
      <div className="flex justify-center items-start flex-col gap-4 p-6 m-2">
        { feedbackList && feedbackList.map((item, index)=>(
            <Collapsible key={index} className="bg-secondary p-2 rounded-xl border shadow-lg">
            <CollapsibleTrigger className="text-sm font-bold text-left flex justify-between gap-4">{item.question}<ChevronsUpDown className="w-8 h-8"/></CollapsibleTrigger>
            <CollapsibleContent className="text-sm my-2">
              <h3 className="bg-red-200 text-red-500 p-2 my-2 border rounded-lg"><strong>Your answer:</strong> {item.userAns}</h3>
              <h3 className="bg-green-200 text-green-500 p-2 my-2 border rounded-lg"><strong>Expected answer: </strong>{item.correctAns}</h3>
              <h3 className="bg-blue-200 text-blue-500 p-2 my-2 border rounded-lg"><strong>Feedback: </strong>{item.feedback}</h3>
              <h3 className="bg-yellow-200 text-yellow-500 p-2 border rounded-lg"><strong>Reating: </strong>{item.rating}</h3>
              {item.createdAt}<br/>
            </CollapsibleContent>
          </Collapsible>
          
        )) }
      
      </div>
    </div>
  );
}

export default Feedback;
