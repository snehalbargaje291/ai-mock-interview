'use client'
import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  return (
    <motion.div
      initial={{ x: "100vw" }} 
      animate={{ x: 0 }} 
      transition={{ type: "spring", stiffness: 50 }} 
      className="flex mt-10 justify-center"
    >
      <SignIn
        path="/sign-in"
        redirectUrl="/dashboard" 
        onSignIn={handleRedirect} 
      />
    </motion.div>
  );
}
