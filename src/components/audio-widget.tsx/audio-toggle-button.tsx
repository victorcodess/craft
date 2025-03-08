import { motion } from "framer-motion";
import audio from "../../assets/audio-widget/audio.png";

type ExpandState = "stretchX" | "stretchY" | null;

interface AudioButtonProps {
  expand: ExpandState;
  setExpand: (value: ExpandState) => void;
  setProgressPosition: (value: number) => void;
}

export const AudioToggleButton = ({
  expand,
  setExpand,
  setProgressPosition,
}: AudioButtonProps) => {
  return (
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
      <img src={audio} className="w-6" alt="" />
    </motion.div>
  );
};
