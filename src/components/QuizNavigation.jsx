import React from 'react';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import Button from './Button';
import { useQuiz } from '../context/QuizContext';

export default function QuizNavigation() {
  const {
    current, questions, nextQuestion, prevQuestion,
    isFirst, isLast, isAnswered, finishQuiz
  } = useQuiz();

  return (
    <div className="flex flex-wrap gap-2 justify-between items-center mt-6">
      <Button onClick={prevQuestion} disabled={isFirst}>
        <ArrowLeft className="inline w-4 h-4 mr-2" /> Previous
      </Button>
      {isLast ? (
        <Button onClick={finishQuiz} disabled={!isAnswered}>
          Finish <ChevronRight className="inline w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button onClick={nextQuestion} disabled={!isAnswered}>
          Next <ArrowRight className="inline w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
}
