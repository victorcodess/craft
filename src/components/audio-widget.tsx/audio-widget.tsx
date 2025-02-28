import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { PlaybackControls } from "./playback-controls";
import { ContentSelector } from "./content-selector";
import { AudioToggleButton } from "./audio-toggle-button";

const AudioWidget = () => {
  const [expand, setExpand] = useState<"stretchX" | "stretchY" | null>(null);
  const [progressPosition, setProgressPosition] = useState(0);
  const previousExpandState = useRef<"stretchX" | "stretchY" | null>(null);

  // Handle expand state changes
  useEffect(() => {
    // If widget is collapsing or expanding, reset child component states
    if (
      (previousExpandState.current !== null && expand === null) ||
      (previousExpandState.current === null && expand === "stretchX")
    ) {
      setProgressPosition(0);
    }

    // Update the previous state for next comparison
    previousExpandState.current = expand;
  }, [expand]);

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
            expand={expand}
            progressPosition={progressPosition}
            setProgressPosition={setProgressPosition}
            onCompleteAnimation={() => setExpand("stretchY")}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expand && (
          <ContentSelector
            expand={expand}
            onResetPlayback={() => setProgressPosition(0)}
          />
        )}
      </AnimatePresence>

      <AudioToggleButton
        expand={expand}
        onClick={() => {
          setProgressPosition(0);
          setExpand(expand === null ? "stretchX" : null);
        }}
      />
    </motion.div>
  );
};

export default AudioWidget;
