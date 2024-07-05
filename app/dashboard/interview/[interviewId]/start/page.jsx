"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswers from "./_components/RecordAnswers";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import useSpeechToText from "react-hook-speech-to-text";
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
import { useRouter } from "next/navigation";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [showBackDialog, setShowBackDialog] = useState(false);
  // const [interimResults, setInterimResults] = useState("");

  const {
    error,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
    interimResult,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const router = useRouter()
  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
      console.log(result);
      const toParse = result[0].jsonMockResp.replace(/\n/g, "");
      const jsonMockRespArray = JSON.parse(toParse);
      console.log(jsonMockRespArray);
      setMockInterviewQuestion(jsonMockRespArray);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching or parsing interview details:", error);
    }
  };

  const handleBackConfirm = async () => {
    setShowBackDialog(false);
    router.push("/dashboard/interview/" + params.interviewId);
    
  };

  const handleBackCancel = () => {
    setShowBackDialog(false);
    window.history.pushState(null, null, window.location.pathname);
  };

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

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col-reverse md:flex-row p-4 rounded-lg md:rounded-none border md:border-none shadow-lg md:shadow-none mb-4">
        <RecordAnswers
          mockInterviewQuestions={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
          interviewData={interviewData}
          isRecording={isRecording}
          results={results}
          setResults={setResults}
          startSpeechToText={startSpeechToText}
          stopSpeechToText={stopSpeechToText}
          error={error}
        />
        <QuestionsSection
          mockInterviewQuestions={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interimResult={interimResult}
        />
      </div>
      <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
        <h3 className="flex flex-row gap-2 mb-2 font-semibold text-blue-600 text-sm">
          <Lightbulb /> Helpful Tip:
        </h3>
        <p className="text-blue-600 text-sm">
          You answer the interview question with video recording. We then
          transcribe your video recording to text and will save your answer and
          at the last we will give feedback on how well you answer the question.
        </p>
      </div>
      {showBackDialog && (
        <AlertDialog open={showBackDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to go back?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Going back will clear your previous responses. Do you want to
                proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleBackCancel}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleBackConfirm}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </motion.div>
  );
}

export default StartInterview;
