"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./navbar";
import NavbarCenter from "./navbar-center";

function App() {
  const [type, setType] = useState<"fixed" | "floating">("floating");

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

      <motion.button
        onClick={() => setType(type === "fixed" ? "floating" : "fixed")}
        className="absolute bottom-6 right-6 rounded-xl bg-[#1c1d1f] px-[15px] py-2 text-[15px] font-medium leading-[20px] tracking-[-0.1px] text-[#f3f4f6]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        layout
        transition={{ duration: 0.2 }}
      >
        Switch to {type === "fixed" ? "floating" : "fixed"} navbar
      </motion.button>
    </main>
  );
}

export default App;
