import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((res) => res.json())
    .then((questions) => setQuestions(questions))
  }, []);
  
  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then(res=> res.json)
    .then(() => {
      const newQuestions = questions.filter((question) => question.id !== id);
      setQuestions(newQuestions);
    })
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex}),
    })
    .then((res) => res.json())
    .then((changedQuestion) => {
      const changedQuestions = questions.map((question) => {
        if (question.id === changedQuestion.id) {
          return changedQuestion;
        } 
        return question;
      });
      setQuestions(changedQuestions);
    });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => {
        return (
          <QuestionItem key={question.id} question={question} onDelete={handleDeleteClick} onAnswerChange={handleAnswerChange}/>
        )
      })}
      </ul>
    </section>
  );
}

export default QuestionList;
