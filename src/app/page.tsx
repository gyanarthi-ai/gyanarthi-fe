"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"
import curve from "../assets/hero/curve.png"
import robot from "../assets/hero/robot.jpg"
import Features from "@/components/home/features";
import Collaboration from "@/components/home/collaboration";
import Link from "next/link";
const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-[#0f0523] via-[#1b0645] to-[#320a46] scroll-smooth">
      <div className="min-h-screen  text-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-teal-400/50 blur-sm" />
        <div className="absolute top-20 right-20 w-3 h-3 rounded-full bg-orange-400/50 blur-sm" />
        <div className="absolute bottom-40 left-20 w-4 h-4 rounded-full bg-teal-500/30 blur-sm" />

        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Get All Accurate AI Data<br />
              only from<span className="relative">
                {" "}Gyanarthi
                <div className="absolute w-full h-4 right-0">
                  <Image alt="" src={curve} fill></Image>
                </div>
              </span>
            </h1>
            <div className="flex flex-col gap-3">
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Unleash the power of our very own validated AI data to get the most accurate and reliable information.
              </p>
              <Link href={'/auth/login'} >
                <Button size="lg" className="bg-white text-black hover:bg-white/90">
                  GET STARTED
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="hidden absolute -right-10 top-40 z-10 bg-gray-900/50 backdrop-blur-md rounded-lg p-3 md:flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-orange-400"></div>
              <div>
                <div className="text-sm font-medium">AI Validation</div>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-purple-400"></div>
                  <div className="w-6 h-6 rounded-full bg-blue-400"></div>
                  <div className="w-6 h-6 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="text-xs text-gray-400">1m ago</div>
            </motion.div>

            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="aspect-[16/9] rounded-lg bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full blur-3xl opacity-20"></div>
                  <Image
                    src={robot}
                    alt="AI Assistant"
                    fill
                    objectFit="cover"
                    className="relative z-10"
                    unoptimized
                  />
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-900/50 backdrop-blur-md rounded-full py-2 px-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                  <span className="text-sm">AI is generating</span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 w-64 h-32 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl -rotate-6"></div>
            <div className="absolute -bottom-6 -right-6 w-64 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl rotate-6"></div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-t from-black to-transparent h-64 w-full" />
      <Features />
      <Collaboration />
    </div>
  );
};

export default HomePage;
