import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Watchlist.css"; // Import the CSS styles

const getPriceChangeClass = (priceChange) => {
  return priceChange >= 0 ? "price-up" : "price-down";
};

const Watchlist = () => {
  const token = "co2aripr01qvggedvg6gco2aripr01qvggedvg70"; // Use your actual token
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchWatchList();
  }, []);

  const fetchWatchList = async () => {
    try {
      const watchListResponse = await axios.get("/watchList");
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
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const handleDelete = async (ticker) => {
    try {
      await axios.delete(`/DeletewatchList/${ticker}`);
      const updatedStocks = stocks.filter((stock) => stock.ticker !== ticker);
      setStocks(updatedStocks);
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  return (
    <div className="watchlist-container">
      <h2 className="watchlist-header">My Watchlist</h2>
      {stocks.map((stock, index) => (
        <div className="stock-item" key={index}>
          <span className="stock-name">
            {stock.ticker} - {stock.name}
          </span>
          <span>
            <span className={getPriceChangeClass(stock.priceChange)}>
              ${stock.currentPrice.toFixed(2)}
              {stock.priceChange >= 0 ? "▲" : "▼"}
              {Math.abs(stock.priceChange).toFixed(2)}(
              {Math.abs(stock.percentChange).toFixed(2)}%)
            </span>
            <button
              className="delete-button"
              onClick={() => handleDelete(stock.ticker)}
            >
              x
            </button>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
