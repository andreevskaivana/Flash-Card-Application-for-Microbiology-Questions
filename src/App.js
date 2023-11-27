import React, { useState, useEffect } from "react";
import FlashcardList from "./components/FlashcardList";
import "./styles/app.css";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [numQuestions, setNumQuestions] = useState(5); // Default to 5 questions

  useEffect(() => {
    import("./files/mikro.json")
      .then((data) => data.default)
      .then((jsonData) => {
        const slicedData = jsonData.slice(0, numQuestions);
        setFlashcards(slicedData);
      })
      .catch((error) => console.error("Error loading flashcards:", error));
  }, [numQuestions]);

  const handleNumQuestionsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumQuestions(value);
  };

  return (
    <div className="container">
      <div className="question-form">
        <label htmlFor="numQuestions">Одбери број на прашања:</label>
        <input
          type="number"
          id="numQuestions"
          value={numQuestions}
          onChange={handleNumQuestionsChange}
        />
      </div>
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}

export default App;
