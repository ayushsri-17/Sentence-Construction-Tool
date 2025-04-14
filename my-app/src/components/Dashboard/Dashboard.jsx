import React from 'react';
import './Dashboard.css';

const Dashboard = ({ onStartQuiz, isQuizStarted, children, timer }) => {
  if (!isQuizStarted) {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 style={{textAlign:"center", margin:"1rem"}}>Sentence Construction</h1>
          <p style={{textAlign:"center", margin:"1rem"}} className="instructions">
            Test your language skills by completing sentences with the correct words.
          </p>
        </header>
        
        <div className="start-quiz-section">
          <h2>Quiz Rules:</h2>
          <ul  className="rules-list">
            <li>Select words to fill in the blanks</li>
            <li>30 seconds per question</li>
            <li>Complete all blanks to proceed</li>
            <li>Review your answers at the end</li>
          </ul>
          <button className="start-button" onClick={onStartQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 style={{textAlign:"center", margin:"1rem"}}>Sentence Construction</h1>
        <p style={{textAlign:"center", margin:"1rem"}} className="instructions">
          Select the correct words to complete the sentence by arranging
          the provided options in the right order.
        </p>
        <div className="timer-container">
          <span className="timer-label">Time Remaining:</span>
          <span className="timer-value">{timer}s</span>
        </div>
      </header>
      
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
};

export default Dashboard;