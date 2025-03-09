"use client";

import { useState } from "react";
import cloud from "../../assets/memory-widget/cloud.png";
import imgOne from "../../assets/memory-widget/img_one.avif";
import imgTwo from "../../assets/memory-widget/img_two.avif";
import imgThree from "../../assets/memory-widget/img_three.avif";
import imgFour from "../../assets/memory-widget/img_four.avif";
import { motion, AnimatePresence } from "framer-motion";

interface MonthData {
  month: string;
  no_of_memories: number;
  memories: string[];
}

const MemoryWidget = () => {
  const [centeredMonthIndex, setCenteredMonthIndex] = useState(0);

  console.log("centeredMonthIndex", centeredMonthIndex);

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

  const renderCards = () => {
    const centeredMonthData = data[centeredMonthIndex];
    const numMemories = centeredMonthData.no_of_memories;
    const memories = centeredMonthData.memories;

    switch (numMemories) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0 } }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
            key="none"
            className="flex flex-col items-center gap-3"
          >
            <img
              src={cloud || "/placeholder.svg"}
              alt=""
              className="w-4 opacity-30"
            />
            <p className="text-[9.5px] tracking-[0.2px] text-white/30">
              No memories made this month
            </p>
          </motion.div>
        );
      case 1:
        return (
          <motion.div key="one" className="">
            <motion.div
              initial={{
                translateY: -280,
                rotate: "45deg",
              }}
              animate={{ translateY: -12, rotate: "5deg" }}
              exit={{
                translateY: 280,
                rotate: "25deg",
                transition: { duration: 0.3, delay: 0 },
              }}
              transition={{
                translateY: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.6,
                  delay: 0.3,
                },
                rotate: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.7,
                  delay: 0.3,
                },
              }}
              className="h-[180px] w-[180px] translate-y-[-12px] rotate-[5deg] rounded-lg border-[8px] border-white bg-white"
            >
              <img
                src={memories[0] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </motion.div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="two"
            className="grid grid-cols-[1fr] grid-rows-[1fr]"
          >
            <motion.div
              initial={{
                translateX: -30,
                translateY: -280,
                rotate: "-8deg",
              }}
              animate={{ translateX: -30, translateY: -10, rotate: "15deg" }}
              exit={{
                translateY: 260,
                rotate: "50deg",
                transition: { duration: 0.4, delay: 0.1 },
              }}
              transition={{
                translateY: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.6,
                  delay: 0.3,
                },
                rotate: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.7,
                  delay: 0.3,
                },
              }}
              className="col-[1] row-[1] h-[160px] w-[160px] translate-x-[-30px] translate-y-[-10px] rotate-[15deg] overflow-hidden rounded-lg border-[6px] border-white bg-white"
            >
              <img
                src={memories[0] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </motion.div>

            <motion.div
              initial={{
                translateX: 30,
                translateY: -280,
                rotate: "-60deg",
              }}
              animate={{ translateX: 30, translateY: -35, rotate: "-20deg" }}
              exit={{
                translateY: 290,
                rotate: "40deg",
                transition: { duration: 0.35, delay: 0 },
              }}
              transition={{
                translateY: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.6,
                  delay: 0.5,
                },
                rotate: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.7,
                  delay: 0.5,
                },
              }}
              className="col-[1] row-[1] h-[160px] w-[160px] translate-x-[30px] translate-y-[-35px] rotate-[-20deg] overflow-hidden rounded-lg border-[6px] border-white bg-white"
            >
              <img
                src={memories[1] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </motion.div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="three"
            className="grid grid-cols-[1fr] grid-rows-[1fr]"
          >
            <motion.div
              initial={{
                translateX: 50,
                translateY: -260,
                rotate: "10deg",
              }}
              animate={{ translateX: 50, translateY: -30, rotate: "35deg" }}
              exit={{
                translateY: 260,
                rotate: "40deg",
                transition: { duration: 0.3, delay: 0.1 },
              }}
              transition={{
                translateY: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.6,
                  delay: 0.3,
                },
                rotate: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.7,
                  delay: 0.3,
                },
              }}
              className="mr- [70px] col-[1] row-[1] h-[120px] w-[120px] translate-x-[50px] translate-y-[-30px] rotate-[35deg] overflow-hidden rounded-lg border-[6px] border-white bg-white"
            >
              <img
                src={memories[0] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </motion.div>

            <motion.div
              initial={{
                translateX: -40,
                translateY: -260,
                rotate: "-23deg",
              }}
              animate={{ translateX: -40, translateY: -30, rotate: "-15deg" }}
              exit={{
                translateY: 260,
                rotate: "-5deg",
                transition: { duration: 0.3, delay: 0.2 },
              }}
              transition={{
                translateY: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.6,
                  delay: 0.5,
                },
                rotate: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.7,
                  delay: 0.5,
                },
              }}
              className="col-[1] row-[1] h-[120px] w-[120px] translate-x-[-40px] translate-y-[-30px] rotate-[-15deg] overflow-hidden rounded-lg border-[6px] border-white bg-white"
            >
              <img
                src={memories[1] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </motion.div>

            <motion.div
              initial={{
                translateX: 0,
                translateY: -260,
                rotate: "-40deg",
              }}
              animate={{ translateX: 0, translateY: 25, rotate: "10deg" }}
              exit={{
                translateY: 260,
                rotate: "40deg",
                transition: { duration: 0.3, delay: 0 },
              }}
              transition={{
                translateY: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.6,
                  delay: 0.4,
                },
                rotate: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.7,
                  delay: 0.4,
                },
              }}
              className="col-[1] row-[1] h-[120px] w-[120px] translate-y-[25px] rotate-[10deg] overflow-hidden rounded-lg border-[6px] border-white bg-white"
            >
              <img
                src={memories[2] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </motion.div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="four"
            className="grid grid-cols-[1fr] grid-rows-[1fr]"
          >
            <motion.div
              initial={{
                translateX: 40,
                translateY: -260,
                rotate: "-15deg",
              }}
              animate={{ translateX: 40, translateY: -40, rotate: "15deg" }}
              exit={{
                translateY: 260,
                rotate: "30deg",
                transition: { duration: 0.3, delay: 0.1 },
              }}
              transition={{
                translateY: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.6,
                  delay: 0.3,
                },
                rotate: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.7,
                  delay: 0.3,
                },
              }}
              className="col-[1] row-[1] h-[120px] w-[120px] translate-x-[40px] translate-y-[-40px] rotate-[15deg] overflow-hidden rounded-lg border-[6px] border-white bg-white"
            >
              <img
                src={memories[0] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </motion.div>

            <motion.div
              initial={{
                translateX: -35,
                translateY: -260,
                rotate: "-75deg",
              }}
              animate={{ translateX: -35, translateY: 10, rotate: "-15deg" }}
              exit={{
                translateY: 260,
                rotate: "-30deg",
                transition: { duration: 0.3, delay: 0.05 },
              }}
              transition={{
                translateY: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.6,
                  delay: 0.4,
                },
                rotate: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.7,
                  delay: 0.4,
                },
              }}
              className="col-[1] row-[1] h-[120px] w-[120px] translate-x-[-35px] translate-y-[10px] rotate-[-15deg] overflow-hidden rounded-lg border-[6px] border-white bg-white"
            >
              <img
                src={memories[1] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </motion.div>

            <motion.div
              initial={{
                translateX: -60,
                translateY: -260,
                rotate: "-10deg",
              }}
              animate={{ translateX: -60, translateY: -35, rotate: "5deg" }}
              exit={{
                translateY: 260,
                rotate: "35deg",
                transition: { duration: 0.3, delay: 0.15 },
              }}
              transition={{
                translateY: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.6,
                  delay: 0.5,
                },
                rotate: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.7,
                  delay: 0.5,
                },
              }}
              className="col-[1] row-[1] h-[120px] w-[120px] translate-x-[-60px] translate-y-[-35px] rotate-[5deg] overflow-hidden rounded-lg border-[6px] border-white bg-white"
            >
              <img
                src={memories[2] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </motion.div>

            <motion.div
              initial={{
                translateX: 45,
                translateY: -260,
                rotate: "-145deg",
              }}
              animate={{ translateX: 45, translateY: 15, rotate: "-35deg" }}
              exit={{
                translateY: 260,
                rotate: "35deg",
                transition: { duration: 0.3, delay: 0.15 },
              }}
              transition={{
                translateY: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.6,
                  delay: 0.55,
                },
                rotate: {
                  type: "spring",
                  bounce: 0.45,
                  duration: 0.7,
                  delay: 0.55,
                },
              }}
              className="col-[1] row-[1] h-[120px] w-[120px] translate-x-[45px] translate-y-[15px] rotate-[-35deg] overflow-hidden rounded-lg border-[6px] border-white bg-white"
            >
              <img
                src={memories[3] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </motion.div>
          </motion.div>
        );
      default:
        return null;
    }
  };

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

  return (
    <div className="absolute inset-0 mx-auto my-auto flex h-[320px] w-[280px] flex-col items-center justify-center overflow-hidden rounded-[60px] border-[4px] border-[#222] bg-[#040404]">
      {/* <div className="absolute inset-0 mx-auto h-[400px] w-[1px] bg-white" /> */}
      <h3 className="absolute top-5 text-lg font-normal text-white">
        Memory Lane
      </h3>

      <div className="absolute inset-y-0 z-50 my-auto flex w-full items-center justify-between">
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

      <AnimatePresence mode="popLayout">{renderCards()}</AnimatePresence>

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

      <div className="absolute bottom-6 flex w-[280px] items-end">
        <motion.div
          className="flex"
          initial={{
            transform: `translateX(${128}px)`,
          }}
          animate={{
            transform: `translateX(${-(centeredMonthIndex * 235) + 128}px)`,
          }}
          transition={{
            type: "spring",
            bounce: 0.05,
            duration: 0.5,
            delay: 0.1,
          }}
        >
          {data.map((monthData, dataIndex) => (
            <div className="flex items-end" key={monthData.month}>
              <div
                id="month"
                className="flex w-[24px] flex-col items-center justify-center gap-[1px] text-white"
              >
                <div
                  className={`flex h-[11px] w-[11px] items-center justify-center rounded-full ${
                    monthData.no_of_memories > 0
                      ? "bg-[#5494FC]/[0.25]"
                      : "bg-[#181818]"
                  }`}
                >
                  <h5
                    className={`mb-[0px] ml-[1px] text-[6px] ${monthData.no_of_memories > 0 ? "text-[#4882E7]" : ""}`}
                  >
                    {monthData.no_of_memories}
                  </h5>
                </div>
                <h4 className="mb-[2px] text-[9px]">{monthData.month}</h4>
                <div className="h-[12px] w-[1px] rounded-full bg-[#FFF]" />
              </div>

              {dataIndex < data.length && (
                <div className="flex items-center gap-1.5">
                  {Array(31)
                    .fill(null)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="h-[8px] w-[1px] rounded-full bg-[#3C3C3C]"
                      />
                    ))}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MemoryWidget;
