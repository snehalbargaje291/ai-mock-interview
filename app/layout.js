import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { GridBackground } from "@/components/ui/background";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { AOSInit } from "@/components/ui/aos-init";
// import Header from "./dashboard/_components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Unlock Your Interview Potential with InterviewIQ",
  description: "Welcome to InterviewIQ, your intelligent companion for acing job interviews. This innovative app utilizes AI to simulate real interview scenarios tailored to your career aspirations and experience level. Generate insightful questions covering technical skills, problem-solving abilities, and behavioral competencies specific to your industry. Practice your responses with built-in speech analysis for precise feedback on articulation and clarity. Access a comprehensive database of model answers and expert tips to refine your interview techniques. Track your progress with performance metrics and personalized recommendations to boost your confidence and readiness. Whether you're a recent graduate or a seasoned professional, InterviewIQ is your go-to tool for mastering interviews and securing your dream job. Start your journey to interview success today with InterviewIQ!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} relative`}>
          <GridBackground />
          <div className="relative z-10">
            {/* <Header /> */}
            <AOSInit/>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
          </div>
          <ScrollToTop/>
        </body>
      </html>
    </ClerkProvider>
  );
}
