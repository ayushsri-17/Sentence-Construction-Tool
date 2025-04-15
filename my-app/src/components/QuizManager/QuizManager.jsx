import React, { useState, useEffect } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import Question from '../Question/Question';
import Feedback from '../Feedback/Feedback';
import '../Dashboard/Dashboard.css';
import '../Question/Question.css';
import '../Feedback/Feedback.css';


const QuizManager = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(30);
  const [showFeedback, setShowFeedback] = useState(false);
  const [allFilled, setAllFilled] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    fetch('/db.json')
      .then(res => res.json())
      .then(data => {
        const fetchedQuestions = data?.data?.questions;
        if (!fetchedQuestions || !Array.isArray(fetchedQuestions)) {
          console.error("Questions not found in the expected format");
          return;
        }
        setQuestions(fetchedQuestions);
        setAnswers(Array(fetchedQuestions.length).fill(null));
      })
      .catch(error => console.error("Error fetching questions:", error));
  }, []);
  

  useEffect(() => {
    if (showFeedback || !quizStarted) return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showFeedback, quizStarted]);

  const handleAnswer = (selectedWords, areCorrect, isAllFilled) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = { selectedWords, areCorrect };
    setAnswers(newAnswers);
    setAllFilled(isAllFilled);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimer(30);
      setAllFilled(false);
    } else {
      setShowFeedback(true);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  if (questions.length === 0) return <div className="loading">Loading...</div>;

  if (showFeedback) return <Feedback questions={questions} answers={answers} />;

  return (
    <Dashboard 
      onStartQuiz={handleStartQuiz}
      isQuizStarted={quizStarted}
      timer={timer}
    >
      {quizStarted && (
        <>
          <Question
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
            answers={answers[currentIndex] || null}
          />
          <button 
            className="next-button" 
            onClick={handleNext} 
            disabled={!allFilled}
          >
            {currentIndex === questions.length - 1 ? 'Submit' : '-->'}
          </button>
        </>
      )}
    </Dashboard>
  );
};

export default QuizManager;