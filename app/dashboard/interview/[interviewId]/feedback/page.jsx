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
import { ChevronsUpDown, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);

    // Calculate the average rating
    if (result.length > 0) {
      const totalRating = result.reduce(
        (sum, item) => sum + parseFloat(item.rating),
        0
      );
      const avgRating = totalRating / result.length;
      setAverageRating(avgRating);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex flex-row justify-between">
          {feedbackList.length > 0 ? (
            <h2 className="text-lg font-bold text-green-600 mb-2">
              Congratulations!
            </h2>
          ) : (
            <h2 className="text-lg font-bold text-red-600 mb-2">
              You have not yet completed the interview
            </h2>
          )}

          <Button
            className="gap-2 px-2 py-0 text-sm"
            onClick={() => {
              router.replace("/dashboard");
            }}
          >
            <Home size={16} />
            Home
          </Button>
        </div>
        {feedbackList.length > 0 ? (
          <>
            <p className="text-gray-700 text-md mb-4">
              Here is your interview feedback and rating
            </p>
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-primary text-md my-3">
                Overall Rating: <strong>{averageRating}/10</strong>
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Find below interview questions with the expected answers, your
                answers, and feedback for improvement:
              </p>
              <div className="grid grid-cols-1 gap-6">
                {feedbackList &&
                  feedbackList.map((item, index) => (
                    <Collapsible
                      key={index}
                      className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <CollapsibleTrigger className="w-full text-sm font-bold text-left flex justify-between items-center">
                        <span className="text-gray-800">{item.question}</span>
                        <ChevronsUpDown className="w-6 h-6 text-purple-500" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-4 space-y-4 text-sm">
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded-lg">
                          <p className="text-yellow-800">
                            <strong>Rating:</strong> {item.rating}
                          </p>
                        </div>
                        <div className="bg-red-50 border-l-4 border-red-400 p-2 rounded-lg">
                          <p className="text-red-800">
                            <strong>Your answer:</strong> {item.userAns}
                          </p>
                        </div>
                        <div className="bg-green-50 border-l-4 border-green-400 p-2 rounded-lg">
                          <p className="text-green-800">
                            <strong>Expected answer:</strong> {item.correctAns}
                          </p>
                        </div>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-2 rounded-lg">
                          <p className="text-blue-800">
                            <strong>Feedback:</strong> {item.feedback}
                          </p>
                        </div>
                        <p className="text-gray-500 text-xs">
                          {item.createdAt}
                        </p>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm">Please attempt the interview</p>
        )}
      </div>
    </motion.div>
  );
}

export default Feedback;
