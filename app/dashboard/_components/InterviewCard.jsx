import React, { useState } from "react";
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
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { MockInterview, UserAnswer } from "@/utils/schema";

function capitalizeFirstLetter(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

async function deleteInterview(interviewId, onDelete) {
  try {
    const result = await db
      .delete(MockInterview)
      .where(eq(MockInterview.mockId, interviewId))
      .execute();

    if (result) {
      toast.success("Interview deleted successfully!");
      onDelete(interviewId); // Update state in InterviewList
    } else {
      toast.error("Failed to delete the interview.");
    }
  } catch (error) {
    console.error("Error deleting the interview:", error);
    toast.error("An error occurred. Please try again.");
  }
}

async function clearPreviousAnswers(interviewId) {
  try {
    const previousAnswers = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId));

    if (previousAnswers.length > 0) {
      const result = await db
        .delete(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .execute();

      if (result) {
        toast.success("Previous answers cleared successfully!");
      } else {
        toast.error("Failed to clear previous answers.");
      }
    }
  } catch (error) {
    console.error("Error clearing previous answers:", error);
    toast.error("An error occurred. Please try again.");
  }
}

async function hasPreviousAnswers(interviewId) {
  try {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId));
    return result.length > 0;
  } catch (error) {
    console.error("Error checking previous answers:", error);
    return false;
  }
}

function InterviewCard({
  title,
  description,
  yearsOfExp,
  createdAt,
  interviewId,
  onDelete, // Callback function from InterviewList
}) {
  const [showModal, setShowModal] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const router = useRouter();

  const handleStartClick = async () => {
    const hasResponses = await hasPreviousAnswers(interviewId);
    if (hasResponses) {
      setShowAlertDialog(true);
    } else {
      await clearPreviousAnswers(interviewId);
      router.push("/dashboard/interview/" + interviewId);
    }
  };

  const handleCloseModal = () => {
    setShowAlertDialog(false);
  };

  const handleConfirmModal = async () => {
    setShowAlertDialog(false);
    await clearPreviousAnswers(interviewId);
    router.push("/dashboard/interview/" + interviewId);
  };

  const handleDelete = () => {
    deleteInterview(interviewId, onDelete);
  };

  return (
    <motion.div whileTap={{ scale: 1.1 }}>
      <Card className="flex bg-secondary flex-col justify-between h-full relative">
        <CardHeader className="flex justify-between flex-row items-start">
          <div>
            <CardTitle className="text-md text-blue-800">
              {capitalizeFirstLetter(title)}
            </CardTitle>
            <CardDescription className="text-sm text-gray-700">
              {capitalizeFirstLetter(description.trim().slice(0, 100) + "...")}
              <br />
              {yearsOfExp > 0
                ? yearsOfExp === 1
                  ? `${yearsOfExp} Year of Experience`
                  : `${yearsOfExp} Years of Experience`
                : "Fresher"}
              <br />
              <span className="text-gray-400 text-xs my-1">
                Created At: {createdAt}
              </span>
            </CardDescription>
          </div>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={handleDelete}
          >
            <Trash2 size={20} />
          </button>
        </CardHeader>
        <div className="mt-auto">
          <CardFooter className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => {
                router.push(
                  "/dashboard/interview/" + interviewId + "/feedback"
                );
              }}
            >
              Feedback
            </Button>
            <AlertDialog open={showAlertDialog}>
              <AlertDialogTrigger asChild>
                <Button onClick={handleStartClick}>Start</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will clear all previous responses and start a
                    new interview. This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleCloseModal}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleConfirmModal}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}

export default InterviewCard;
