import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonData, setJsonData] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonData);
      const result = await axios.post(
        "https://bajaj-1-fbau.onrender.com/bfhl",
        parsedData
      );
      setResponseData(result.data);
      setError("");
    } catch (e) {
      setError("Invalid JSON format");
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const renderResponse = () => {
    if (!responseData) return null;
    let filteredData = {};
    if (selectedFilter.includes("Numbers"))
      filteredData.numbers = responseData.numbers;
    if (selectedFilter.includes("Alphabets"))
      filteredData.alphabets = responseData.alphabets;
    if (selectedFilter.includes("Highest lowercase alphabet"))
      filteredData.highest_lowercase_alphabet =
        responseData.highest_lowercase_alphabet;
    return <pre>{JSON.stringify(filteredData, null, 2)}</pre>;
  };

  return (
    <div>
      <h1>Roll Number: ABCD123</h1>
      <textarea
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
        placeholder="Enter JSON here"
        rows="10"
        cols="50"
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>
          <input
            type="checkbox"
            value="Numbers"
            onChange={handleFilterChange}
          />{" "}
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            value="Alphabets"
            onChange={handleFilterChange}
          />{" "}
          Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            value="Highest lowercase alphabet"
            onChange={handleFilterChange}
          />{" "}
          Highest lowercase alphabet
        </label>
      </div>
      {renderResponse()}
    </div>
  );
}

export default App;
