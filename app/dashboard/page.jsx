"use client";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import { motion } from "framer-motion";
import InterviewList from "./_components/InterviewList";

function Dashboard() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <h1 className="font-bold text-lg">Dashboard</h1>
            <h4 className="text-gray-500 text-sm">
                Create and start your AI Mock Interview!
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 my-5">
                <AddNewInterview />
            </div>
            <InterviewList />
        </motion.div>
    );
}

export default Dashboard;
