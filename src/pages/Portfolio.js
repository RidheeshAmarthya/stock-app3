import React, { useEffect, useState } from "react";
import axios from "axios";
import BuyStock from "../components/BuyStock"; // Adjust the path as necessary
import SellStock from "../components/SellStock"; // Adjust the path as necessary
import "./Portfolio.css"; // Import the CSS styles

const Portfolio = () => {
  const [wallet, setWallet] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const token = "co2aripr01qvggedvg6gco2aripr01qvggedvg70"; // Replace with your actual API token

  useEffect(() => {
    const getWalletBalance = async () => {
      const response = await axios.get("/Balance");
      setWallet(response.data[0]);
    };

    const getPortfolio = async () => {
      const response = await axios.get("/portfolio");
      const portfolioData = response.data;
      for (const stock of portfolioData) {
        const quoteResponse = await axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${token}`
        );
        const profileResponse = await axios.get(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${stock.ticker}&token=${token}`
        );
        stock.currentPrice = quoteResponse.data.c;
        stock.change = quoteResponse.data.c - stock.totalcost / stock.quantity;
        stock.marketValue = quoteResponse.data.c * stock.quantity;
        stock.name = profileResponse.data.name;
      }
      setPortfolio(portfolioData);
    };

    getWalletBalance();
    getPortfolio();
  }, []);

  return (
    <div className="portfolio-container">
      <h2>My Portfolio</h2>
      <div className="wallet-balance">
        <p>Money in Wallet: ${wallet.toFixed(2)}</p>
      </div>
      {portfolio.map((stock) => (
        <div key={stock._id} className="stock-card">
          <h3>
            <span className="stock-ticker">{stock.ticker}</span> {stock.name}
          </h3>
          <div className="stock-stuff">
            <div>
              <p className="label">Quantity:</p>
              <p>{stock.quantity}</p>
              <p className="label">Avg. Cost / Share:</p>
              <p>{(stock.totalcost / stock.quantity).toFixed(2)}</p>
              <p className="label">Total Cost:</p>
              <p>{stock.totalcost.toFixed(2)}</p>
            </div>
            <div>
              <p className="label">Change:</p>
              <p>{stock.change.toFixed(2)}</p>
              <p className="label">Current Price:</p>
              <p>{stock.currentPrice.toFixed(2)}</p>
              <p className="label">Market Value:</p>
              <p>{stock.marketValue.toFixed(2)}</p>
            </div>
          </div>
          <div className="buy-sell-buttons">
            <div className="buy-buttonP">
              <BuyStock
                className="buy-button"
                wallet={wallet}
                setWallet={setWallet}
                portfolio={portfolio}
                setPortfolio={setPortfolio}
                ticker={stock.ticker}
                currentPrice={stock.currentPrice}
              />
            </div>
            <div>
              <SellStock
                className="sell-button"
                wallet={wallet}
                setWallet={setWallet}
                portfolio={portfolio}
                setPortfolio={setPortfolio}
                ticker={stock.ticker}
                currentPrice={stock.currentPrice}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
