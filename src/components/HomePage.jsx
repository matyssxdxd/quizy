import React from "react";

function HomePage({ questionCount }) {
  return (
    <div className="home-page">
      <h2>Welcome to Quiz Practice App</h2>
      <p>
        This app helps you practice answering questions and tests your
        knowledge.
      </p>
      <p>You currently have {questionCount} questions in your quiz bank.</p>
      <div className="instructions">
        <h3>How to use this app:</h3>
        <ol>
          <li>Go to "Add Questions" to create your question bank</li>
          <li>Go to "Take Quiz" to practice answering the questions</li>
          <li>
            Type your answers and get feedback on how close they are to the
            correct answer
          </li>
          <li>Export your questions to save them as a file</li>
          <li>Import questions from a previously saved file</li>
        </ol>
      </div>
    </div>
  );
}

export default HomePage;
