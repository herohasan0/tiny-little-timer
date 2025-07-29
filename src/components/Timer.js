export const Timer = ({ timeLeft, formatTime, handleClick }) => {
  return (
    <div className="relative text-center">
      <div
        className="text-8xl z-10 font-bold text-white drop-shadow-lg tracking-wider cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
        style={{ fontFamily: "var(--font-noto-serif-jp), serif" }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label="Timer control - click to start/pause, double-click to reset"
      >
        <span>{formatTime(timeLeft).mins}</span>
        <span className="text-4xl mx-2">:</span>
        <span className="text-4xl">{formatTime(timeLeft).secs}</span>
      </div>
    </div>
  );
}; 