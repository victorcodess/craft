import { motion } from "framer-motion";
import cloud from "../../assets/memory-widget/cloud.png";

interface MemoryCardsProps {
  numMemories: number;
  memories: string[];
}

const MemoryCards = ({ numMemories, memories }: MemoryCardsProps) => {
  switch (numMemories) {
    case 0:
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0 } }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0 }}
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

export default MemoryCards;