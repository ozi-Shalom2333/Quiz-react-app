import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import questions from "../data/questions";

const QUIZ_DURATION = 60; // e.g., 60 seconds

const QuizContext = createContext();

export const useQuiz = () => {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used inside a QuizProvider");
  return ctx;
};

export const QuizProvider = ({ children }) => {
  const [status, setStatus] = useState("idle"); // idle, active, finished
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [remaining, setRemaining] = useState(QUIZ_DURATION);

  // Timer handler
  useEffect(() => {
    if (status !== "active") return;
    if (remaining <= 0) {
      setStatus("finished");
      return;
    }
    const t = setInterval(() => setRemaining(r => r - 1), 1000);
    return () => clearInterval(t);
  }, [status, remaining]);

  // Start quiz
  const startQuiz = useCallback(() => {
    setStatus("active");
    setCurrent(0);
    setAnswers([]);
    setScore(0);
    setRemaining(QUIZ_DURATION);
  }, []);

  // Answer handler
  const selectAnswer = useCallback((optionIdx) => {
    if (answers.length > current) return; // Prevent answering twice
    const isCorrect = optionIdx === questions[current].answer;
    setAnswers(arr => [...arr, optionIdx]);
    if (isCorrect) setScore(s => s + 1);
  }, [current, answers.length]);

  // Navigation
  const nextQuestion = useCallback(() => {
    setCurrent(c => Math.min(c + 1, questions.length - 1));
  }, []);
  const prevQuestion = useCallback(() => {
    setCurrent(c => Math.max(0, c - 1));
  }, []);

  // Submit/Finish early
  const finishQuiz = useCallback(() => setStatus("finished"), []);

  // Restart
  const restartQuiz = useCallback(() => {
    setStatus("idle");
    setCurrent(0);
    setAnswers([]);
    setScore(0);
    setRemaining(QUIZ_DURATION);
  }, []);

  const contextValue = useMemo(
    () => ({
      questions,
      status, current, answers, score, remaining,
      startQuiz,
      selectAnswer,
      nextQuestion,
      prevQuestion,
      finishQuiz,
      restartQuiz,
      isAnswered: answers.length > current,
      isLast: current === questions.length - 1,
      isFirst: current === 0,
    }),
    [status, current, answers, score, remaining,
      startQuiz, selectAnswer, nextQuestion, prevQuestion, finishQuiz, restartQuiz]
  );

  return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>;
};
