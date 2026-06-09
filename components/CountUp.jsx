"use client"
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, animate } from "framer-motion";

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  className = "",
  separator = "",
  onStart,
  onEnd,
}) {
  const ref = useRef(null);
  const count = useMotionValue(from);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });

  useEffect(() => {
    if (!ref.current || !isInView) return;

    // Trigger onStart callback
    if (typeof onStart === "function") onStart();

    // Animate the count
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          const currentVal = Math.floor(latest);
          const formattedNumber = separator
            ? currentVal.toLocaleString("en-US").replace(/,/g, separator)
            : currentVal.toLocaleString("en-US");
          ref.current.textContent = formattedNumber;
        }
      },
      onComplete: () => {
        if (typeof onEnd === "function") onEnd();
      },
    });

    return () => controls.stop();
  }, [isInView, from, to, duration, separator, onStart, onEnd, count]);

  return <span className={className} ref={ref}>{from}</span>;
}















