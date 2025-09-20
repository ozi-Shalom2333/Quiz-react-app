import React from 'react';
import { useQuiz } from '../context/QuizContext';

export default function ProgressBar() {
  const { current, questions, score } = useQuiz();
  const percent = Math.round(((current + 1) / questions.length) * 100);

  return (
    <div className="w-full mx-auto bg-gray-200 rounded-lg h-3 mb-4">
      <div
        className="h-3 rounded-lg transition-all"
        style={{
          width: `${percent}%`,
          background: `linear-gradient(90deg, #10b981 70%, #3b82f6 100%)`
        }}
      />
      <div className="flex justify-between text-sm mt-1 text-gray-500 px-1 select-none">
        <span>Q. {current + 1} / {questions.length}</span>
        <span>Score: {score}</span>
      </div>
    </div>
  );
}
