import { motion } from "framer-motion";
import SwipeContainer from "./swipe-container";

interface MonthData {
  month: string;
  no_of_memories: number;
  memories: string[];
}

interface TimelineBarProps {
  centeredMonthIndex: number;
  data: MonthData[];
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const TimelineBar = ({
  centeredMonthIndex,
  data,
  onSwipeLeft,
  onSwipeRight,
}: TimelineBarProps) => {
  return (
    <div className="absolute bottom-6 flex w-[280px] items-start">
      <SwipeContainer
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      >
        <motion.div
          className="flex"
          initial={{
            transform: `translateX(${128}px)`,
          }}
          animate={{
            transform: `translateX(${-(centeredMonthIndex * 235) + 128}px)`,
          }}
          transition={{
            duration: 0.6,
            type: "spring",
            bounce: 0.05,
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
      </SwipeContainer>
    </div>
  );
};

export default TimelineBar;