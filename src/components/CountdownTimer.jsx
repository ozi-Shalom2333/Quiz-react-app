import React from 'react';
import { Timer } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';


function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

export default function CountdownTimer() {
  const { remaining, status } = useQuiz();
  return (
    <div className="flex items-center gap-1 font-mono text-lg md:text-xl text-emerald-700" aria-label="Remaining Time">
      <Timer className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
      <span>{formatTime(remaining)}</span>
      {status === "finished" && <span className="text-red-600 ml-2">Time's up!</span>}
    </div>
  );
}
