import Confetti from "react-confetti";

export const ConfettiEffect = ({ showConfetti }) => {
  if (!showConfetti) return null;

  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={300}
      gravity={0.3}
      wind={0.05}
      recycle={false}
    />
  );
}; 