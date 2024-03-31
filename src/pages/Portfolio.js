import React, { useEffect, useState } from "react";
import axios from "axios";
import BuyStock from "../components/BuyStock"; // Adjust the path as necessary
import SellStock from "../components/SellStock"; // Adjust the path as necessary

const Portfolio = () => {
  const [wallet, setWallet] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const token = "co2aripr01qvggedvg6gco2aripr01qvggedvg70"; // Replace with your actual API token

  useEffect(() => {
    const getWalletBalance = async () => {
      const response = await axios.get("/balance");
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
  // Inside your Portfolio component's return statement

  return (
    <div>
      <h2>My Portfolio</h2>
      <p>Money in Wallet: ${wallet.toFixed(2)}</p>
      {portfolio.map((stock) => (
        <div key={stock._id}>
          <h3>
            {stock.ticker} {stock.name}
          </h3>
          <p>Quantity: {stock.quantity}</p>
          <p>
            Avg. Cost / Share: ${(stock.totalcost / stock.quantity).toFixed(2)}
          </p>
          <p>Total Cost: ${stock.totalcost.toFixed(2)}</p>
          <p>Change: ${stock.change.toFixed(2)}</p>
          <p>Current Price: ${stock.currentPrice.toFixed(2)}</p>
          <p>Market Value: ${stock.marketValue.toFixed(2)}</p>
          {/* Add the BuyStock component here, passing the necessary props */}
          <BuyStock
            wallet={wallet}
            setWallet={setWallet}
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            ticker={stock.ticker}
            currentPrice={stock.currentPrice}
          />
          <SellStock
            wallet={wallet}
            setWallet={setWallet}
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            ticker={stock.ticker}
            currentPrice={stock.currentPrice}
          />
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
