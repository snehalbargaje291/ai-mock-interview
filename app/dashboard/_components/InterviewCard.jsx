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

function capitalizeFirstLetter(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

function InterviewCard({
  title,
  description,
  yearsOfExp,
  createdAt,
  interview,
}) {
  const router = useRouter();

  return (
    <motion.div whileTap={{ scale: 1.1 }}>
      <Card className="flex bg-secondary flex-col justify-between h-full">
        <CardHeader>
          <CardTitle className="text-md text-blue-800">
            {capitalizeFirstLetter(title)}
          </CardTitle>
          <CardDescription className="text-sm text-gray-700">
            {capitalizeFirstLetter(description)}
            <br />
            Years of Experience: {yearsOfExp}
            <br />
            <span className="text-gray-400 text-xs my-1">
              Created At: {createdAt}
            </span>
          </CardDescription>
        </CardHeader>
        <div className="mt-auto">
          <CardFooter className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => {
                router.push("/dashboard/interview/" + interview + "/feedback");
              }}
            >
              Feedback
            </Button>
            <Button
              onClick={() => {
                router.push("/dashboard/interview/" + interview);
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
