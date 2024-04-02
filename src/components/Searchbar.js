import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./Searchbar.css";
// Import SVG icons
import searchIcon from "../assets/search.svg"; // Adjust the path as necessary
import crossIcon from "../assets/cross.svg"; // Adjust the path as necessary

const Searchbar = ({ onSearch }) => {
  const [symbol, setSymbol] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Clicked outside the dropdown, so clear suggestions
        setSuggestions([]);
      }
    };

    // Add click event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (symbol.trim() !== "") {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://finnhub.io/api/v1/search?q=${symbol.trim()}&token=co326d9r01qp2simicagco326d9r01qp2simicb0`
          );
          const data = await response.json();
          // Filter out suggestions with a dot in their symbol, then limit to 5
          const filteredAndLimitedSuggestions = data.result
            .filter((suggestion) => !suggestion.symbol.includes("."))
            .slice(0, 5);
          setSuggestions(filteredAndLimitedSuggestions);
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
    navigate(`/search/${symbol}`);
  };

  const handleClear = () => {
    setSymbol("");
    setSuggestions([]);
    onSearch("");
    navigate(`/search/`);
    window.location.reload();
  };

  const handleSuggestionClick = (ticker) => {
    setSymbol(ticker);
    setSuggestions([]);
    navigate(`/search/${ticker}`);
  };

  // Added to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Enter stock ticker symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          onKeyPress={handleKeyPress} // Added key press handler for the Enter key
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          <img src={searchIcon} alt="Search" />
        </button>
        <button onClick={handleClear} className="clear-button">
          <img src={crossIcon} alt="Clear" />
        </button>
      </div>

      <div className="suggestions-dropdown" ref={dropdownRef}>
        {isLoading ? (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          suggestions.length > 0 && (
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
          )
        )}
      </div>
    </div>
  );
};

export default Searchbar;
