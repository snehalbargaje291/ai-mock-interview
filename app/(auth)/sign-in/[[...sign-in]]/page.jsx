'use client'
import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion"

export default function Page() {
  return (
    <motion.div
      initial={{ x: "100vw" }} 
      animate={{ x: 0 }} 
      transition={{ type: "spring", stiffness: 50 }} 
      className="flex mt-10 justify-center"
    >
        <SignIn path="/sign-in"  />
    </motion.div>
  )
}