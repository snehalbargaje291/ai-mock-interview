import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Mic, WebcamIcon, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import toast from 'react-hot-toast';
import { chatSession } from '@/utils/GeminiAIModel';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
import Link from 'next/link';

function RecordAnswers({ interviewData, activeQuestionIndex, mockInterviewQuestions }) {
  const [webCamEnable, setWebCamEnable] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const [recorded, setRecorded] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      const combinedTranscript = results.map(result => result.transcript).join(' ');
      setUserAnswer(combinedTranscript);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 0) {
      saveUserAnswer();
    }
  }, [isRecording]);

  const saveUserAnswer = async () => {
    setIsLoading(true);

    if (userAnswer?.length < 10) {
      setIsLoading(false);
      toast.error('Error while saving answer, Please record again');
      return;
    }

    try {
      const feedbackPrompt = `Question: ${mockInterviewQuestions[activeQuestionIndex]?.question}, User Answer: ${userAnswer}, Depending on the Question and User Answer, please give rating out of 10 and feedback to user as area of improvement (if any) in just 3-5 lines to improve it in JSON format with rating field and feedback field. Also see if the user is repeating the question itself as answer and give appropriate rating and feedback in json`;

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response.text().replace('```json', '').replace('```', '');
      const jsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestions[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        rating: jsonFeedbackResp.rating,
        feedback: jsonFeedbackResp.feedback,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY'),
      });

      if (resp) {
        toast.success('Answer saved successfully!');
        setRecorded(true);
      } else {
        throw new Error('Failed to save answer');
      }
    } catch (error) {
      console.error('Error while saving answer:', error);
      toast.error('Error while saving answer, Please try again');
    } finally {
      setIsLoading(false);
      setUserAnswer('');
      setResults([]);
    }
  };

  const startStopRecordingAnswer = () => {
    if (!webCamEnable) {
      toast('Please enable camera', {
        icon: '📸',
      });
      return;
    }

    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className="flex flex-col lg:w-[50%] bg-white p-4 md:rounded-lg md:border md:shadow-md mb-4 md:mb-0 md:mr-4">
      <div className="flex justify-center items-center mb-4">
        {webCamEnable ? (
          <Webcam
            onUserMedia={() => setWebCamEnable(true)}
            onUserMediaError={() => setWebCamEnable(false)}
            mirrored={true}
            style={{ height: 250, width: '100%' }}
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
              {!webCamEnable && <p className="text-red-500 text-sm">Enable webcam to record.</p>}
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-1 lg:gap-4">
        <Button onClick={startStopRecordingAnswer} disabled={isLoading} className="mb-4 w-full bg-black text-white px-6 py-2 rounded-lg text-sm">
          {isRecording && webCamEnable ? (
            <p className="text-red-500 flex flex-row font-bold gap-2">
              <Mic /> Stop
            </p>
          ) : (
            isLoading ? (
              <><Loader className="animate-spin" /> Saving...</>
            ) : recorded ? 'Record Again' : 'Record Answer'
          )}
        </Button>
        <Link href={'./feedback'}>
          <Button className="bg-black w-full text-white px-6 py-2 rounded-lg text-sm">
            End Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default RecordAnswers;
