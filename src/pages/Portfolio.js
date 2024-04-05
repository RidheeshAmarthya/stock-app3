import React, { useEffect, useState } from "react";
import axios from "axios";
import BuyStock from "../components/BuyStock"; // Adjust the path as necessary
import SellStock from "../components/SellStock"; // Adjust the path as necessary
import "./Portfolio.css"; // Import the CSS styles

const Portfolio = () => {
  const [wallet, setWallet] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const token = "co2aripr01qvggedvg6gco2aripr01qvggedvg70"; // Replace with your actual API token
  const [isTagVisible, setIsTagVisible] = useState(false);
  const [tagMessage, setTagMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchWalletAndPortfolio = async () => {
      setIsLoading(true);
      const walletResponse = await axios.get(
        "https://stock-app3-backend-obu6dw52ya-wm.a.run.app/Balance"
      );
      setWallet(walletResponse.data[0]);

      const portfolioResponse = await axios.get(
        "https://stock-app3-backend-obu6dw52ya-wm.a.run.app/portfolio"
      );
      const portfolioData = portfolioResponse.data;

      // Use Promise.all to fetch stock details concurrently
      const stockDetails = await Promise.all(
        portfolioData.map(async (stock) => {
          const [quoteResponse, profileResponse] = await Promise.all([
            axios.get(
              `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${token}`
            ),
            axios.get(
              `https://finnhub.io/api/v1/stock/profile2?symbol=${stock.ticker}&token=${token}`
            ),
          ]);
          return {
            ...stock,
            currentPrice: quoteResponse.data.c,
            change: quoteResponse.data.c - stock.totalcost / stock.quantity,
            marketValue: quoteResponse.data.c * stock.quantity,
            name: profileResponse.data.name,
          };
        })
      );

      setPortfolio(stockDetails);
      setIsLoading(false); // Only set loading to false after all data is fetched
    };

    fetchWalletAndPortfolio();
  }, []);

  useEffect(() => {
    let timer;
    if (isTagVisible) {
      timer = setTimeout(() => {
        setIsTagVisible(false);
      }, 3000); // Adjust the delay as needed
    }

    // Cleanup function to clear the timer if the component unmounts
    // or if the alert visibility changes before the timer completes.
    return () => clearTimeout(timer);
  }, [isTagVisible]);

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

  // Add this condition before the return statement
  if (portfolio.length === 0) {
    return (
      <div className="portfolio-container">
        <br></br>
        {isTagVisible && (
          <div className={`alert-message ${tagMessage.type}`}>
            {tagMessage.text}
            <button
              className="close-button"
              onClick={() => setIsTagVisible(false)}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        )}
        <br></br>
        <h2>My Portfolio</h2>
        <div className="wallet-balance">
          <p>Money in Wallet: ${wallet.toFixed(2)}</p>
        </div>
        <br></br>
        <div className="empty-portfolio-message">
          <p>Currently you don't have any stock.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      <h2>My Portfolio</h2>
      {isTagVisible && (
        <div className={`alert-message ${tagMessage.type}`}>
          {tagMessage.text}
          <button
            className="close-button"
            onClick={() => setIsTagVisible(false)}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}
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
              <p
                className={`${
                  stock.change < 0
                    ? "negative-change"
                    : stock.change > 0
                    ? "positive-change"
                    : ""
                }`}
              >
                {stock.change < 0 ? "▼" : stock.change > 0 ? "▲" : ""}
                {stock.change.toFixed(2)}
              </p>
              <p className="label">Current Price:</p>
              <p
                className={`${
                  stock.change < 0
                    ? "negative-change"
                    : stock.change > 0
                    ? "positive-change"
                    : ""
                }`}
              >
                {stock.currentPrice.toFixed(2)}
              </p>

              <p className="label">Market Value:</p>
              <p
                className={`${
                  stock.change < 0
                    ? "negative-change"
                    : stock.change > 0
                    ? "positive-change"
                    : ""
                }`}
              >
                {stock.marketValue.toFixed(2)}
              </p>
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
                setTagMessage={setTagMessage}
                setIsTagVisible={setIsTagVisible}
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
                setTagMessage={setTagMessage}
                setIsTagVisible={setIsTagVisible}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
