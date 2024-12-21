import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Quiz from "./Quiz";
import "./App.css";

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  return (
    <Router>
      <div className="App">
        {!isQuizStarted && (
          <header className="App-header">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </header>
        )}
        <Routes>
          <Route
            path="/"
            element={<Home setIsQuizStarted={setIsQuizStarted} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/quiz"
            element={<Quiz setIsQuizStarted={setIsQuizStarted} />}
          />
        </Routes>
        <footer className="App-footer">
          <p>&copy; {new Date().getFullYear()} -All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
