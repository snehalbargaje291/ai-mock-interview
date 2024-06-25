"use client"
import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion"

export default function Page() {
  return(
<motion.div
      initial={{ x: "-100vw" }} // Start position: off-screen to the left
      animate={{ x: 0 }} // End position: centered
      transition={{ type: "spring", stiffness: 50 }} // Animation type and properties
      className="bg-white flex items-center justify-center min-h-screen"
    >
      <SignUp path="/sign-up" />
    </motion.div>
  )
}
