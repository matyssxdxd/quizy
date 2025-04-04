import React from "react";

function ExportQuestions({ questions }) {
  const downloadJSON = () => {
    const jsonData = new Blob([JSON.stringify(questions, null, 2)], {
      type: "application/json",
    });
    const jsonURL = URL.createObjectURL(jsonData);
    const link = document.createElement("a");
    link.href = jsonURL;
    link.download = "quiz-questions.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={downloadJSON} className="secondary-button">
      Export Questions
    </button>
  );
}

export default ExportQuestions;
