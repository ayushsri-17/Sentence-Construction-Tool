
function Feedback({ questions, answers }) {

  const score = answers.reduce((total, answer, index) => {
    if (answer && answer.areCorrect.every(is => is)) {
      return total + 1;
    }
    return total;
  }, 0);

  return (
    <div className="feedback-container">
      <header className="feedback-header">
        <h1>Sentence Construction Results</h1>
        <div className="score-display">
          <span className="score-number">{score}</span>
          <span className="score-label">out of {questions.length}</span>
        </div>
      </header>

      <div className="feedback-summary">
        <p>Review your responses below for more details.</p>
      </div>

      <div className="feedback-items">
        {questions.map((question, index) => {
          const answer = answers[index];
          const isCorrect = answer ? answer.areCorrect.every(is => is) : false;
          const correctAnswers = question.correctAnswer.join(', ');
          const userAnswers = answer ? answer.selectedWords.join(', ') : 'No answer';

          return (
            <div key={index} className={`feedback-item ${isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="question-section">
                <h3>Question {index + 1}</h3>
                <p className="original-sentence">{question.question}</p>
              </div>

              <div className="answer-section">
                <div className="correct-answer">
                  <h4>Correct Answer:</h4>
                  <p>{correctAnswers}</p>
                </div>
                <div className="user-answer">
                  <h4>Your Answer:</h4>
                  <p>{userAnswers}</p>
                </div>
              </div>

              <div className="status-badge">
                {isCorrect ? '✓ Correct' : '✗ Incorrect'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Feedback;