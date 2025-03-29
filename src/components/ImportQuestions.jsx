import React, { useRef } from "react";

function ImportQuestions({ setQuestions }) {
  const fileInputRef = useRef(null);

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedQuestions = JSON.parse(e.target.result);
          setQuestions(importedQuestions);
          alert("Questions imported successfully!");
        } catch (error) {
          alert("Error importing questions. Please check file format.");
          console.error("Import error:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".json"
        onChange={handleImport}
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="secondary-button"
      >
        Import Questions
      </button>
    </>
  );
}

export default ImportQuestions;
