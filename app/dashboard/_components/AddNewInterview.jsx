"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function AddNewInterview() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    position: "",
    jobDescription: "",
    experience: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [jsonResp, setJsonResp] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const InputPrompt = `Based on the position of ${formData.position} with ${formData.experience} years of experience in ${formData.jobDescription}, provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT} appropriate and relevant interview questions along with their expected answers in JSON format. Each question and its corresponding answer should be included as fields in the JSON structure.`;
    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    try {
      const jsonMockRespArray = JSON.parse(MockJsonResponse);
      setJsonResp(jsonMockRespArray);

      if (jsonMockRespArray) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonResponse,
            jobPosition: formData.position,
            jobDesc: formData.jobDescription,
            jobExperience: formData.experience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
          })
          .returning({ mockId: MockInterview.mockId });

        if (resp) {
          toast.success("Interview created successfully!");
          setIsDialogOpen(false);
          setIsLoading(false);
          setIsNavigating(true);
          router.push("/dashboard/interview/" + resp[0]?.mockId);
        }
      }
    } catch (error) {
      setIsDialogOpen(false);
      console.error("Error parsing JSON:", error);
      toast.error(
        "Failed to generate valid interview questions. Please try again."
      );
      setFormData({
        position: "",
        jobDescription: "",
        experience: "",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <motion.div
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 1.1 }}
            className="p-5 border rounded-lg bg-secondary shadow-lg cursor-pointer transition-all flex justify-center items-center"
            onClick={() => setIsDialogOpen(true)}
          >
            <h1 className="text-sm">+ Create New</h1>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="w-[90%] h-auto md:w-auto p-6 rounded-lg overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              New Mock Interview
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Fill in the details below to create a new mock interview.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="position"
                className="text-sm font-medium text-gray-700"
              >
                Position/Role Name
              </Label>
              <Input
                id="position"
                name="position"
                placeholder="e.g., Frontend Developer"
                value={formData.position}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="jobDescription"
                className="text-sm font-medium text-gray-700"
              >
                Job Description/ Tech Stack
              </Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                placeholder="e.g., Develop user interfaces using React"
                value={formData.jobDescription}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="experience"
                className="text-sm font-medium text-gray-700"
              >
                Experience in Years
              </Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="e.g., 3"
                value={formData.experience}
                onChange={handleChange}
                min={0}
                max={50}
                required
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <DialogFooter className="mt-4 flex flex-row justify-end gap-2">
              <Button
                disabled={isLoading || isNavigating}
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Generating from AI
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="border bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {isNavigating && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" style={{zIndex:9999}}>
          <LoaderCircle className="w-12 h-12 animate-spin text-white" />
        </div>
      )}
    </>
  );
}

export default AddNewInterview;
