import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  // Handling submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urlInput: url }),
      });
      const data = await response.json();
      if (response.ok) {
        setResponseMessage(data.message);
        setUrl("");
      } else {
        setResponseMessage("Error sending url.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setResponseMessage("Could not connect to the server");
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input id="urlInput" type="url" value={url} onChange={handleUrl} />
        <button type="submit">Submit</button>
      </form>
      {responseMessage && (
        <div className="result-box">
          <h3>Your shortened Link:</h3>
          <a href={responseMessage} target="_blank" rel="noreferre">
            {responseMessage}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
