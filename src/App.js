import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Portfolio from "./pages/Portfolio";
import Watchlist from "./pages/Watchlist";
import { StockDataProvider } from "./pages/Context"; // Import the context provider
import Footer from "./pages/footer"; // Import the Footer component

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
      <StockDataProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/portfolio" element={<Portfolio />} />
            <Route
              path="/watchlist"
              element={<Watchlist key={window.location.pathname} />}
            />
            {/* Update the Search Route to include dynamic ticker */}
            <Route
              path="/search"
              element={<Search onSearch={handleStockSearch} />}
            />
            <Route
              path="/search/:ticker"
              element={<Search onSearch={handleStockSearch} />}
            />
          </Routes>
          <Footer />
        </div>
      </StockDataProvider>
    </Router>
  );
}

export default App;
