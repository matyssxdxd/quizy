import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage.jsx";
import AddQuestionPage from "./components/AddQuestionPage.jsx";
import QuizPage from "./components/QuizPage.jsx";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [questions, setQuestions] = useState([]);

  // Load questions from localStorage on initial render
  useEffect(() => {
    const savedQuestions = localStorage.getItem("quizQuestions");
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  // Save questions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("quizQuestions", JSON.stringify(questions));
  }, [questions]);

  // Function to add a new question
  const addQuestion = (newQuestionData) => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        ...newQuestionData,
      },
    ]);
  };

  return (
    <div className="App">
      <header>
        <h1>Quiz Practice App</h1>
        <nav>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("add")}>Add Questions</button>
          <button onClick={() => setPage("quiz")}>Take Quiz</button>
        </nav>
      </header>

      {page === "home" && <HomePage questionCount={questions.length} />}
      {page === "add" && (
        <AddQuestionPage
          addQuestion={addQuestion}
          questions={questions}
          setQuestions={setQuestions}
        />
      )}
      {page === "quiz" && <QuizPage questions={questions} />}
    </div>
  );
}

export default App;
