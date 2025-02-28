import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const PodcastWidget = () => {
  const [expand, setExpand] = useState<"stretchX" | "stretchY" | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(-0.48);
  const timerRef = useRef<number | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLHeadingElement | null>>({});
  const [progressKey, setProgressKey] = useState(0); // Key for forcing progress bar re-render
  const [progressPosition, setProgressPosition] = useState(0); // 0 to 1 for progress tracking
  const [isPlaying, setIsPlaying] = useState(true); // Added play/pause state
  const previousExpandState = useRef<"stretchX" | "stretchY" | null>(null);
  const [isCompleted, setIsCompleted] = useState(false); // Track if animation has completed

  // console.log("expand", expand);
  console.log("progressPosition", progressPosition);
  // console.log("isPlaying", isPlaying);

  const tabOptions = [
    "Quantum Computing",
    "Quantum physics",
    "Tell me about Schrödinger cat",
    "Quantum mechanics",
    "Non-locality",
  ];

  // Default to the Schrödinger cat tab being selected (index 2)
  const [selectedTab, setSelectedTab] = useState(tabOptions[2]);

  // Default speed and duration values
  const [selectedSpeed, setSelectedSpeed] = useState("1x");
  const [animationDuration, setAnimationDuration] = useState(48); // Default duration in seconds
  const [timerInterval, setTimerInterval] = useState(1000); // Default interval in milliseconds

  // Available speed options
  const speedOptions = ["1x", "1.25x", "1.5x", "2x"];

  // Function to scroll to center the selected tab
  const scrollTabToCenter = (tab: string) => {
    if (!tabsContainerRef.current || !tabRefs.current[tab]) return;

    const container = tabsContainerRef.current;
    const tabElement = tabRefs.current[tab];

    if (container && tabElement) {
      const containerWidth = container.offsetWidth;
      const tabPosition = tabElement.offsetLeft;
      const tabWidth = tabElement.offsetWidth;

      // Calculate scroll position to center the tab
      const scrollPosition = tabPosition - containerWidth / 2 + tabWidth / 2;

      // Smooth scroll to the calculated position
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Function to reset and restart animations
  const resetAnimations = () => {
    setTimeRemaining(-0.48);
    setProgressPosition(0);
    setIsPlaying(true);
    setIsCompleted(false);
    setProgressKey((prevKey) => prevKey + 1);
  };

  // Function to handle speed selection
  const handleSpeedChange = (speed: string) => {
    setSelectedSpeed(speed);

    let speedFactor = 1;
    switch (speed) {
      case "1.25x":
        speedFactor = 1.25;
        break;
      case "1.5x":
        speedFactor = 1.5;
        break;
      case "2x":
        speedFactor = 2;
        break;
    }

    const totalDuration = 48; // Total duration in seconds
    const elapsedTime = totalDuration * progressPosition;
    const remainingTime = totalDuration - elapsedTime;
    const newRemainingDuration = remainingTime / speedFactor;

    setAnimationDuration(newRemainingDuration);
    setTimerInterval(1000 / speedFactor);

    // Force progress bar to re-render with new duration
    setProgressKey((prevKey) => prevKey + 1);
  };

  // Function to handle tab selection
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    scrollTabToCenter(tab);
    resetAnimations();
    console.log(`Tab changed to: ${tab}`);
  };

  // Initial centering of the default selected tab
  useEffect(() => {
    if (expand && selectedTab) {
      // Small delay to ensure the DOM is fully rendered
      const timerId = setTimeout(() => {
        scrollTabToCenter(selectedTab);
      }, 100);

      return () => clearTimeout(timerId);
    }
  }, [expand, selectedTab]);

  // Monitor expand state changes to reset animations when collapsing and re-expanding
  useEffect(() => {
    // If widget is collapsing (from any expanded state to null)
    if (previousExpandState.current !== null && expand === null) {
      resetAnimations();
    }

    // If widget is expanding after being collapsed (null to stretchX)
    if (previousExpandState.current === null && expand === "stretchX") {
      resetAnimations();
    }

    // Update the previous state for next comparison
    previousExpandState.current = expand;
  }, [expand]);

  // Start countdown timer when expand becomes "stretchY"
  useEffect(() => {
    if (expand === "stretchY") {
      if (isPlaying) {
        // Start or resume the timer
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        timerRef.current = window.setInterval(() => {
          setTimeRemaining((prev) => {
            const nextValue = Math.round((prev + 0.01) * 100) / 100;
            if (nextValue >= 0) {
              clearInterval(timerRef.current!);
              setIsPlaying(false);
              setIsCompleted(true);
              return 0.0;
            }
            return nextValue;
          });
        }, timerInterval);
      }
    } else if (expand === null) {
      // Reset when collapsed
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [expand, isPlaying, timerInterval]);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling to parent elements

    // If animation has completed and we're pressing play again, reset everything
    if (isCompleted && !isPlaying) {
      resetAnimations();
    } else {
      // Otherwise just toggle play/pause state
      setIsPlaying((prev) => !prev);
      setProgressKey((prevKey) => prevKey + 1);
    }
  };

  return (
    <motion.div
      animate={{
        width: expand ? 500 : 50,
        backgroundColor: expand ? "#000" : "#F4F4F4",
        height: expand === "stretchY" ? 160 : 50,
        scale: expand === "stretchY" ? [1, 0.98, 1] : 1,
      }}
      transition={{
        backgroundColor: { delay: !expand ? 0.5 : 0 },
        width: {
          type: "spring",
          bounce: !expand ? 0.15 : 0.25,
          duration: 0.5,
          delay: !expand ? 0.5 : 0,
        },
        height: {
          type: "spring",
          bounce: !expand ? 0.15 : 0.25,
          duration: 0.5,
          delay: !expand ? 0.5 : 0.9,
        },
        scale: { ease: "easeInOut", duration: 0.5 },
      }}
      onAnimationComplete={() => {
        console.log("Width animation completed");
      }}
      className="absolute left-0 right-0 top-[305px] mx-auto flex h-[50px] w-[50px] cursor-pointer flex-col items-center justify-start overflow-hidden rounded-[25px] bg-[#F4F4F4]"
    >
      <AnimatePresence>
        {expand && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
              transition: {
                duration: 0.2,
              },
            }}
            transition={{
              opacity: { delay: 0.6, duration: 0.6 },
              y: { type: "spring", delay: 0.6, duration: 0.35 },
            }}
            className="mt-[13px] flex h-[25px] w-full items-center px-[14px]"
          >
            <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full transition-colors duration-300 hover:bg-white/20">
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.img
                    key="pause"
                    src="/audio-widget/pause.png"
                    alt="Pause"
                    className="h-[20px] w-[18px] cursor-pointer"
                    onClick={handlePlayPause}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  />
                ) : (
                  <motion.img
                    key="play"
                    src="/audio-widget/play.png"
                    alt="Play"
                    className="h-[26px] w-[26px] cursor-pointer"
                    onClick={handlePlayPause}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="ml-[3px] w-[337px]">
              <motion.div
                onAnimationComplete={() => {
                  console.log("player animation completed");

                  setExpand("stretchY");
                }}
                initial={{
                  opacity: 0,
                  width: 0,
                }}
                animate={{
                  opacity: 1,
                  width: 337,
                }}
                transition={{
                  opacity: { delay: 1, duration: 0.6 },
                  width: {
                    delay: 1,
                    duration: 1,
                    ease: [0.74, -0.06, 0.38, 1.09],
                  },
                }}
                className="flex h-[5px] w-[337px] flex-col rounded-full bg-[#3C3C3C]"
              >
                {/* Progress bar with key to force re-render and dynamic duration */}
                <motion.div
                  key={progressKey}
                  initial={{ width: progressPosition * 337 }}
                  animate={{ width: isPlaying ? 337 : progressPosition * 337 }}
                  onUpdate={(latest) => {
                    if (
                      typeof latest.width === "number" &&
                      isPlaying &&
                      expand
                    ) {
                      setProgressPosition(latest.width / 337);
                    }
                  }}
                  onAnimationComplete={() => {
                    if (isPlaying) {
                      setIsCompleted(true);
                    }
                  }}
                  transition={{
                    width: {
                      duration: isPlaying ? animationDuration : 0,
                      ease: "linear",
                      delay: 0,
                    },
                  }}
                  className="h-[5px] rounded-full bg-white"
                />
              </motion.div>
            </div>

            <p className="ml-[13px] font-medium text-white">
              {timeRemaining.toFixed(2)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expand && (
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

            <div className="mt-6 flex w-max items-center gap-10 text-[16px] font-medium tracking-[-0.3px] text-[#515151]">
              {speedOptions.map((speed) => (
                <h4
                  key={speed}
                  className={`cursor-pointer transition-colors duration-300 ${selectedSpeed === speed ? "text-white" : "hover:text-white/40"}`}
                  onClick={() => handleSpeedChange(speed)}
                >
                  {speed}
                </h4>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        whileTap={{ scale: 0.85 }}
        onClick={() => {
          setProgressPosition(0);
          setExpand(expand === null ? "stretchX" : null);
        }}
        animate={{
          backgroundColor: expand ? "#fff" : "#f4f4f4",
        }}
        transition={{
          backgroundColor: { duration: 0.05, delay: !expand ? 0.5 : 0 },
          scale: { type: "spring" },
        }}
        className="absolute right-[5.9px] top-[5.9px] flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full bg-[#f4f4f4]"
      >
        <img src="/audio-widget/audio.png" className="w-6" alt="" />
      </motion.div>
    </motion.div>
  );
};

export default PodcastWidget;
