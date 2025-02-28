import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ExpandState = "stretchX" | "stretchY" | null;

interface PlaybackControlsProps {
  expand: ExpandState;
  progressPosition: number;
  setProgressPosition: (value: number) => void;
  onCompleteAnimation: () => void;
}

export const PlaybackControls = ({
  expand,
  progressPosition,
  setProgressPosition,
  onCompleteAnimation,
}: PlaybackControlsProps) => {
  // Playback state
  const [timeRemaining, setTimeRemaining] = useState(-0.48);
  const [progressKey, setProgressKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Animation settings
  const animationDuration = 48;
  const timerInterval = 1000;

  // Reset animations function
  const resetAnimations = () => {
    setTimeRemaining(-0.48);
    setProgressPosition(0);
    setIsPlaying(true);
    setIsCompleted(false);
    setProgressKey((prevKey) => prevKey + 1);
  };

  // Handle play/pause button click
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

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: -30,
        transition: { duration: 0.2 },
      }}
      transition={{
        opacity: { delay: 0.6, duration: 0.6 },
        y: { type: "spring", delay: 0.6, duration: 0.35 },
      }}
      className="mt-[13px] flex h-[25px] w-full items-center px-[14px]"
    >
      {/* Play/Pause Button */}
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

      {/* Progress Bar */}
      <div className="ml-[3px] w-[337px]">
        <motion.div
          onAnimationComplete={() => {
            onCompleteAnimation();
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
          <motion.div
            key={progressKey}
            initial={{ width: progressPosition * 337 }}
            animate={{ width: isPlaying ? 337 : progressPosition * 337 }}
            onUpdate={(latest) => {
              if (typeof latest.width === "number" && isPlaying && expand) {
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

      {/* Timer Display */}
      <p className="ml-[13px] font-medium text-white">
        {timeRemaining.toFixed(2)}
      </p>
    </motion.div>
  );
};
