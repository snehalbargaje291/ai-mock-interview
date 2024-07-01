"use client";
import { db } from "@/utils/db"; // Importing database utility
import { UserAnswer } from "@/utils/schema"; // Importing schema for UserAnswer
import { eq } from "drizzle-orm"; // Importing ORM function
import React, { useEffect, useState } from "react"; // Importing React and its hooks
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"; // Importing collapsible UI components
import { ChevronsUpDown, Home } from "lucide-react"; // Importing icons from Lucide React
import { Button } from "@/components/ui/button"; // Importing Button component
import { useRouter } from "next/navigation"; // Importing Next.js useRouter hook for navigation
import { motion } from "framer-motion"; // Importing motion for animation

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]); // State to store feedback list
  const [averageRating, setAverageRating] = useState(0); // State to store average rating
  const router = useRouter(); // useRouter hook instance for navigation

  // useEffect to fetch feedback data on component mount
  useEffect(() => {
    GetFeedback();
  }, []);

  // Function to fetch feedback data from the database
  const GetFeedback = async () => {
    // Fetching feedback list for a specific interview ID
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    
    // Setting feedback list state
    setFeedbackList(result);

    // Calculating average rating if feedback list is not empty
    if (result.length > 0) {
      const totalRating = result.reduce(
        (sum, item) => sum + parseFloat(item.rating),
        0
      );
      const avgRating = totalRating / result.length;
      setAverageRating(avgRating.toFixed(0)); // Setting average rating state
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} // Initial animation state
      whileInView={{ opacity: 1 }} // Animation state while in view
      viewport={{ once: true }} // Animation viewport setting
    >
      <div className="p-6 x-auto"> {/* Main container div */}
        <div className="flex flex-row justify-between"> {/* Flex container for header */}
          {feedbackList.length > 0 ? ( // Conditionally rendering based on feedback list length
            <h2 className="text-lg font-bold text-green-600 mb-2">
              Congratulations!
            </h2>
          ) : (
            <h2 className="text-lg font-bold text-red-600 mb-2">
              You have not yet completed the interview
            </h2>
          )}

          {/* Button to navigate back to dashboard */}
          <Button
            className="p-3 rounded-full bg-gray-500"
            onClick={() => {
              router.replace("/dashboard"); // Navigate to dashboard on click
            }}
          >
            <Home size={16} /> {/* Home icon */}
          </Button>
        </div>

        {feedbackList.length > 0 ? ( // Conditionally rendering based on feedback list length
          <> {/* Fragment for rendering multiple elements */}
            <p className="text-gray-700 text-md mb-4">
              Here is your interview feedback and rating
            </p>

            {/* Container for displaying feedback details */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-primary text-md my-3">
                Overall Rating: <strong>{averageRating}/10</strong>
              </h2>

              <p className="text-gray-600 text-sm mb-4">
                Find below interview questions with the expected answers, your
                answers, and feedback for improvement:
              </p>

              {/* Grid container for collapsible feedback items */}
              <div className="grid grid-cols-1 gap-6">
                {feedbackList.map((item, index) => ( // Mapping through feedback list
                  <Collapsible
                    key={index} // Unique key for collapsible item
                    className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Collapsible trigger with question text and icon */}
                    <CollapsibleTrigger className="w-full text-sm font-bold text-left flex justify-between items-center">
                      <span className="text-gray-800">{item.question}</span>
                      <ChevronsUpDown className="w-6 h-6 text-purple-500" /> {/* Icon */}
                    </CollapsibleTrigger>

                    {/* Collapsible content with feedback details */}
                    <CollapsibleContent className="mt-4 space-y-4 text-sm">
                      {/* Feedback item for rating */}
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded-lg">
                        <p className="text-yellow-800">
                          <strong>Rating:</strong> {item.rating}
                        </p>
                      </div>

                      {/* Feedback item for user's answer */}
                      <div className="bg-red-50 border-l-4 border-red-400 p-2 rounded-lg">
                        <p className="text-red-800">
                          <strong>Your answer:</strong> {item.userAns}
                        </p>
                      </div>

                      {/* Feedback item for expected answer */}
                      <div className="bg-green-50 border-l-4 border-green-400 p-2 rounded-lg">
                        <p className="text-green-800">
                          <strong>Expected answer:</strong> {item.correctAns}
                        </p>
                      </div>

                      {/* Feedback item for feedback */}
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-2 rounded-lg">
                        <p className="text-blue-800">
                          <strong>Feedback:</strong> {item.feedback}
                        </p>
                      </div>

                      {/* Feedback item for created date */}
                      <p className="text-gray-500 text-xs">{item.createdAt}</p>
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
