import React from 'react';
import { Trophy, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import Button from './Button';
import { useQuiz } from '../context/QuizContext';

export default function ResultCard() {
  const { score, questions, answers, restartQuiz } = useQuiz();
  const total = questions.length;
  const percent = Math.round((score / total) * 100);
  let msg = "Well done!";
  if (percent === 100) msg = "Perfect Score! You're a Biology Master!";
  else if (percent >= 80) msg = "Excellent!";
  else if (percent >= 60) msg = "Good effort!";
  else msg = "Keep Practicing!";

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-2xl shadow-xl flex flex-col gap-5 items-center">
      <Trophy className="w-12 h-12 text-yellow-400 mb-2 drop-shadow" />
      <h2 className="text-3xl font-bold text-emerald-700">{msg}</h2>
      <div className="text-lg text-gray-700">
        Score: <span className="font-bold text-emerald-600">{score}</span> / {total}
        &nbsp;|&nbsp;
        Percent: <span className="font-bold">{percent}%</span>
      </div>
      <div className="w-full mt-4">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead>
            <tr>
              <th className="py-1 px-2">#</th>
              <th className="py-1 px-2">Question</th>
              <th className="py-1 px-2">Your Answer</th>
            </tr>
          </thead>
          <tbody>
          {questions.map((q, idx) => {
            const picked = answers[idx];
            const isCorrect = picked === q.answer;
            return (
              <tr key={idx} className="border-t">
                <td className="py-1 px-2">{idx + 1}</td>
                <td className="py-1 px-2">{q.question}</td>
                <td className="py-1 px-2 flex items-center gap-1">
                  {picked !== undefined ?
                    <>
                      {q.options[picked]}
                      {isCorrect
                        ? <CheckCircle className="w-4 h-4 text-emerald-500 ml-1" />
                        : (
                          <>
                            <XCircle className="w-4 h-4 text-red-400 ml-1" />
                            <span className="italic text-gray-400">(correct: {q.options[q.answer]})</span>
                          </>
                        )
                      }
                    </>
                    : <span className="text-gray-400">Unanswered</span>
                  }
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
      <Button onClick={restartQuiz} className="mt-6">
        <RotateCcw className="inline w-5 h-5 mr-2" /> Restart Quiz
      </Button>
    </div>
  );
}
