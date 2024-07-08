"use client";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Mic, WebcamIcon, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import toast from "react-hot-toast";
import { chatSession } from "@/utils/GeminiAIModel";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import Link from "next/link";
import QuestionsSection from "./QuestionsSection";
import { UserAnswer } from "@/utils/schema";

function RecordAnswers({
  interviewData,
  activeQuestionIndex,
  mockInterviewQuestions,
  setActiveQuestionIndex,
  error,
  isRecording,
  results,
  setResults,
  startSpeechToText,
  stopSpeechToText,
}) {
  const [webCamEnable, setWebCamEnable] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const [recorded, setRecorded] = useState(false);
  const [isAnswerSaved, setIsAnswerSaved] = useState(false);

  useEffect(() => {
    if (results.length > 0) {
      const combinedTranscript = results.map(result => result.transcript).join(" ");
      setUserAnswer(combinedTranscript);
    }
  }, [results]);

  useEffect(() => {
    const handleUnload = () => {
      sessionStorage.removeItem("userAnswers");
    };
    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("popstate", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("popstate", handleUnload);
    };
  }, []);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 0) {
      saveUserAnswer();
    }
  }, [isRecording]);

  const saveUserAnswer = async () => {
    setIsLoading(true);

    if (userAnswer.length < 10) {
      setIsLoading(false);
      toast.error("Error while saving answer, Please record again");
      return;
    }

    try {
      const feedbackPrompt = `Question: ${mockInterviewQuestions[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, Depending on the Question and User Answer, please give rating out of 10 and feedback to user as area of improvement (if any) in just 3-5 lines to improve it in JSON format with rating field and feedback field. Also see if the user is repeating the question itself as answer and give appropriate rating and feedback in json`;
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response.text().replace("```json", "").replace("```", "");
      const jsonFeedbackResp = JSON.parse(mockJsonResp);

      const userAnswerObject = {
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestions[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        rating: jsonFeedbackResp.rating,
        feedback: jsonFeedbackResp.feedback,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      };

      const storedAnswers = JSON.parse(sessionStorage.getItem("userAnswers")) || [];
      storedAnswers.push(userAnswerObject);
      sessionStorage.setItem("userAnswers", JSON.stringify(storedAnswers));

      toast.success("Answer saved successfully!");
      setRecorded(true);
      setIsAnswerSaved(true);
    } catch (error) {
      console.error("Error while saving answer:", error);
      toast.error("Error while saving answer, Please try again");
    } finally {
      setIsLoading(false);
      setUserAnswer("");
      setResults([]);
    }
  };

  const insertAllAnswers = async () => {
    const storedAnswers = JSON.parse(sessionStorage.getItem("userAnswers")) || [];

    if (storedAnswers.length === 0) {
      toast.error("No answers to save");
      return;
    }

    setIsLoading(true);

    try {
      const promises = storedAnswers.map(answer =>
        db.insert(UserAnswer).values({
          mockIdRef: answer.mockIdRef,
          question: answer.question,
          correctAns: answer.correctAns,
          userAns: answer.userAns,
          rating: answer.rating,
          feedback: answer.feedback,
          userEmail: answer.userEmail,
          createdAt: answer.createdAt,
        })
      );

      await Promise.all(promises);

      toast.success("All answers saved successfully!");
      sessionStorage.removeItem("userAnswers");
    } catch (error) {
      console.error("Error while saving all answers:", error);
      toast.error("Error while saving all answers, Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const startStopRecordingAnswer = () => {
    if (!webCamEnable) {
      toast("Please enable camera", { icon: "📸" });
      return;
    }

    isRecording ? stopSpeechToText() : startSpeechToText();
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  if (!mockInterviewQuestions) return null;

  return (
    <div className="flex flex-col lg:w-[50%] bg-white p-4 md:rounded-lg md:border md:shadow-md mb-4 md:mb-0 md:mr-4">
      <div className="flex justify-center items-center mb-4">
        {webCamEnable ? (
          <Webcam
            onUserMedia={() => setWebCamEnable(true)}
            onUserMediaError={() => setWebCamEnable(false)}
            mirrored
            style={{ height: 250, width: "100%" }}
          />
        ) : (
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-40 h-40 flex justify-center items-center">
              <WebcamIcon className="w-20 h-20 text-gray-400" />
            </div>
            <Button
              onClick={() => setWebCamEnable(true)}
              variant="ghost"
              className="px-4 py-2 rounded-lg text-sm"
            >
              {!webCamEnable && (
                <p className="text-red-500 text-sm">Enable webcam to record.</p>
              )}
            </Button>
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-1 lg:gap-4">
        <Button
          onClick={startStopRecordingAnswer}
          disabled={isLoading || isAnswerSaved}
          className="mb-4 w-full bg-black text-white px-6 py-2 rounded-lg text-sm"
        >
          {isRecording && webCamEnable ? (
            <p className="text-red-500 flex flex-row font-bold gap-2">
              <Mic /> Stop
            </p>
          ) : isLoading ? (
            <>
              <Loader className="animate-spin" /> Saving...
            </>
          ) : (
            "Record Answer"
          )}
        </Button>
        {activeQuestionIndex === mockInterviewQuestions.length - 1 ? (
          <Link href="./feedback">
            <Button
              onClick={insertAllAnswers}
              disabled={!recorded}
              className="bg-black w-full text-white px-6 py-2 rounded-lg text-sm"
            >
              End Interview
            </Button>
          </Link>
        ) : (
          <Button
            onClick={() => {
              setActiveQuestionIndex(activeQuestionIndex + 1);
              setRecorded(false);
              setIsAnswerSaved(false);
            }}
            disabled={!recorded}
            className="bg-black w-full text-white px-6 py-2 rounded-lg text-sm"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default RecordAnswers;
