import React from 'react';
import { Link } from 'react-router-dom';

function Home({ setIsQuizStarted }) {
  return (
    <div className="home-container">
      <h1>BRAIN BUZZ</h1>
     <h4>Time for Questions!</h4>
      <Link to="/quiz">
        <button className="start-btn" onClick={() => setIsQuizStarted(true)}>
          Start Quiz
        </button>
      </Link>
    </div>
  );
}

export default Home;
