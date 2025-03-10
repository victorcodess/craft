import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import imgOne from "../../assets/memory-widget/img_one.avif";
import imgTwo from "../../assets/memory-widget/img_two.avif";
import imgThree from "../../assets/memory-widget/img_three.avif";
import imgFour from "../../assets/memory-widget/img_four.avif";
import MemoryCards from "./memory-cards";
import TimelineBar from "./timeline-bar";

interface MonthData {
  month: string;
  no_of_memories: number;
  memories: string[];
}

const MemoryWidget = () => {
  const [centeredMonthIndex, setCenteredMonthIndex] = useState(9);

  const data: MonthData[] = [
    {
      month: "January",
      no_of_memories: 2,
      memories: [imgFour, imgOne],
    },
    {
      month: "Februrary",
      no_of_memories: 0,
      memories: [],
    },
    {
      month: "March",
      no_of_memories: 3,
      memories: [imgTwo, imgThree, imgOne],
    },
    {
      month: "April",
      no_of_memories: 1,
      memories: [imgThree],
    },
    {
      month: "May",
      no_of_memories: 4,
      memories: [imgOne, imgTwo, imgThree, imgFour],
    },
    {
      month: "June",
      no_of_memories: 2,
      memories: [imgTwo, imgFour],
    },
    {
      month: "July",
      no_of_memories: 0,
      memories: [],
    },
    {
      month: "August",
      no_of_memories: 3,
      memories: [imgFour, imgTwo, imgOne],
    },
    {
      month: "September",
      no_of_memories: 1,
      memories: [imgTwo],
    },
    {
      month: "October",
      no_of_memories: 4,
      memories: [imgThree, imgFour, imgOne, imgTwo],
    },
    {
      month: "November",
      no_of_memories: 0,
      memories: [],
    },
    {
      month: "December",
      no_of_memories: 1,
      memories: [imgOne],
    },
  ];

  const calculateMemoryStats = (
    centeredMonthIndex: number,
    data: MonthData[],
  ) => {
    let memoriesBeforeCurrent = 0;
    let memoriesAfterCurrent = 0;

    data.forEach((monthData, index) => {
      if (index < centeredMonthIndex) {
        memoriesBeforeCurrent += monthData.no_of_memories;
      } else if (index > centeredMonthIndex) {
        memoriesAfterCurrent += monthData.no_of_memories;
      }
    });

    const formatMemoryText = (count: number) => {
      if (count === 0) return "No memories";
      return `${count} ${count === 1 ? "memory" : "memories"}`;
    };

    return {
      formattedBeforeText: formatMemoryText(memoriesBeforeCurrent),
      formattedAfterText: formatMemoryText(memoriesAfterCurrent),
    };
  };

  const { formattedBeforeText, formattedAfterText } = calculateMemoryStats(
    centeredMonthIndex,
    data,
  );

  const centeredMonthData = data[centeredMonthIndex];

  return (
    <div className="absolute inset-0 mx-auto my-auto flex h-[320px] w-[280px] flex-col items-center justify-center overflow-hidden rounded-[60px] border-[4px] border-[#222] bg-[#040404]">
      <h3 className="absolute top-5 text-lg font-normal text-white">
        Memory Lane
      </h3>

      <div className="fl ex absolute inset-y-0 z-50 my-auto hidden h-min w-full items-center justify-between">
        <button
          disabled={centeredMonthIndex === 0}
          onClick={() => setCenteredMonthIndex(centeredMonthIndex - 1)}
          className="w-5 rounded-r-sm bg-white disabled:bg-white/20"
        >
          -
        </button>
        <button
          disabled={centeredMonthIndex === data.length - 1}
          onClick={() => setCenteredMonthIndex(centeredMonthIndex + 1)}
          className="w-5 rounded-l-sm bg-white disabled:bg-white/20"
        >
          +
        </button>
      </div>

      <AnimatePresence mode="wait">
        <MemoryCards
          key={centeredMonthIndex}
          numMemories={centeredMonthData.no_of_memories}
          memories={centeredMonthData.memories}
        />
      </AnimatePresence>

      <div className="absolute bottom-10 flex w-full items-center justify-between px-1.5 text-[7px] text-[#515151]">
        <AnimatePresence mode="wait">
          <motion.h6
            key={`before-${formattedBeforeText}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.05 }}
          >
            {formattedBeforeText}
          </motion.h6>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.h6
            key={`after-${formattedAfterText}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.05 }}
          >
            {formattedAfterText}
          </motion.h6>
        </AnimatePresence>
      </div>

      <TimelineBar
        centeredMonthIndex={centeredMonthIndex}
        data={data}
        onSwipeLeft={() => {
          if (centeredMonthIndex < data.length - 1) {
            setCenteredMonthIndex(centeredMonthIndex + 1);
          }
        }}
        onSwipeRight={() => {
          if (centeredMonthIndex > 0) {
            setCenteredMonthIndex(centeredMonthIndex - 1);
          }
        }}
      />
    </div>
  );
};

export default MemoryWidget;
