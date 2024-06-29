"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { motion } from "framer-motion";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnable, setWebCamEnable] = useState(false);

  const interviewInfo = JSON.parse(process.env.NEXT_PUBLIC_INFORMATION);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
      setInterviewData(result[0] || {});
    } catch (error) {
      console.error("Error fetching interview details:", error);
      setInterviewData({});
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }} className="flex flex-col justify-center items-center p-4 md:p-8">
      <h1 className="mb-6 font-bold text-xl text-gray-900">Start Interview</h1>

      <div className="rounded-lg border bg-white py-6 px-4 md:px-8 lg:w-[80%] shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex justify-center items-center">
          {webCamEnable ? (
            <Webcam 
              onUserMedia={() => setWebCamEnable(true)}
              onUserMediaError={() => setWebCamEnable(false)}
              mirrored={true}
              style={{ height: 150, width: "100%" }}
            />
          ) : (
            <div className="flex flex-col justify-center items-center gap-4">
              <WebcamIcon className="w-12 md:w-20 h-12 md:h-20 text-gray-400" />
              <Button onClick={() => setWebCamEnable(true)} variant="ghost" className="text-gray-400 px-2 py-2 rounded-lg hover:bg-gray-400">Enable Webcam and Microphone</Button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {interviewData && Object.keys(interviewData).length > 0 ? (
            <>
              <div className="text-gray-700 text-sm md:text-md p-3">
                <h2 ><strong>Job Role/Job Position:</strong> {interviewData.jobPosition}</h2>
                <h2 ><strong>Job Description:</strong> {interviewData.jobDesc}</h2>
                <h2 ><strong>Years of Experience:</strong> {interviewData.jobExperience}</h2>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Loading interview details...</p>
          )}
        </div>
        
      </div>
      <div className="p-3 rounded-lg border-l-4 border-yellow-400 shadow-lg text-sm bg-yellow-50">
                <h2 className="flex gap-2 items-center text-yellow-600"><Lightbulb /><strong>Information:</strong></h2>
                <p className="mt-3 text-yellow-600">{interviewInfo.interviewAlert}</p>
                <p className="mt-1 text-yellow-600">{interviewInfo.warningWebcam}</p>
              </div>
      </div>
      
      
      <div className="w-full flex justify-end mt-6 lg:w-[80%]">
        <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
        <Button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-600">Start Interview</Button>
        </Link>
      </div>
    </motion.div>
  );
}

export default Interview;
