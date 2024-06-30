import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import InterviewCard from './InterviewCard';

function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || !str.trim()) {
    return ''; // Handle non-string or empty string cases
  }
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

function InterviewList() {
  const { user } = useUser();
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getInterviewList();
    }
  }, [user]);

  const getInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id));
      
      setInterviews(result);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-lg">Interview List</h1>
      <h4 className="text-gray-500 text-sm">
        Access Previous Mock Interviews Here.
      </h4>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-6'>
        {interviews.length > 0 ? (
          interviews.map((interview, index) => (
            <InterviewCard
              key={index}
              title={interview.jobPosition}
              description={interview.jobDesc}
              yearsOfExp={interview.jobExperience}
              createdAt={interview.createdAt}
              interview={interview.mockId}
            />
          ))
        ) : (
          <p>No interviews found.</p>
        )}
      </div>
    </div>
  );
}

export default InterviewList;
