"use client";

import { useState, useEffect, useRef } from "react";
import Confetti from 'react-confetti';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const intervalRef = useRef(null);
  const clickTimeoutRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { mins: mins.toString().padStart(2, '0'), secs: secs.toString().padStart(2, '0') };
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
            setTimeLeft(prev => prev - 1); // Start immediately at 44:59
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

  // Temporary function to test confetti
  const testConfetti = () => {
    setTimeLeft(2); // Set to 2 seconds
    setIsRunning(true);
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
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  const progress = ((45 * 60 - timeLeft) / (45 * 60)) * 100;

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
          // colors={['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']}
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
      <div className="relative z-10 text-center">
        <div className="text-8xl font-bold text-white drop-shadow-lg tracking-wider" style={{ fontFamily: 'var(--font-noto-serif-jp), serif' }}>
          <span>{formatTime(timeLeft).mins}</span>
          <span className="text-4xl mx-2">:</span>
          <span className="text-4xl">{formatTime(timeLeft).secs}</span>
        </div>
      </div>

      {/* Temporary Test Button */}
      <button
        onClick={testConfetti}
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 z-30"
      >
        Test Confetti (00:02)
      </button>

      {/* Click Area */}
      <button
        onClick={handleClick}
        className="absolute inset-0 w-full h-full bg-transparent focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200 active:bg-opacity-10 touch-manipulation z-20"
        // style={{ touchAction: 'manipulation' }}
        aria-label="Timer control"
      />
    </div>
  );
}
