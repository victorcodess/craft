import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import cardImg from "../../assets/copy-paste/card-img.avif";

// Animation constants
const DRAG_SCALE = 0.15; // Scale factor when dragging (20% of original size)
const ANIMATION_DURATION = 500; // Duration in milliseconds for all animations
const LERP_FACTOR = 0.15; // Linear interpolation factor for trailing effect (0-1, lower = more trailing)
const SNAP_THRESHOLD = 0.1; // Distance threshold in pixels to snap to target (prevents jitter)

// State machine types
type Status =
  | "idle" // Initial state, image in copy container
  | "dragging" // User is dragging the image
  | "animating-to-paste" // Image is animating to paste container
  | "animating-to-copy" // Image is animating back to copy container
  | "pasted"; // Image is in paste container

type DragPhase = "idle" | "initial" | "following"; // Phases during drag: initial (scaling), following (trailing)
type ImageLocation = "copy" | "floating" | "paste"; // Where the image currently exists
type ContainerType = "copy" | "paste"; // Container identifier

const CopyPaste = () => {
  // Refs for DOM elements
  const rootRef = useRef<HTMLDivElement>(null); // Root container for coordinate calculations
  const copyContainerRef = useRef<HTMLDivElement>(null); // Copy container element
  const pasteContainerRef = useRef<HTMLDivElement>(null); // Paste container element
  const dropAnimationTimeoutRef = useRef<number | null>(null); // Timeout ID for drop animation completion
  const animationFrameRef = useRef<number | null>(null); // Animation frame ID for interpolation loop
  const lastClientPositionRef = useRef({ x: 0, y: 0 }); // Tracks the latest cursor position for keyboard shortcuts
  const dragOriginRef = useRef<ContainerType | null>(null); // Tracks which container the current drag originated from

  // State management
  const [status, setStatus] = useState<Status>("idle"); // Current state in the state machine
  const [floatingScale, setFloatingScale] = useState(1); // Scale of the floating image (1 = full, 0.2 = dragged)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // Target position (where cursor is)
  const [displayedPosition, setDisplayedPosition] = useState({ x: 0, y: 0 }); // Actual rendered position (with trailing effect)
  const [imageLocation, setImageLocation] = useState<ImageLocation>("copy"); // Where the image currently exists
  const [dragPhase, setDragPhase] = useState<DragPhase>("idle"); // Current phase during drag operation

  // Derived state: floating image is visible when location is "floating"
  const isFloatingVisible = imageLocation === "floating";

  /**
   * Converts global client coordinates to coordinates relative to the root container.
   * This ensures all position calculations are relative to the component's coordinate system.
   */
  const getRelativePoint = (clientX: number, clientY: number) => {
    const rootRect = rootRef.current?.getBoundingClientRect();
    if (!rootRect) return { x: clientX, y: clientY };

    return {
      x: clientX - rootRect.left,
      y: clientY - rootRect.top,
    };
  };

  /**
   * Cleanup effect: Cancels any pending timeouts and animation frames on unmount
   * to prevent memory leaks and errors from state updates on unmounted components.
   */
  useEffect(() => {
    return () => {
      if (dropAnimationTimeoutRef.current) {
        window.clearTimeout(dropAnimationTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  /**
   * Mouse tracking effect: Listens for mouse movement during drag operations.
   * Updates cursorPosition (target) which the displayedPosition will follow with trailing effect.
   */
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      lastClientPositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /**
   * Mouse tracking effect: Listens for mouse movement during drag operations.
   * Updates cursorPosition (target) which the displayedPosition will follow with trailing effect.
   */
  useEffect(() => {
    if (status !== "dragging") return;

    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition(getRelativePoint(event.clientX, event.clientY));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [status]);

  /**
   * Interpolation effect: Creates smooth trailing effect for the floating image.
   *
   * During "initial" phase: displayedPosition follows cursorPosition with CSS transitions
   * (smooth scale and position animation from container center to cursor).
   *
   * During "following" phase: Uses requestAnimationFrame loop with linear interpolation (lerp)
   * to smoothly follow the cursor with a trailing effect. The lerp factor determines
   * how quickly the displayed position catches up to the cursor (lower = more trailing).
   */
  useEffect(() => {
    if (status !== "dragging" || dragPhase !== "following") {
      // During initial phase, sync displayed position with cursor (CSS handles transition)
      if (status === "dragging" && dragPhase === "initial") {
        setDisplayedPosition(cursorPosition);
      }
      return;
    }

    // Animation loop: smoothly interpolate displayedPosition toward cursorPosition
    const animate = () => {
      setDisplayedPosition((prev) => {
        const dx = cursorPosition.x - prev.x;
        const dy = cursorPosition.y - prev.y;

        // Snap to target if very close to avoid jitter and infinite loop
        if (Math.abs(dx) < SNAP_THRESHOLD && Math.abs(dy) < SNAP_THRESHOLD) {
          return cursorPosition;
        }

        // Linear interpolation: move a fraction (LERP_FACTOR) of the distance each frame
        return {
          x: prev.x + dx * LERP_FACTOR,
          y: prev.y + dy * LERP_FACTOR,
        };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [status, dragPhase, cursorPosition]);

  /**
   * Clears any pending drop animation timeout to prevent state conflicts
   * when starting a new drag operation.
   */
  const clearDropTimeout = useCallback(() => {
    if (dropAnimationTimeoutRef.current) {
      window.clearTimeout(dropAnimationTimeoutRef.current);
      dropAnimationTimeoutRef.current = null;
    }
  }, []);

  /**
   * Initiates a drag operation from the specified container.
   *
   * Flow:
   * 1. Validates image is in the correct container
   * 2. Sets initial position to container center (for smooth start)
   * 3. Starts scale animation (1.0 -> 0.2) and position animation (center -> cursor)
   * 4. After animation completes, switches to "following" phase for trailing effect
   */
  const startDraggingFrom = useCallback(
    (origin: ContainerType, pointer: { clientX: number; clientY: number }) => {
      // Validate that image is in the correct location before allowing drag
      if (
        (origin === "copy" && imageLocation !== "copy") ||
        (origin === "paste" && imageLocation !== "paste")
      ) {
        return;
      }

      clearDropTimeout();

      dragOriginRef.current = origin;

      const { clientX, clientY } = pointer;
      const pointerPoint = getRelativePoint(clientX, clientY);
      const originRef =
        origin === "copy" ? copyContainerRef : pasteContainerRef;
      const originRect = originRef.current?.getBoundingClientRect();
      // Start from container center for smooth animation, fallback to cursor if container not found
      const originCenter = originRect
        ? getRelativePoint(
            originRect.left + originRect.width / 2,
            originRect.top + originRect.height / 2,
          )
        : pointerPoint;

      // Initialize drag state: image becomes floating, starts at full scale and container center
      setImageLocation("floating");
      setFloatingScale(1);
      setCursorPosition(originCenter);
      setDisplayedPosition(originCenter);
      setStatus("dragging");
      setDragPhase("initial");

      // Use requestAnimationFrame to ensure DOM is ready, then start animations
      requestAnimationFrame(() => {
        // Scale down to DRAG_SCALE and move to cursor position (CSS transition handles animation)
        setFloatingScale(DRAG_SCALE);
        setCursorPosition(pointerPoint);

        // After initial animation completes, switch to trailing mode
        setTimeout(() => {
          setDragPhase("following");
        }, ANIMATION_DURATION);
      });
    },
    [clearDropTimeout, imageLocation],
  );

  /**
   * Drops the floating image into the target container.
   *
   * Flow:
   * 1. Calculates target container center
   * 2. Animates image to center and scales back to 1.0
   * 3. After animation, updates state to place image in target container
   */
  const dropTo = useCallback(
    (target: ContainerType) => {
      const targetRef =
        target === "paste" ? pasteContainerRef : copyContainerRef;
      const targetRect = targetRef.current?.getBoundingClientRect();
      const rootRect = rootRef.current?.getBoundingClientRect();

      if (!targetRect || !rootRect) return;

      // Calculate center of target container in relative coordinates
      const targetCenter = {
        x: targetRect.left - rootRect.left + targetRect.width / 2,
        y: targetRect.top - rootRect.top + targetRect.height / 2,
      };

      // Start drop animation: scale back to 1.0 and move to container center
      setStatus(
        target === "paste" ? "animating-to-paste" : "animating-to-copy",
      );
      setFloatingScale(1);
      setCursorPosition(targetCenter);
      setDisplayedPosition(targetCenter);

      clearDropTimeout();
      // After animation completes, finalize the drop
      dropAnimationTimeoutRef.current = window.setTimeout(() => {
        setStatus(target === "paste" ? "pasted" : "idle");
        setImageLocation(target);
        setDragPhase("idle");
        dragOriginRef.current = null;
        dropAnimationTimeoutRef.current = null;
      }, ANIMATION_DURATION);
    },
    [clearDropTimeout],
  );

  /**
   * Handles clicks on the copy container.
   * - If dragging: drop the image back to copy container
   * - If idle and image is in copy: start dragging from copy
   */
  const handleCopyClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (status === "dragging") {
      dropTo("copy");
    } else if (status === "idle" && imageLocation === "copy") {
      startDraggingFrom("copy", {
        clientX: event.clientX,
        clientY: event.clientY,
      });
    }
  };

  /**
   * Handles clicks on the paste container.
   * - If animating: ignore (prevent interrupting animation)
   * - If dragging: drop the image into paste container
   * - If pasted and image is in paste: start dragging from paste (copy back)
   */
  const handlePasteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (status === "animating-to-paste" || status === "animating-to-copy") {
      return; // Prevent interaction during animation
    }

    if (status === "dragging") {
      dropTo("paste");
    } else if (status === "pasted" && imageLocation === "paste") {
      startDraggingFrom("paste", {
        clientX: event.clientX,
        clientY: event.clientY,
      });
    }
  };

  /**
   * Keyboard shortcuts (Cmd + C / Cmd + V) to mirror copy & paste interactions.
   */
  const handleCopyShortcut = useCallback(() => {
    if (status === "dragging") {
      dropTo("copy");
      return;
    }

    if (status === "idle" && imageLocation === "copy") {
      const { x, y } = lastClientPositionRef.current;
      startDraggingFrom("copy", { clientX: x, clientY: y });
    } else if (status === "pasted" && imageLocation === "paste") {
      const { x, y } = lastClientPositionRef.current;
      startDraggingFrom("paste", { clientX: x, clientY: y });
    }
  }, [dropTo, imageLocation, startDraggingFrom, status]);

  const handlePasteShortcut = useCallback(() => {
    if (status === "animating-to-paste" || status === "animating-to-copy") {
      return;
    }

    if (status === "dragging") {
      const origin = dragOriginRef.current;
      const target: ContainerType = origin === "paste" ? "copy" : "paste";
      dropTo(target);
    }
  }, [dropTo, status]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.metaKey) {
        return;
      }

      const key = event.key.toLowerCase();
      if (key === "c") {
        event.preventDefault();
        handleCopyShortcut();
      } else if (key === "v") {
        event.preventDefault();
        handlePasteShortcut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCopyShortcut, handlePasteShortcut]);

  /**
   * Memoized CSS transition string for the floating image.
   *
   * Different transitions for different states:
   * - Animating to container: Smooth easing for scale, position (drop animation)
   * - Dragging initial: Smooth easing for scale and position (scale down animation)
   * - Dragging following: No transition (position handled by requestAnimationFrame)
   * - Default: Smooth easing for scale
   */
  const floatingImageTransition = useMemo(() => {
    const easing = "cubic-bezier(0.22, 1, 0.36, 1)"; // Smooth ease-out for drop animations
    const dragEasing = "cubic-bezier(0.33, 1, 0.68, 1)"; // Slightly different easing for drag start

    if (status === "animating-to-paste" || status === "animating-to-copy") {
      // Drop animation: animate scale, top, and left to container center
      return `transform ${ANIMATION_DURATION}ms ${easing}, top ${ANIMATION_DURATION}ms ${easing}, left ${ANIMATION_DURATION}ms ${easing}`;
    }

    if (status === "dragging") {
      return dragPhase === "initial"
        ? // Initial phase: smooth transition for scale and position (CSS handles animation)
          `transform ${ANIMATION_DURATION}ms ${dragEasing}, top ${ANIMATION_DURATION}ms ${dragEasing}, left ${ANIMATION_DURATION}ms ${dragEasing}`
        : // Following phase: no transition (position updated via requestAnimationFrame)
          "transform 0ms linear";
    }

    return `transform ${ANIMATION_DURATION}ms ${easing}`;
  }, [status, dragPhase]);

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-[500px] items-center justify-center gap-10"
    >
      {/* Copy container: always shows placeholder image, movable image on top when present */}
      <div
        id="copy-container"
        className="relative h-[400px] w-[300px] overflow-hidden border"
        ref={copyContainerRef}
        onClick={handleCopyClick}
      >
        {/* Placeholder image: always visible, not draggable */}
        <img
          src={cardImg}
          alt="card placeholder"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Movable image: only visible when imageLocation is "copy", draggable */}
        {imageLocation === "copy" && (
          <img
            id="copy-img"
            src={cardImg}
            alt="card"
            className="absolute inset-0 h-full w-full cursor-copy object-cover"
          />
        )}
      </div>

      {/* Paste container: displays image when imageLocation is "paste" */}
      <div
        id="paste-container"
        className="cursor-paste relative h-[400px] w-[300px] overflow-hidden border border-black/10 bg-black/5 transition-all duration-500 hover:bg-black/10 active:scale-95"
        ref={pasteContainerRef}
        onClick={handlePasteClick}
      >
        {imageLocation === "paste" && (
          <img
            src={cardImg}
            alt="card"
            className="absolute inset-0 h-full w-full cursor-copy object-cover"
          />
        )}
      </div>

      {/* Floating image: visible during drag operations (imageLocation === "floating") */}
      {isFloatingVisible && (
        <img
          src={cardImg}
          alt="card"
          id="paste-img"
          className={`pointer-events-none absolute h-[400px] w-[300px] object-cover ${
            status !== "dragging"
              ? ""
              : "border-[10px] border-white shadow-2xl transition-all duration-300"
          }`}
          style={{
            top: displayedPosition.y, // Position with trailing effect
            left: displayedPosition.x,
            transform: `translate(-50%, -50%) scale(${floatingScale})`, // Center the image and apply scale
            transition: floatingImageTransition, // CSS transitions for smooth animations
            zIndex: 50, // Ensure floating image appears above containers
          }}
        />
      )}
    </div>
  );
};

export default CopyPaste;
