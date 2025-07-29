"use client";

import { useState } from "react";
import { useTimer, useStats, usePWA } from "../hooks";
import { Timer, ProgressBar, ConfettiEffect, StatsButton, StatsModal } from "../components";

export default function Home() {
  const [showStatsModal, setShowStatsModal] = useState(false);
  
  const {
    timeLeft,
    isRunning,
    isComplete,
    showConfetti,
    progress,
    formatTime,
    handleClick,
  } = useTimer();

  const { totalWorkTime, formatWorkTime } = useStats(isComplete);
  
  usePWA();

  const workTime = formatWorkTime(totalWorkTime);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Progress Bar Background */}
      <ProgressBar progress={progress} />

      {/* Confetti Effect */}
      <ConfettiEffect showConfetti={showConfetti} />

      {/* Timer Display */}
      <div className="relative text-center">
        <Timer 
          timeLeft={timeLeft} 
          formatTime={formatTime} 
          handleClick={handleClick} 
        />
        
        {/* Stats Button */}
        <StatsButton onClick={() => setShowStatsModal(true)} />
      </div>

      {/* Stats Modal */}
      <StatsModal 
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        workTime={workTime}
      />
    </div>
  );
}
