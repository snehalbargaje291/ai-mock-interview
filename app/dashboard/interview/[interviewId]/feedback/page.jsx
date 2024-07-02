"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showBackDialog, setShowBackDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  useEffect(() => {
    const handleBackButton = (e) => {
      e.preventDefault();
      setShowBackDialog(true);
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(result);

    if (result.length > 0) {
      const totalRating = result.reduce(
        (sum, item) => sum + parseFloat(item.rating),
        0
      );
      const avgRating = totalRating / result.length;
      setAverageRating(avgRating.toFixed(0));
    }
  };

  const handleBackConfirm = async () => {
    setShowBackDialog(false);
    await clearPreviousAnswers(params.interviewId);
    router.push("/dashboard/interview/" + params.interviewId);
  };

  const handleBackCancel = () => {
    setShowBackDialog(false);
    window.history.pushState(null, null, window.location.pathname);
  };

  async function clearPreviousAnswers(interviewId) {
    try {
      const result = await db
        .delete(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .execute();

      if (result) {
        toast.success("Previous answers cleared successfully!");
      } else {
        toast.error("Failed to clear previous answers.");
      }
    } catch (error) {
      console.error("Error clearing previous answers:", error);
      toast.error("An error occurred. Please try again.");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="p-6 x-auto">
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
            className="p-3 rounded-full bg-gray-500"
            onClick={() => {
              router.replace("/dashboard");
            }}
          >
            <Home size={16} />
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
          <div className="flex flex-row">
          <p className="text-sm">Please attempt the interview</p>
          <p className='bg-transparent text-sm text-blue-900 mx-4 cursor-pointer' onClick={() => {
              router.replace("/dashboard/interview/"+params.interviewId);
            }}>Take Interview</p>
          </div>
        )}
      </div>

      {showBackDialog && (
        <AlertDialog open={showBackDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to go back?</AlertDialogTitle>
              <AlertDialogDescription>
                Going back will clear your previous responses. Do you want to proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleBackCancel}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleBackConfirm}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </motion.div>
  );
}

export default Feedback;
