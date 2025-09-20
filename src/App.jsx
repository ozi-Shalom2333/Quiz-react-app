import React from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import Button from './components/Button';
import ProgressBar from './components/ProgressBar';
import CountdownTimer from './components/CountdownTimer';
import QuestionCard from './components/QuestionCard';
import QuizNavigation from './components/QuizNavigation';
import ResultCard from './components/ResultCard';
import { ChevronRight } from 'lucide-react';
import logo from '../public/logo.svg';


function Main() {
  const { status, startQuiz } = useQuiz();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 pt-4">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center mb-10">
          <img src={logo} alt="Biology Quiz Logo" className="w-14 h-14 drop-shadow" />
          <h1 className="mt-3 mb-2 text-4xl font-extrabold text-emerald-800 tracking-tight">Biology Quiz</h1>
          <p className="text-gray-600 text-lg font-medium text-center">
            Test your biology knowledge! Multiple choice. Race against the clock.
          </p>
        </div>
        {status === "idle" && <StartScreen />}
        {status === "active" && <QuizScreen />}
        {status === "finished" && <ResultScreen />}
      </div>
      <footer className="mt-20 text-xs text-slate-400">Made with React, Vite, Tailwind & Lucide Icons</footer>
    </div>
  );
}

function StartScreen() {
  const { startQuiz } = useQuiz();
  return (
    <div className="flex flex-col items-center gap-8 bg-white p-8 rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-2">Ready to start?</h2>
      <ul className="list-disc ml-5 text-gray-600 text-base">
        <li>5 multiple-choice questions</li>
        <li>1 minute total time</li>
        <li>Score revealed instantly after finishing</li>
      </ul>
      <Button onClick={startQuiz} className="text-lg px-7 py-3 mt-3 flex items-center">
        Start Quiz <ChevronRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
}

function QuizScreen() {
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-3">
        <ProgressBar />
        <CountdownTimer />
      </div>
      <QuestionCard />
      <QuizNavigation />
    </div>
  );
}

function ResultScreen() {
  return <ResultCard />;
}

export default function App() {
  return (
    <QuizProvider>
      <Main />
    </QuizProvider>
  );
}
