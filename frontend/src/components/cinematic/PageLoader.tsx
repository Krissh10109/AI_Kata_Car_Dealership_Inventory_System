import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Skip loader if already seen this session
  useEffect(() => {
    if (sessionStorage.getItem("driveflow_loaded")) {
      onComplete();
      return;
    }

    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out progress curve
      const t = step / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (step >= steps) {
        clearInterval(timer);
        sessionStorage.setItem("driveflow_loaded", "1");
        setIsExiting(true);
        setTimeout(onComplete, 600);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // If already loaded, render nothing
  if (sessionStorage.getItem("driveflow_loaded") && !isExiting && progress === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a0a0a]"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
        >
          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <h1 className="font-display text-4xl tracking-tight text-[#e8e6e3] md:text-5xl">
              DRIVEFLOW
            </h1>
          </motion.div>

          {/* Progress Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="font-sans text-6xl font-light tabular-nums tracking-tighter text-[#c9a96e] md:text-7xl">
              {String(progress).padStart(3, "0")}
            </span>

            {/* Progress Line */}
            <div className="h-px w-48 overflow-hidden bg-[#1a1a1a]">
              <motion.div
                className="h-full bg-[#c9a96e]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#4a4a4a]">
              Loading Experience
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
