import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const questions = [
  {
    question: "How many bones are there in an adult human body?",
    options: ["216", "186", "196", "206"],
    answer: "206",
  },
  {
    question: "Who invented Computer?",
    options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
    answer: "Charles Babbage",
  },
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question:
      "KFC, the American fast food restaurant chain, stands for “… Fried Chicken”",
    options: ["Kansas", "Korean", "Kentucky", "Kent"],
    answer: "Kentucky",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
];

function Quiz({ setIsQuizStarted }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);
  const countdownRef = useRef(null);

  useEffect(() => {
    countdownRef.current = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdownRef.current); // Clear interval on unmount
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setShowAnswer(true);
      clearInterval(countdownRef.current); // Stop the timer when time runs out
    }
  }, [timer]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);
    clearInterval(countdownRef.current); // Stop the timer
    if (option === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    clearInterval(countdownRef.current); // Clear the previous interval
    setTimer(10); // Reset the timer
    setSelectedOption(null);
    setShowAnswer(false);
    setCurrentQuestion((prev) => prev + 1);

    // Restart the interval for the new question
    countdownRef.current = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  };

  const handleTryAgain = () => {
    clearInterval(countdownRef.current); // Clear the interval
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setTimer(10);
    setScore(0);
    setIsQuizStarted(false);

    // Restart the interval for the new attempt
    countdownRef.current = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="quiz-container">
        <div class="emoji1">🎉</div>
        <h2>Quiz Completed Successfully!</h2>
        <p>
          Your score is {score} out of {questions.length}
        </p>
        <div className="result-buttons">
          <button className="try-again-btn" onClick={handleTryAgain}>
            Try Again
          </button>
          <Link to="/">
            <button
              className="go-home-btn"
              onClick={() => setIsQuizStarted(false)}
            >
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="header">
        <div className="question-counter">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="timer">Time left: {timer}s</div>
      </div>
      <div className="question">{questions[currentQuestion].question}</div>
      <div className="options">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`option-btn ${
              showAnswer
                ? option === questions[currentQuestion].answer
                  ? "correct"
                  : option === selectedOption
                  ? "incorrect"
                  : ""
                : ""
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={showAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      {showAnswer && (
        <div className="footer">
          <button className="next-btn" onClick={handleNextQuestion}>
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
