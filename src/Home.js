import React from 'react';
import { Link } from 'react-router-dom';

function Home({ setIsQuizStarted }) {
  return (
    <div className="home-container">
      <h2>BRAIN BUZZ</h2>
     <h4>Time for Questions!</h4>
     <div class="emoji">🎯</div>
      <Link to="/quiz">
        <button className="start-btn" onClick={() => setIsQuizStarted(true)}>
          Start Quiz
        </button>
      </Link>
    </div>
  );
}

export default Home;
