import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

export default function OptionButton({ idx, text, disabled }) {
  const { current, status, answers, questions } = useQuiz();
  const hasAnswered = answers.length > current;
  const userPicked = answers[current];
  const isPicked = idx === userPicked;
  const isCorrect = idx === questions[current].answer;

  let color = "border-gray-300";
  let icon = null;
  if (hasAnswered) {
    if (isPicked && isCorrect) {
      color = "border-emerald-500 bg-emerald-50";
      icon = <CheckCircle className="w-4 h-4 text-emerald-500" />;
    } else if (isPicked && !isCorrect) {
      color = "border-red-400 bg-red-50";
      icon = <XCircle className="w-4 h-4 text-red-400" />;
    } else if (isCorrect) {
      color = "border-emerald-400 bg-green-50";
    }
  } else if (isPicked) {
    color = "border-sky-400 bg-sky-50";
  }

  return (
    <button
      className={`w-full flex items-center justify-between border ${color} py-2 px-4 my-2 rounded-lg shadow-sm focus:outline-none text-left transition
      ${isPicked ? "ring-2 ring-sky-300" : ""}
      ${disabled ? "opacity-60 cursor-not-allowed" : "hover:bg-sky-100"}
      `}
      disabled={disabled || hasAnswered}
      tabIndex="0"
    >
      <span className="text-base md:text-lg">{text}</span>
      {icon}
    </button>
  );
}
