import { useState } from "react";
import { motion } from "framer-motion";
import ToolbarDesign from "./toolbar-design";
import ToolbarDev from "./toolbar-dev";
import Switch from "./switch";

function Toolbar() {
  const [isDev, setIsDev] = useState(false);

  return (
    <motion.div
      animate={{ width: isDev ? "232px" : "416px" }}
      transition={{ delay: 0.5, duration: 0.55, type: "spring", bounce: 0 }}
      className="fixed top-0 bottom-0 my-auto left-0 right-0 mx-auto flex h-[48px] w-[416px] flex-col items-start gap-4 overflow-hidden rounded-[12px] bg-[#333333] pl-2 shadow-[0_1px_4px_0_rgba(0,0,0,0.33)]"
    >
      <ToolbarDesign isDev={isDev} />
      <ToolbarDev isDev={isDev} />

      <Switch isDev={isDev} setIsDev={setIsDev} />
    </motion.div>
  );
}

export default Toolbar;
