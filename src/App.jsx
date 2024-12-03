import React, { useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

function App() {
  const [theme, setTheme] = useState("dark");
  const [genre, setGenre] = useState("Adventure");
  const [wordCount, setWordCount] = useState(200);
  const [story, setStory] = useState("");
  const [language, setLanguage] = useState("Indonesia");
  const [error, setError] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const [isStoryGenerated, setIsStoryGenerated] = useState(false); 

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleWordCountChange = (e) => {
    setWordCount(e.target.value);
  };

  async function generateStory() {
    setError(""); 
    setIsLoading(true); 
    setIsStoryGenerated(false);
    try {
      const APIBody = {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a creative storyteller." },
          {
            role: "user",
            content: `Generate a ${genre} story with ${wordCount} words, in ${language} language.`,
          },
        ],
        temperature: 0.7,
        max_tokens: wordCount * 2,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + API_KEY,
        },
        body: JSON.stringify(APIBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from API");
      }

      const data = await response.json();
      setStory(data.choices[0].message.content.trim());
      setIsStoryGenerated(true); 
    } catch (error) {
      setError("Error generating story: " + error.message);
    } finally {
      setIsLoading(false); 
    }
  }

  const copyToClipboard = () => {
    setError(""); 
    if (story) {
      navigator.clipboard
        .writeText(story)
        .then(() => {
          alert("Story copied to clipboard!");
        })
        .catch((err) => {
          setError("Error copying text to clipboard: " + err.message);
        });
    } else {
      setError("No story to copy.");
    }
  };

  return (
    <div className={`App ${theme}`}>
      <div className="upper-bar">
        <h1>Short Story Generator</h1>
        <div>
          <button className="theme-button" onClick={() => setTheme("light")}>
            Light Theme
          </button>
          <button className="theme-button" onClick={() => setTheme("dark")}>
            Dark Theme
          </button>
          <button className="theme-button" onClick={() => setTheme("custom")}>
            Warm Theme
          </button>
        </div>
      </div>

      <div className="section">
        <div className="menu-section">
          <div>
            <label>Select Genre: </label>
            <select onChange={handleGenreChange} value={genre}>
              <option value="Adventure">Adventure</option>
              <option value="Romance">Romance</option>
              <option value="Mystery">Mystery</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
            </select>
          </div>

          <div>
            <label>Select Language: </label>
            <select onChange={handleLanguageChange} value={language}>
              <option value="Indonesia">Indonesia</option>
              <option value="Inggris">Inggris</option>
            </select>
          </div>

          <label className="slider-label">Word Count: {wordCount} </label>
          <div className="slider">
            <input
              type="range"
              min="100"
              max="500"
              value={wordCount}
              onChange={handleWordCountChange}
            />
          </div>

          <div className="generate">
            <button onClick={generateStory} disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate Story"} 
            </button>
          </div>
          <p className="watermark">Website Created by @Lekrey jerel jacob laipiopa</p>

        </div>

        <div className="result-section">
          <h2>Generated Story: </h2>
          {error && <p className="error-message">{error}</p>} 
          {isLoading && <div className="loading-spinner"></div>} 
          {!isStoryGenerated && !isLoading && (
            <p className="info-message">Please generate a story to view it.</p> 
          )}
          {story && isStoryGenerated && (
            <div className="story-box">
              <div className="story-container">
                <p>{story}</p>
              </div>
              <button className="copy-btn" onClick={copyToClipboard}>
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
