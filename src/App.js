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
            {/* Set the Search page as the landing page */}
            <Route path="/" element={<Search onSearch={handleStockSearch} />} />

            {/* Include dynamic ticker path for Search */}
            <Route
              path="/search/:ticker"
              element={<Search onSearch={handleStockSearch} />}
            />

            {/* Other paths */}
            <Route path="/portfolio" element={<Portfolio />} />
            <Route
              path="/watchlist"
              element={<Watchlist key={window.location.pathname} />}
            />

            {/* Redirect any unrecognized path to Search */}
            <Route path="*" element={<Search onSearch={handleStockSearch} />} />
          </Routes>

          <Footer />
        </div>
      </StockDataProvider>
    </Router>
  );
}

export default App;
