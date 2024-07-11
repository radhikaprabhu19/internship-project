import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const questions = [
  {
    question: "How many bones are there in an adult human body?",
    options: ["216",
    "186",
    "196",
    "206"],
    answer: "206"
  },
  {
    question: "Who invented Computer?",
    options: ["Charles Babbage",
    "Henry Luce", 
    "Henry Babbage",
    "Charles Luce"],
    answer: "Charles Babbage"
  },
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "KFC, the American fast food restaurant chain, stands for “… Fried Chicken”",
    options: ["Kansas",
    "Korean",
    "Kentucky",
    "Kent"],
    answer: "Kentucky"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  }
];

function Quiz({ setIsQuizStarted }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let countdown;
    countdown = setInterval(() => {
      setTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setShowAnswer(true);
    }
  }, [timer]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);
    if (option === questions[currentQuestion].answer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    setTimer(10);
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleTryAgain = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setTimer(10);
    setScore(0);
    setIsQuizStarted(false); // reset the state to show the navigation bar
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed Successfully!</h2>
        <p>Your score is {score} out of {questions.length}</p>
        <div className="result-buttons">
          <button className="try-again-btn" onClick={handleTryAgain}>Try Again</button>
          <Link to="/">
            <button className="go-home-btn" onClick={() => setIsQuizStarted(false)}>Go to Home</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="header">
        <div className="question-counter">Question {currentQuestion + 1} of {questions.length}</div>
        <div className="timer">Time left: {timer}s</div>
      </div>
      <div className="question">{questions[currentQuestion].question}</div>
      <div className="options">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${showAnswer ? (option === questions[currentQuestion].answer ? 'correct' : (option === selectedOption ? 'incorrect' : '')) : ''}`}
            onClick={() => handleOptionClick(option)}
            disabled={showAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      {showAnswer && (
        <div className="footer">
          <button className="next-btn" onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
