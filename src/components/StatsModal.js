export const StatsModal = ({ isOpen, onClose, workTime }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-100 rounded-lg p-3 max-w-md w-full shadow-2xl transform transition-all duration-200 scale-100">
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded ml-auto"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="text-center">
          <div className="text-5xl font-bold text-black mb-1">
            {workTime.hours}h {workTime.minutes}m
          </div>
          <div className="text-sm text-gray-500">Today</div>
        </div>
      </div>
    </div>
  );
}; 