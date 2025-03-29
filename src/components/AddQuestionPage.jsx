import React, { useState } from "react";
import ExportQuestions from "./ExportQuestions";
import ImportQuestions from "./ImportQuestions";

function AddQuestionPage({ addQuestion, questions, setQuestions }) {
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim() === "" || newAnswer.trim() === "") {
      setMessage("Please fill in both fields");
      return;
    }

    addQuestion({
      question: newQuestion,
      answer: newAnswer,
    });

    setNewQuestion("");
    setNewAnswer("");
    setMessage("Question added successfully!");

    // Clear success message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="add-question-page">
      <h2>Add New Questions</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <textarea
            id="question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter your question"
            rows="3"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Correct Answer:</label>
          <textarea
            id="answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Enter the correct answer"
            rows="3"
            required
          />
        </div>
        <button type="submit" className="primary-button">
          Add Question
        </button>
      </form>

      {message && <div className="message">{message}</div>}

      <div className="question-list">
        <h3>Your Questions ({questions.length})</h3>
        {questions.length > 0 ? (
          <>
            <ul>
              {questions.map((q) => (
                <li key={q.id}>
                  <strong>{q.question}</strong>
                  <p>Answer: {q.answer}</p>
                </li>
              ))}
            </ul>
            <div className="file-operations">
              <ExportQuestions questions={questions} />
              <ImportQuestions setQuestions={setQuestions} />
            </div>
          </>
        ) : (
          <p>No questions added yet. Start adding questions above!</p>
        )}
      </div>
    </div>
  );
}

export default AddQuestionPage;
