"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

type ComponentOption = {
  id: string;
  label: string;
};

const options: ComponentOption[] = [
  { id: "fixed-nav", label: "Fixed Navbar" },
  { id: "floating-nav", label: "Floating Navbar" },
  { id: "audio-widget", label: "Audio Widget" },
  { id: "figma-toolbar", label: "Figma Toolbar" },
];

interface ComponentSelectorProps {
  activeComponent: string;
  onChange: (component: string) => void;
}

export default function ComponentSelector({
  activeComponent,
  onChange,
}: ComponentSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  // Get the label of the active component
  const activeLabel =
    options.find((opt) => opt.id === activeComponent)?.label ||
    "Select Component";

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={selectorRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-10 right-0 z-10 h-min w-full min-w-[180px] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="space-y-0">
              {options.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm ${
                    activeComponent === option.id
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  transition={{ duration: 0.1 }}
                >
                  {option.label}
                  {activeComponent === option.id && (
                    <Check className="h-4 w-4 text-gray-800" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-w-[180px] items-center justify-between rounded-xl bg-[#1c1d1f] px-4 py-2 text-[15px] font-medium leading-[20px] tracking-[-0.1px] text-[#f3f4f6]"
        layout
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <span>{activeLabel}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className=""
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </div>
  );
}
