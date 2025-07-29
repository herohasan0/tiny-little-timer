import { useState, useEffect, useRef } from "react";
import { TIMER_DURATION, CLICK_TIMEOUT, CONFETTI_DURATION, COUNTDOWN_INTERVAL } from "../utils/constants";
import { formatTime } from "../utils/timeUtils";

export const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const intervalRef = useRef(null);
  const clickTimeoutRef = useRef(null);



  const resetTimer = () => {
    setTimeLeft(TIMER_DURATION);
    setIsRunning(false);
    setIsComplete(false);
    setShowConfetti(false);
  };

  const handleClick = () => {
    if (clickTimeoutRef.current) {
      // Double click detected - reset
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      resetTimer();
    } else {
      // Single click - toggle timer
      clickTimeoutRef.current = setTimeout(() => {
        if (isComplete) {
          resetTimer();
        } else {
          // Start immediately if not running
          if (!isRunning) {
            setIsRunning(true);
            setTimeLeft((prev) => prev - 1); // Start immediately at 44:59
          } else {
            setIsRunning(false);
          }
        }
        clickTimeoutRef.current = null;
      }, CLICK_TIMEOUT);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            setShowConfetti(true);
            return 0;
          }
          return prev - 1;
        });
      }, COUNTDOWN_INTERVAL);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  // Confetti cleanup effect
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), CONFETTI_DURATION);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const progress = ((TIMER_DURATION - timeLeft) / TIMER_DURATION) * 100;

  return {
    timeLeft,
    isRunning,
    isComplete,
    showConfetti,
    progress,
    formatTime,
    handleClick,
    resetTimer,
  };
}; 