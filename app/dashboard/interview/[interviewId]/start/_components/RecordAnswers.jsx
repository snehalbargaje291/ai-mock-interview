// components/RecordAnswers.jsx
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Mic, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';

function RecordAnswers() {
  const [webCamEnable, setWebCamEnable] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(()=>{
    results.map((result)=>{
        setUserAnswer(prevAns=> prevAns+ result?.transcript);
    })
  },[results])

  const SaveUserAnswer=()=>{
     if(isRecording){
      stopSpeechToText();
      if(userAnswer?.length<10){
        
      }
     }
     else{
      startSpeechToText();
     }
  }

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
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={SaveUserAnswer} className="mb-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-600 text-sm" >
        {isRecording && webCamEnable ? <p className='text-red-500 flex flex-row font-bold gap-2'><Mic/>Stop</p> : 'Record Answer'}
        </Button>
        <Button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-700 text-sm">
          End Interview
        </Button>
        {/* <Button onClick={()=>{
            console.log(userAnswer)
        }} >Show Answer</Button> */}
      </div>
    </div>
  );
}

export default RecordAnswers;
