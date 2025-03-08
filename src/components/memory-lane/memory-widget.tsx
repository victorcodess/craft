"use client";

import { useState } from "react";
import cloud from "../../assets/memory-widget/cloud.png";
import imgOne from "../../assets/memory-widget/img_one.avif";
import imgTwo from "../../assets/memory-widget/img_two.avif";
import imgThree from "../../assets/memory-widget/img_three.avif";
import imgFour from "../../assets/memory-widget/img_four.avif";

interface MonthData {
  month: string;
  no_of_memories: number;
  memories: string[];
}

const MemoryWidget = () => {
  const [centeredMonthIndex, setCenteredMonthIndex] = useState(5);

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
          <div className="flex flex-col items-center gap-3">
            <img
              src={cloud || "/placeholder.svg"}
              alt=""
              className="w-4 opacity-30"
            />
            <p className="text-[9.5px] tracking-[0.2px] text-white/30">
              No memories made this month
            </p>
          </div>
        );
      case 1:
        return (
          <div className="">
            <div className="h-[180px] w-[180px] translate-y-[-12px] rotate-[5deg] rounded-lg border-[8px] border-white bg-white">
              <img
                src={memories[0] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-[1fr] grid-rows-[1fr]">
            <div className="col-[1] row-[1] h-[160px] w-[160px] translate-x-[-30px] translate-y-[-10px] rotate-[15deg] overflow-hidden rounded-lg border-[6px] border-white bg-white">
              <img
                src={memories[0] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </div>

            <div className="col-[1] row-[1] h-[160px] w-[160px] translate-x-[30px] translate-y-[-35px] rotate-[-20deg] overflow-hidden rounded-lg border-[6px] border-white bg-white">
              <img
                src={memories[1] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-[1fr] grid-rows-[1fr]">
            <div className="mr- [70px] col-[1] row-[1] h-[120px] w-[120px] translate-x-[50px] translate-y-[-30px] rotate-[35deg] overflow-hidden rounded-lg border-[6px] border-white bg-white">
              <img
                src={memories[0] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </div>

            <div className="col-[1] row-[1] h-[120px] w-[120px] translate-x-[-40px] translate-y-[-30px] rotate-[-15deg] overflow-hidden rounded-lg border-[6px] border-white bg-white">
              <img
                src={memories[1] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </div>

            <div className="col-[1] row-[1] h-[120px] w-[120px] translate-y-[25px] rotate-[10deg] overflow-hidden rounded-lg border-[6px] border-white bg-white">
              <img
                src={memories[2] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-[1fr] grid-rows-[1fr]">
            <div className="mr- [70px] col-[1] row-[1] h-[120px] w-[120px] translate-x-[40px] translate-y-[-40px] rotate-[15deg] overflow-hidden rounded-lg border-[6px] border-white bg-white">
              <img
                src={memories[0] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </div>

            <div className="col-[1] row-[1] h-[120px] w-[120px] translate-x-[-35px] translate-y-[10px] rotate-[-15deg] overflow-hidden rounded-lg border-[6px] border-white bg-white">
              <img
                src={memories[1] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </div>

            <div className="col-[1] row-[1] h-[120px] w-[120px] translate-x-[-60px] translate-y-[-35px] rotate-[5deg] overflow-hidden rounded-lg border-[6px] border-white bg-white">
              <img
                src={memories[2] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </div>

            <div className="col-[1] row-[1] h-[120px] w-[120px] translate-x-[45px] translate-y-[15px] rotate-[-35deg] overflow-hidden rounded-lg border-[6px] border-white bg-white">
              <img
                src={memories[3] || "/placeholder.svg"}
                className="h-full w-full rounded-md"
                alt=""
              />
            </div>
          </div>
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

      {renderCards()}

      <div className="absolute bottom-10 flex w-full items-center justify-between px-1.5 text-[7px] text-[#515151]">
        <h6>{formattedBeforeText}</h6>
        <h6>{formattedAfterText}</h6>
      </div>

      <div className="absolute bottom-6 flex w-[280px] items-end">
        <div
          className="flex"
          style={{
            transform: `translateX(${-(centeredMonthIndex * 235) + 128}px)`,
            transition: "transform 0.3s ease-out",
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
        </div>
      </div>
    </div>
  );
};

export default MemoryWidget;
