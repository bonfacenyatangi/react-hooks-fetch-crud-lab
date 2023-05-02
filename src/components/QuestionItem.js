import React, { useState } from "react";

function QuestionItem({ question, setQuestions, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedAnswer, setSelectedAnswer] = useState(correctIndex)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));


  function handleDeleteClick() {
    fetch(` http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q.id !== question.id)
        );
      });
  }


  function handleCorrectAnswerChange(e) {
    const newCorrectAnswer = parseInt(e.target.value);
    setSelectedAnswer(newCorrectAnswer);

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correctIndex: newCorrectAnswer })
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id !== question.id
              ? q
              : { ...q, correctIndex: newCorrectAnswer }
          )
        );
      });
  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedAnswer} onChange={handleCorrectAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
