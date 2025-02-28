import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type ExpandState = "stretchX" | "stretchY" | null;

interface ContentSelectorProps {
  expand: ExpandState;
  onResetPlayback: () => void;
}

export const ContentSelector = ({
  expand,
  onResetPlayback,
}: ContentSelectorProps) => {
  // Tab options and selection state
  const tabOptions = [
    "Quantum Computing",
    "Quantum physics",
    "Tell me about Schrödinger cat",
    "Quantum mechanics",
    "Non-locality",
  ];
  const [selectedTab, setSelectedTab] = useState(tabOptions[2]);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLHeadingElement | null>>({});

  // Speed options and selection state
  const speedOptions = ["1x", "1.25x", "1.5x", "2x"];
  const [selectedSpeed, setSelectedSpeed] = useState("1x");

  // Function to scroll the selected tab to center
  const scrollTabToCenter = (tab: string) => {
    if (!tabsContainerRef.current || !tabRefs.current[tab]) return;

    const container = tabsContainerRef.current;
    const tabElement = tabRefs.current[tab];

    if (container && tabElement) {
      const containerWidth = container.offsetWidth;
      const tabPosition = tabElement.offsetLeft;
      const tabWidth = tabElement.offsetWidth;
      const scrollPosition = tabPosition - containerWidth / 2 + tabWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Handle tab selection
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    scrollTabToCenter(tab);
    onResetPlayback();
  };

  // Handle speed selection
  const handleSpeedChange = (speed: string) => {
    setSelectedSpeed(speed);
  };

  // Initial centering of the default selected tab
  useEffect(() => {
    if (expand && selectedTab) {
      const timerId = setTimeout(() => {
        scrollTabToCenter(selectedTab);
      }, 100);

      return () => clearTimeout(timerId);
    }
  }, [expand, selectedTab]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.15 },
      }}
      exit={{
        opacity: 0,
        y: 40,
        transition: { duration: 0.15 },
      }}
      className="mt-4 flex h-full w-full flex-col items-center justify-start text-[#515151]"
    >
      {/* Tab Selection */}
      <div
        ref={tabsContainerRef}
        className="scrollbar-hide w-full overflow-x-auto px-48"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        <div className="mx-auto flex w-max items-center justify-center gap-6 text-[18px] font-medium tracking-[-0.5px]">
          {tabOptions.map((tab) => (
            <h3
              key={tab}
              ref={(el) => (tabRefs.current[tab] = el)}
              className={`cursor-pointer whitespace-nowrap transition-colors duration-300 ${
                selectedTab === tab ? "text-white" : "hover:text-white/40"
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </h3>
          ))}
        </div>
      </div>

      {/* Speed Selection */}
      <div className="mt-6 flex w-max items-center gap-10 text-[16px] font-medium tracking-[-0.3px] text-[#515151]">
        {speedOptions.map((speed) => (
          <h4
            key={speed}
            className={`cursor-pointer transition-colors duration-300 ${
              selectedSpeed === speed ? "text-white" : "hover:text-white/40"
            }`}
            onClick={() => handleSpeedChange(speed)}
          >
            {speed}
          </h4>
        ))}
      </div>
    </motion.div>
  );
};
