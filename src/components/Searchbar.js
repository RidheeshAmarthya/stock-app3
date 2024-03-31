import React, { useState, useEffect } from "react";
import "./Searchbar.css";

const Searchbar = ({ onSearch }) => {
  const [symbol, setSymbol] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (symbol.trim() !== "") {
        // Trim whitespace
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://finnhub.io/api/v1/search?q=${symbol.trim()}&token=co2aripr01qvggedvg6gco2aripr01qvggedvg70`
          );
          const data = await response.json();
          // Take only the first 5 items from the result array
          const limitedSuggestions = data.result.slice(0, 5);
          setSuggestions(limitedSuggestions);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [symbol]);

  const handleSearch = () => {
    onSearch(symbol);
  };

  const handleClear = () => {
    setSymbol(""); // Clear the input field
    setSuggestions([]);
    onSearch(""); // Optionally clear the search results in the parent component
  };

  const handleSuggestionClick = (ticker) => {
    setSymbol(ticker);
    setSuggestions([]);
  };

  return (
    <div>
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Enter stock ticker symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          🔍
        </button>
        <button onClick={handleClear} className="clear-button">
          ❌
        </button>
      </div>

      <div className="suggestions-dropdown">
        {!isLoading && suggestions.length > 0 && (
          <li className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion.symbol)}
                className="suggestion-item"
              >
                <div className="ticker">{suggestion.symbol}</div>
                <div className="description">{suggestion.description}</div>
              </li>
            ))}
          </li>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
