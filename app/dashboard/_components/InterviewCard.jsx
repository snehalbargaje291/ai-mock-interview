import React from "react";
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
import { MockInterview } from "@/utils/schema";

function capitalizeFirstLetter(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

async function deleteInterview(interviewId) {
    try {
      const result = await db
        .delete(MockInterview)
        .where(eq(MockInterview.mockId, interviewId))
        .execute();

    if (result) {
      toast.success("Interview deleted successfully!");
    } else {
      toast.error("Failed to delete the interview.");
    }
  } catch (error) {
    console.error("Error deleting the interview:", error);
    toast.error("An error occurred. Please try again.");
  }
}

function InterviewCard({
  title,
  description,
  yearsOfExp,
  createdAt,
  interviewId,
}) {
  const router = useRouter();

  return (
    <motion.div whileTap={{ scale: 1.1 }}>
      <Card className="flex bg-secondary flex-col justify-between h-full relative">
        <CardHeader className="flex justify-between flex-row items-start">
          <div>
            <CardTitle className="text-md text-blue-800">
              {capitalizeFirstLetter(title)}
            </CardTitle>
            <CardDescription className="text-sm text-gray-700">
              {capitalizeFirstLetter(description)}
              <br />
              {yearsOfExp > 0 ? (yearsOfExp == 1 ? `${yearsOfExp} Year of Experience` : `${yearsOfExp} Years of Experience`) : 'Fresher'}
              <br />
              <span className="text-gray-400 text-xs my-1">
                Created At: {createdAt}
              </span>
            </CardDescription>
          </div>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteInterview(interviewId)}
          >
            <Trash2 size={20} />
          </button>
        </CardHeader>
        <div className="mt-auto">
          <CardFooter className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => {
                router.push("/dashboard/interview/" + interviewId + "/feedback");
              }}
            >
              Feedback
            </Button>
            <Button
              onClick={() => {
                router.push("/dashboard/interview/" + interviewId);
              }}
            >
              Start
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}

export default InterviewCard;
