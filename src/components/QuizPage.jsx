import React, { useState } from "react";
import { calculateSimilarity } from "../utils/similarityUtils";

function QuizPage({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [similarity, setSimilarity] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [questionKey, setQuestionKey] = useState(0);

  // Function to get a random question
  const getRandomQuestion = () => {
    if (questions.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setUserAnswer('');
    setFeedback('');
    setSimilarity(null);
    setAnswered(false);
    setQuizStarted(true);
    setQuestionKey(prevKey => prevKey + 1); // Add this line
  };
  

  // Function to check the answer
  const checkAnswer = () => {
    if (!currentQuestion || userAnswer.trim() === "") return;

    // Calculate similarity score
    const correctAnswer = currentQuestion.answer.toLowerCase();
    const userInput = userAnswer.toLowerCase();

    let score = calculateSimilarity(userInput, correctAnswer);
    setSimilarity(score);
    setAnswered(true);

    if (score > 0.8) {
      setFeedback("Correct! Your answer matches the expected answer.");
    } else if (score > 0.5) {
      setFeedback("Close! Your answer is similar to the expected answer.");
    } else {
      setFeedback(
        `Incorrect. The correct answer is: ${currentQuestion.answer}`,
      );
    }
  };

  if (questions.length === 0) {
    return (
      <div className="quiz-page empty-state">
        <h2>Quiz</h2>
        <p>You need to add some questions before you can take the quiz.</p>
        <p>Go to the "Add Questions" page to get started.</p>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <h2>Quiz</h2>

      {!quizStarted ? (
        <div className="quiz-start">
          <p>Ready to test your knowledge? Click the button below to start.</p>
          <button onClick={getRandomQuestion} className="primary-button">
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="question-card" key={questionKey}>
          <h3>{currentQuestion.question}</h3>
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here"
            rows="3"
            disabled={answered}
          />

          {!answered ? (
            <button onClick={checkAnswer} className="primary-button">
              Check Answer
            </button>
          ) : (
            <button onClick={getRandomQuestion} className="primary-button">
              Next Question
            </button>
          )}

          {feedback && (
            <div
              className={`feedback ${similarity > 0.8 ? "correct" : similarity > 0.5 ? "close" : "incorrect"}`}
            >
              <p>{feedback}</p>
              {similarity !== null && (
                <p>Similarity score: {Math.round(similarity * 100)}%</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizPage;
