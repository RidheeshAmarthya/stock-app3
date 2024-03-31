import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Portfolio from "./pages/Portfolio";
import Watchlist from "./pages/Watchlist";

function App() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [balance, setBalance] = useState([{}]);

  useEffect(() => {
    // Fetch balance data only once when the component mounts
    const fetchBalanceData = async () => {
      try {
        const response = await fetch("/balance");
        if (response.headers.get("content-type").includes("application/json")) {
          const data = await response.json();
          setBalance(data);
          console.log("Success:", balance);
        } else {
          throw new Error("Not JSON response");
        }
      } catch (error) {
        console.error("Error fetching balance data:", error);
      }
    };

    fetchBalanceData();
  }, []); // Empty dependency array ensures this effect runs only once

  const handleStockSearch = (symbol) => {
    console.log("User searched for stock symbol:", symbol);
    setStockSymbol(symbol);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/search"
            element={
              <Search onSearch={handleStockSearch} stockSymbol={stockSymbol} />
            }
          />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route
            path="/watchlist"
            element={<Watchlist key={window.location.pathname} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
