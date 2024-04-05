import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Watchlist.css"; // Import the CSS styles

const getPriceChangeClass = (priceChange) => {
  return priceChange >= 0 ? "price-up" : "price-down";
};

const Watchlist = () => {
  const token = "co2aripr01qvggedvg6gco2aripr01qvggedvg70"; // Use your actual token
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status

  const handleStockClick = (ticker) => {
    navigate(`/search/${ticker}`);
  };

  useEffect(() => {
    fetchWatchList();
  }, []);

  const fetchWatchList = async () => {
    setIsLoading(true);
    try {
      const watchListResponse = await axios.get(
        "https://stock-app3-backend-obu6dw52ya-wm.a.run.app/watchList"
      );
      const watchListTickers = watchListResponse.data.map(
        (item) => item.watchList
      );

      const stockDataPromises = watchListTickers.map(async (ticker) => {
        const quoteResponse = await axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${token}`
        );
        const profileResponse = await axios.get(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${token}`
        );

        return {
          ticker: ticker,
          name: profileResponse.data.name,
          currentPrice: quoteResponse.data.c,
          priceChange: quoteResponse.data.d,
          percentChange: quoteResponse.data.dp,
        };
      });

      const stockData = await Promise.all(stockDataPromises);
      setStocks(stockData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (ticker, event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    try {
      await axios.delete(
        `https://stock-app3-backend-obu6dw52ya-wm.a.run.app/DeletewatchList/${ticker}`
      );
      const updatedStocks = stocks.filter((stock) => stock.ticker !== ticker);
      setStocks(updatedStocks);
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
        }}
      >
        <div className="loading-container">
          {/* Your loading animation here */}
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-container">
      <h2 className="watchlist-header">My Watchlist</h2>
      {stocks.length === 0 ? (
        <div className="empty-watchlist-message">
          Currently you don't have any stock in your watchlist.
        </div>
      ) : (
        stocks.map((stock, index) => (
          <div
            className="stock-item"
            key={index}
            onClick={() => handleStockClick(stock.ticker)}
            style={{ cursor: "pointer" }} // Optional: to indicate it's clickable
          >
            {" "}
            <span className="stock-name">
              <button
                className="delete-button"
                onClick={(e) => handleDelete(stock.ticker, e)} // Pass the event object
              >
                x
              </button>
              {""}
              <br></br>
              <br></br>
              <div className="stock-ticker">{stock.ticker}</div> {stock.name}
            </span>
            <span className="Right-Prices">
              <span className={getPriceChangeClass(stock.priceChange)}>
                <br></br>
                <div className="stock-prices">
                  {stock.currentPrice.toFixed(2)}
                </div>
                {stock.priceChange >= 0 ? "▲" : "▼"}
                {stock.priceChange < 0 ? "-" : ""}
                {Math.abs(stock.priceChange).toFixed(2)}(
                {stock.priceChange < 0 ? "-" : ""}
                {Math.abs(stock.percentChange).toFixed(2)}%)
              </span>
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default Watchlist;
