export const ProgressBar = ({ progress }) => {
  return (
    <div
      className="absolute inset-0 transition-all duration-1000 ease-out"
      style={{
        background: `linear-gradient(90deg, 
          rgba(245, 158, 11, 0.9) 0%, 
          rgba(251, 146, 60, 0.9) 50%, 
          rgba(249, 115, 22, 0.9) 100%)`,
        clipPath: `inset(0 ${100 - progress}% 0 0)`,
      }}
      aria-hidden="true"
    />
  );
}; 