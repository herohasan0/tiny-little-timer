export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return {
    mins: mins.toString().padStart(2, "0"),
    secs: secs.toString().padStart(2, "0"),
  };
};

export const formatWorkTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return { hours, minutes };
}; 