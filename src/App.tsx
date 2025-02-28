"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./navbar";
import NavbarCenter from "./navbar-center";
import PodcastWidget from "./podcast-widget";

function App() {
  const [type, setType] = useState<"fixed" | "floating">("floating");
  // const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      // setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const podcast = true;

  if (podcast) {
    return (
      <main className="relative flex min-h-screen w-full items-center justify-center bg-slate-50">
        <PodcastWidget />
      </main>
    );
  }

  // if (isMobile) {
  //   return (
  //     <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4 text-center">
  //       <motion.h1
  //         className="mb-4 text-3xl font-bold text-gray-800"
  //         initial={{ opacity: 0, y: 10 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.5 }}
  //       >
  //         Please view on desktop
  //       </motion.h1>
  //       <motion.p
  //         className="text-lg text-gray-600"
  //         initial={{ opacity: 0, y: 15 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ delay: 0.05, duration: 0.5 }}
  //       >
  //         This demo is optimized for larger screens.
  //       </motion.p>
  //     </div>
  //   );
  // }

  return (
    <main className="relative min-h-screen w-full bg-slate-50">
      <AnimatePresence mode="wait">
        {type === "fixed" ? (
          <motion.div
            key="fixed"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Navbar />
          </motion.div>
        ) : (
          <motion.div
            key="floating"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <NavbarCenter />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-6 left-10 right-10 flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h4 className="font-mono text-base font-medium">
          Made by{" "}
          <a
            href="https://www.victorwilliams.me"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition hover:text-gray-500 hover:no-underline"
          >
            Victor Williams
          </a>
        </h4>

        <motion.button
          onClick={() => setType(type === "fixed" ? "floating" : "fixed")}
          className="rounded-xl bg-[#1c1d1f] px-[15px] py-2 text-[15px] font-medium leading-[20px] tracking-[-0.1px] text-[#f3f4f6]"
          layout
          transition={{ duration: 0.2 }}
        >
          Switch to {type === "fixed" ? "floating" : "fixed"} navbar
        </motion.button>
      </motion.div>
    </main>
  );
}

export default App;
