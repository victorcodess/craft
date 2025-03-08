import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { PlaybackControls } from "./playback-controls";
import { ContentSelectors } from "./content-selector";
import { AudioToggleButton } from "./audio-toggle-button";

const tabOptions = [
  "Quantum Computing",
  "Quantum physics",
  "Tell me about Schrödinger cat",
  "Quantum mechanics",
  "Non-locality",
];

type ExpandState = "stretchX" | "stretchY" | null;

const AudioWidget = () => {
  const [expand, setExpand] = useState<ExpandState>(null);
  const [timeRemaining, setTimeRemaining] = useState(-0.48);
  const timerRef = useRef<number | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLHeadingElement | null>>({});
  const [progressKey, setProgressKey] = useState(0);
  const [progressPosition, setProgressPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const previousExpandState = useRef<ExpandState>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const [selectedTab, setSelectedTab] = useState(tabOptions[2]);

  const [selectedSpeed, setSelectedSpeed] = useState("1x");
  const [animationDuration, setAnimationDuration] = useState(48);
  const [timerInterval, setTimerInterval] = useState(1000);

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

  const resetAnimations = () => {
    setTimeRemaining(-0.48);
    setProgressPosition(0);
    setIsPlaying(true);
    setIsCompleted(false);
    setProgressKey((prevKey) => prevKey + 1);
  };

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

    const totalDuration = 48;
    const elapsedTime = totalDuration * progressPosition;
    const remainingTime = totalDuration - elapsedTime;
    const newRemainingDuration = remainingTime / speedFactor;

    setAnimationDuration(newRemainingDuration);
    setTimerInterval(1000 / speedFactor);

    // Force progress bar to re-render with new duration
    setProgressKey((prevKey) => prevKey + 1);
  };

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

  useEffect(() => {
    // If widget is collapsing (from any expanded state to null)
    if (previousExpandState.current !== null && expand === null) {
      resetAnimations();
    }

    // If widget is expanding after being collapsed (null to stretchX)
    if (previousExpandState.current === null && expand === "stretchX") {
      resetAnimations();
    }

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
    e.stopPropagation();

    // If animation has completed and you're pressing play again, reset everything
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
      className="absolute left-0 right-0 top-[305px] mx-auto flex h-[50px] w-[50px] cursor-pointer flex-col items-center justify-start overflow-hidden rounded-[25px] bg-[#F4F4F4]"
    >
      <AnimatePresence>
        {expand && (
          <PlaybackControls
            timeRemaining={timeRemaining}
            progressKey={progressKey}
            progressPosition={progressPosition}
            isPlaying={isPlaying}
            animationDuration={animationDuration}
            expand={expand}
            setProgressPosition={setProgressPosition}
            setIsCompleted={setIsCompleted}
            handlePlayPause={handlePlayPause}
            setExpand={setExpand}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expand && (
          <ContentSelectors
            tabsContainerRef={tabsContainerRef}
            tabRefs={tabRefs}
            tabOptions={tabOptions}
            selectedTab={selectedTab}
            selectedSpeed={selectedSpeed}
            handleTabChange={handleTabChange}
            handleSpeedChange={handleSpeedChange}
          />
        )}
      </AnimatePresence>

      <AudioToggleButton
        expand={expand}
        setExpand={setExpand}
        setProgressPosition={setProgressPosition}
      />
    </motion.div>
  );
};

export default AudioWidget;
