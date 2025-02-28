import { motion } from "framer-motion";
import { RefObject } from "react";

interface ContentSelectorsProps {
  tabsContainerRef: RefObject<HTMLDivElement>;
  tabRefs: RefObject<Record<string, HTMLHeadingElement | null>>;
  tabOptions: string[];
  selectedTab: string;
  selectedSpeed: string;
  handleTabChange: (tab: string) => void;
  handleSpeedChange: (speed: string) => void;
}

const speedOptions = ["1x", "1.25x", "1.5x", "2x"];

export const ContentSelectors = ({
  tabsContainerRef,
  tabRefs,
  tabOptions,
  selectedTab,
  selectedSpeed,
  handleTabChange,
  handleSpeedChange,
}: ContentSelectorsProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.15,
        },
      }}
      exit={{
        opacity: 0,
        y: 40,
        transition: {
          duration: 0.15,
        },
      }}
      className="mt-4 flex h-full w-full flex-col items-center justify-start text-[#515151]"
    >
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
              ref={(el) => {
                if (tabRefs.current) {
                  tabRefs.current[tab] = el;
                }
              }}
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
