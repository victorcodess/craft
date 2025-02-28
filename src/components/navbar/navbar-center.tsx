import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95, transformOrigin: "top left" },
  visible: (hovering: "platform" | "resources" | null) => ({
    opacity: 1,
    height: hovering === "platform" ? 363 : 221,
    scale: 1,
    transformOrigin: "top left",
    transition: { duration: 0.25, ease: "easeOut" },
  }),
  exit: {
    opacity: 0,
    scale: 0.95,
    transformOrigin: "top left",
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};

const slideVariants = {
  platform: {
    initial: { opacity: 0, x: -150 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -150,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  },
  resources: {
    initial: { opacity: 0, x: 150 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: 150,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  },
};

const DropdownArrow = memo(({ isRotated }: { isRotated: boolean }) => (
  <motion.div
    className="flex h-[18px] w-[18px] items-center justify-center"
    animate={{ rotate: isRotated ? 180 : 0 }}
    transition={{ duration: 0.2 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        d="M5.25 7.125 9 10.875l3.75-3.75"
      ></path>
    </svg>
  </motion.div>
));

const NavDropdownButton = memo(
  ({
    label,
    active,
    onMouseEnter,
    onMouseLeave,
  }: {
    label: string;
    active: boolean;
    onMouseEnter: () => void;
    onMouseLeave: (e: React.MouseEvent) => void;
  }) => (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group inline-flex select-none items-center justify-center gap-x-1.5 rounded-xl bg-transparent py-[8px] pl-[14px] pr-2.5 text-[15px] font-medium leading-5 -tracking-[-0.1px] transition-colors hover:bg-[#f3f4f6]/50"
    >
      <span>{label}</span>
      <DropdownArrow isRotated={active} />
    </button>
  ),
);

const NavButton = memo(({ label }: { label: string }) => (
  <button className="group inline-flex select-none items-center justify-center gap-x-1.5 rounded-xl bg-transparent py-[8px] pl-[14px] pr-[14px] text-[15px] font-medium leading-5 -tracking-[-0.1px] transition duration-200 ease-out hover:bg-[#f3f4f6]/50">
    <span>{label}</span>
  </button>
));

const PlatformDropdown = memo(() => (
  <div className="flex">
    <div className="flex w-[350px] flex-col gap-4 border-r border-gray-200 px-4 pb-10 pt-4">
      <h4 className="mb-2 pl-2 text-[10px] font-medium text-gray-500">
        FEATURES
      </h4>
      <div className="min-h-[55px] w-full rounded-xl bg-[#f3f4f6]" />
      <div className="min-h-[55px] w-full rounded-xl bg-[#f3f4f6]" />
      <div className="min-h-[55px] w-full rounded-xl bg-[#f3f4f6]" />
      <div className="min-h-[55px] w-full rounded-xl bg-[#f3f4f6]" />
    </div>

    <div className="flex w-[260px] flex-col gap-4 px-4 pb-10 pt-4">
      <h4 className="mb-2 pl-2 text-[10px] font-medium text-gray-500">
        WHAT'S NEW
      </h4>
      <div className="min-h-[30px] w-full rounded-xl bg-[#f3f4f6]" />
      <div className="min-h-[150px] w-full rounded-xl bg-[#f3f4f6]" />
    </div>
  </div>
));

const ResourcesDropdown = memo(() => (
  <div className="flex">
    <div className="flex w-[350px] flex-col gap-4 border-r border-gray-200 px-4 pb-10 pt-4">
      <h4 className="mb-2 pl-2 text-[10px] font-medium text-gray-500">DOCS</h4>
      <div className="min-h-[55px] w-full rounded-xl bg-[#f3f4f6]" />
      <div className="min-h-[55px] w-full rounded-xl bg-[#f3f4f6]" />
    </div>

    <div className="flex w-[260px] flex-col gap-4 px-4 pb-10 pt-4">
      <h4 className="mb-2 pl-2 text-[10px] font-medium text-gray-500">
        INSIGHTS
      </h4>
      <div className="min-h-[30px] w-full rounded-xl bg-[#f3f4f6]" />
      <div className="min-h-[30px] w-full rounded-xl bg-[#f3f4f6]" />
    </div>
  </div>
));

const NavbarCenter = () => {
  const [hovering, setHovering] = useState<"platform" | "resources" | null>(
    null,
  );

  const handleDropdownHover = useCallback(
    (type: "platform" | "resources" | null) => {
      setHovering(type);
    },
    [],
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (!relatedTarget?.closest(".dropdown-container")) {
        handleDropdownHover(null);
      }
    },
    [handleDropdownHover],
  );

  return (
    <nav className="absolute left-0 right-0 top-5 mx-auto flex h-min w-[90%] xl:w-[70%] items-center justify-between rounded-2xl border border-gray-200 bg-white shadow-lg px-6 py-4 backdrop-blur-2xl">
      <div className="flex items-center gap-[30px]">
        <div className="h-[40px] w-[112px] rounded-xl bg-[#f3f4f6]"></div>

        <div className="relative flex items-center gap-1.5">
          <NavDropdownButton
            label="Platform"
            active={hovering === "platform"}
            onMouseEnter={() => handleDropdownHover("platform")}
            onMouseLeave={handleMouseLeave}
          />

          <NavDropdownButton
            label="Resources"
            active={hovering === "resources"}
            onMouseEnter={() => handleDropdownHover("resources")}
            onMouseLeave={handleMouseLeave}
          />

          <AnimatePresence mode="popLayout">
            {hovering && (
              <motion.div
                className="dropdown-container absolute z-50 left-0 top-[44px] flex min-w-[610px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl"
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={hovering}
                onMouseEnter={() => handleDropdownHover(hovering)}
                onMouseLeave={() => handleDropdownHover(null)}
              >
                <motion.div className="flex min-w-[610px]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {hovering === "platform" ? (
                      <motion.div
                        className="flex"
                        variants={slideVariants.platform}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key="platform"
                      >
                        <PlatformDropdown />
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex"
                        variants={slideVariants.resources}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key="resources"
                      >
                        <ResourcesDropdown />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <NavButton label="Customers" />
          <NavButton label="Pricing" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-xl border border-[#d1d5db] px-[15px] py-2 text-[15px] font-medium leading-[20px] tracking-[-0.1px] text-[#2e3238] transition-all duration-100 hover:border-[#2e3238]">
          Sign in
        </button>

        <div className="group relative rounded-xl border border-[#d1d5db] bg-gradient-to-b from-[#1c1d1f]/80 to-[#1c1d1f]">
          <button className="rounded-xl bg-[#1c1d1f] px-[15px] py-2 text-[15px] font-medium leading-[20px] tracking-[-0.1px] text-[#f3f4f6] opacity-100 transition-all duration-200 group-hover:opacity-0">
            Start for free
          </button>
          <span className="pointer-events-none absolute bottom-0 left-[15px] right-0 top-2 z-20 mx-auto my-auto text-[15px] font-medium leading-[20px] tracking-[-0.1px] text-[#f3f4f6] opacity-100 transition-all duration-200 group-hover:opacity-100">
            Start for free
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCenter;
