"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/navbar/navbar-fixed";
import NavbarCenter from "./components/navbar/navbar-center";
import PodcastWidget from "./components/audio-widget.tsx/audio-widget";
import ComponentSelector from "./components/component-selector";
import Toolbar from "./components/figma-toolbar/toolbar";

function App() {
  const [activeComponent, setActiveComponent] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const componentParam = params.get("component");
      if (
        componentParam &&
        ["fixed-nav", "floating-nav", "audio-widget", "figma-toolbar"].includes(
          componentParam,
        )
      ) {
        return componentParam;
      }
    }
    return "audio-widget";
  });

  const [isMobile, setIsMobile] = useState(false);
  // console.log("isMobile", isMobile);

  useEffect(() => {
    const checkIfMobile = () => {
      if (activeComponent.includes("nav")) {
        setIsMobile(window.innerWidth < 1024);
      } else setIsMobile(window.innerWidth < 550);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, [activeComponent]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("component", activeComponent);
    window.history.pushState({}, "", url);
  }, [activeComponent]);

  if (isMobile) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4 py-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-12 w-12 text-gray-400"
        >
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>

        <motion.h1
          className="mb-4 mt-4 text-2xl font-bold text-gray-800 sm:text-3xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Please view on desktop
        </motion.h1>
        <motion.p
          className="max-w-md text-base text-gray-600 sm:text-lg"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
        >
          This demo is optimized for larger screens.
        </motion.p>
      </div>
    );
  }

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "fixed-nav":
        return (
          <motion.div
            key="fixed-nav"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Navbar />
          </motion.div>
        );
      case "floating-nav":
        return (
          <motion.div
            key="floating-nav"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <NavbarCenter />
          </motion.div>
        );
      case "audio-widget":
        return (
          <motion.div
            key="audio-widget"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex justify-center pt-10"
          >
            <PodcastWidget />
          </motion.div>
        );
      case "figma-toolbar":
        return (
          <motion.div
            key="figma-toolbar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex justify-center"
          >
            <Toolbar />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="floating-nav"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <NavbarCenter />
          </motion.div>
        );
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-white">
      <AnimatePresence mode="wait">{renderActiveComponent()}</AnimatePresence>

      <motion.div
        className="absolute bottom-0 left-0 right-0 flex w-full flex-col-reverse items-center justify-between space-y-4 p-4 pb-6 sm:p-6 md:flex-row md:items-end md:space-y-0 md:px-10 md:pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h4 className="mt-8 font-mono text-sm font-medium sm:text-base md:mt-0">
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

        <ComponentSelector
          activeComponent={activeComponent}
          onChange={setActiveComponent}
        />
      </motion.div>
    </main>
  );
}

export default App;
