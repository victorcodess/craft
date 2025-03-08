import { AnimatePresence, motion } from "framer-motion";
import pause from "../../assets/audio-widget/pause.png";
import play from "../../assets/audio-widget/play.png";

type ExpandState = "stretchX" | "stretchY" | null;

interface PlaybackControlsProps {
  timeRemaining: number;
  progressKey: number;
  progressPosition: number;
  isPlaying: boolean;
  animationDuration: number;
  expand: ExpandState;
  setProgressPosition: (value: number) => void;
  setIsCompleted: (value: boolean) => void;
  handlePlayPause: (e: React.MouseEvent) => void;
  setExpand: (value: ExpandState) => void;
}

export const PlaybackControls = ({
  timeRemaining,
  progressKey,
  progressPosition,
  isPlaying,
  animationDuration,
  expand,
  setProgressPosition,
  setIsCompleted,
  handlePlayPause,
  setExpand,
}: PlaybackControlsProps) => {
  return (
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
              src={pause}
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
              src={play}
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

      <p className="ml-[13px] font-medium text-white">
        {timeRemaining.toFixed(2)}
      </p>
    </motion.div>
  );
};
