import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) => {
        setQuestions(questions);
        console.log(questions);
      });
  }, []);


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            setQuestions={setQuestions}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
