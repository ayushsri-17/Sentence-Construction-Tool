import React, { useEffect, useState } from 'react';

function Question({ question, onAnswer, answers }) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected([]);
  }, [question]);

  if (!question || !question.question || !Array.isArray(question.options) || !Array.isArray(question.correctAnswer)) {
    return <div>Loading Question...</div>;
  }

  const { question: sentence, options, correctAnswer } = question;
  const parts = sentence.split('_____________');

  const handleSelect = (word) => {
    if (selected.length < correctAnswer.length && !selected.includes(word)) {
      const newSelected = [...selected, word];
      setSelected(newSelected);
      checkAnswers(newSelected);
    }
  };

  const handleUnselect = (index) => {
    const newSelected = [...selected];
    newSelected.splice(index, 1);
    setSelected(newSelected);
    onAnswer(newSelected, [], false);
  };

  const checkAnswers = (sel) => {
    if (sel.length === correctAnswer.length) {
      const isCorrect = sel.map((word, i) => word === correctAnswer[i]);
      onAnswer(sel, isCorrect, true);
    }
  };

  return (
    <div className="question-box">
      <p className="sentence">
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < correctAnswer.length && (
              <span className="blank" onClick={() => handleUnselect(index)}>
                {selected[index] || '____'}
              </span>
            )}
          </span>
        ))}
      </p>

      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={selected.includes(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
