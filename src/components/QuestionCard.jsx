import React from 'react';
import OptionButton from './OptionButton';
import { useQuiz } from '../context/QuizContext';

export default function QuestionCard() {
  const { questions, current, selectAnswer, answers, status } = useQuiz();
  const hasAnswered = answers.length > current;
  const options = questions[current].options;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto flex flex-col items-stretch transition-all">
      <h2 className="text-2xl font-bold mb-4 min-h-[3rem]">{questions[current].question}</h2>
      <div>
        {options.map((opt, i) => (
          <div
            key={i}
            onClick={() => !hasAnswered ? selectAnswer(i) : undefined}
            className="cursor-pointer"
          >
            <OptionButton
              idx={i}
              text={opt}
              disabled={status !== "active"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
