import { useState, useEffect } from "react";
import { TIMER_DURATION } from "../utils/constants";
import { formatWorkTime } from "../utils/timeUtils";

export const useStats = (isComplete) => {
  const [completedCycles, setCompletedCycles] = useState(0);
  const [totalWorkTime, setTotalWorkTime] = useState(0); // in seconds

  // Load stats from localStorage on component mount
  useEffect(() => {
    const today = new Date().toDateString();
    const savedStats = localStorage.getItem(`timerStats_${today}`);
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      setCompletedCycles(stats.completedCycles || 0);
      setTotalWorkTime(stats.totalWorkTime || 0);
    }
  }, []);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    const today = new Date().toDateString();
    const stats = {
      completedCycles,
      totalWorkTime,
      date: today,
    };
    localStorage.setItem(`timerStats_${today}`, JSON.stringify(stats));
  }, [completedCycles, totalWorkTime]);

  // Record completed cycle when timer completes
  useEffect(() => {
    if (isComplete) {
      setCompletedCycles((prev) => prev + 1);
      setTotalWorkTime((prev) => prev + TIMER_DURATION);
    }
  }, [isComplete]);



  return {
    completedCycles,
    totalWorkTime,
    formatWorkTime,
  };
}; 