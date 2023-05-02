import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  function handleAddQuestion(newQuestions) {
    setQuestions([...questions, newQuestions]);
    setPage("List");
    console.log(newQuestions)
  }

  function handleUpdatedQuestion(updatedQuestion) {
    console.log(updatedQuestion)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ?
        <QuestionForm
          onAddQuestion={handleAddQuestion}
        /> :
        <QuestionList
          questions={questions} setQuestions={setQuestions}
          onUpdateQuestion={handleUpdatedQuestion}
        />}
    </main>
  );
}

export default App;
