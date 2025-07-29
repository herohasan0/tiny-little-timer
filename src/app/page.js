"use client";

import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [totalWorkTime, setTotalWorkTime] = useState(0); // in seconds
  const intervalRef = useRef(null);
  const clickTimeoutRef = useRef(null);

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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
      mins: mins.toString().padStart(2, "0"),
      secs: secs.toString().padStart(2, "0"),
    };
  };

  const formatWorkTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { hours, minutes };
  };

  const recordCompletedCycle = () => {
    setCompletedCycles((prev) => prev + 1);
    setTotalWorkTime((prev) => prev + 45 * 60); // Add 45 minutes in seconds
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
      }, 300);
    }
  };

  const resetTimer = () => {
    setTimeLeft(45 * 60);
    setIsRunning(false);
    setIsComplete(false);
    setShowConfetti(false);
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            setShowConfetti(true);
            recordCompletedCycle(); // Record the completed cycle
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  // Register service worker for PWA
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }
  }, []);

  const progress = ((45 * 60 - timeLeft) / (45 * 60)) * 100;
  const workTime = formatWorkTime(totalWorkTime);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* React Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={300}
          gravity={0.3}
          wind={0.05}
        />
      )}

      {/* Loading Bar Background */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `linear-gradient(90deg, 
            rgba(245, 158, 11, 0.9) 0%, 
            rgba(251, 146, 60, 0.9) 50%, 
            rgba(249, 115, 22, 0.9) 100%)`,
          clipPath: `inset(0 ${100 - progress}% 0 0)`,
        }}
      />

      {/* Timer Display */}
      <div className="relative text-center">
        <div
          className="text-8xl z-10 font-bold text-white drop-shadow-lg tracking-wider"
          style={{ fontFamily: "var(--font-noto-serif-jp), serif" }}
          onClick={handleClick}
        >
          <span>{formatTime(timeLeft).mins}</span>
          <span className="text-4xl mx-2">:</span>
          <span className="text-4xl">{formatTime(timeLeft).secs}</span>
        </div>
        {/* Stats Button */}
        <button
          onClick={() => setShowStatsModal(true)}
          className="mt-4 bg-black/20 text-white/50 px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-200 z-30 hover:bg-black/30"
          aria-label="View today's statistics"
        >
          see stats
        </button>
      </div>

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
          <div className="bg-gray-100 rounded-lg p-4 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowStatsModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl ml-auto"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-black">
                {workTime.hours}h {workTime.minutes}m
              </div>
              <div className="text-sm text-gray-500">Today</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
