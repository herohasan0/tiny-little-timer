export const StatsButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 bg-black/20 text-white/50 px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-200 z-30 hover:bg-black/30 hover:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/20"
      aria-label="View today's statistics"
    >
      see stats
    </button>
  );
}; 