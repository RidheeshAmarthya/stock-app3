// SellStock.js
import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal"; // Assuming Modal.js is in the same directory

const SellStock = ({
  wallet,
  setWallet,
  portfolio,
  setPortfolio,
  ticker,
  currentPrice,
  onUpdatePortfolio, // Optional callback function to update the state in the parent component
}) => {
  const [quantity, setQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSell = async () => {
    if (quantity <= 0) {
      alert("Please enter a valid quantity to sell.");
      return;
    }

    let stockIndex = portfolio.findIndex((stock) => stock.ticker === ticker);
    if (stockIndex === -1 || portfolio[stockIndex].quantity < quantity) {
      alert("Not enough stock quantity to sell.");
      return;
    }

    try {
      // Calculate the total value of the sold stock
      const totalValue = quantity * currentPrice;
      // Calculate the new quantity and total cost for the stock
      const stock = portfolio[stockIndex];
      const newQuantity = stock.quantity - quantity;
      const avgCostPerShare = stock.totalcost / stock.quantity;
      const newTotalCost = stock.totalcost - avgCostPerShare * quantity;

      let updatedPortfolio = [...portfolio];

      if (newQuantity > 0) {
        // Update the stock in the portfolio for partial sell
        let updatedStock = {
          ...stock,
          quantity: newQuantity,
          totalcost: newTotalCost,
        };
        updatedPortfolio[stockIndex] = updatedStock;
        await axios.patch(`/portfolio/${ticker}`, updatedStock);
      } else {
        // If no stock remains, remove it from the portfolio and call delete API
        updatedPortfolio.splice(stockIndex, 1);
        await axios.delete(`/DeleteFromPortfolio/${ticker}`);
      }

      // Update the wallet balance
      const newWalletBalance = wallet + totalValue;
      setWallet(newWalletBalance);
      setPortfolio(updatedPortfolio);

      if (onUpdatePortfolio) {
        onUpdatePortfolio(updatedPortfolio, newWalletBalance);
      }

      // Update the wallet balance on the server
      await axios.patch("/balance/66066e225c4da4de1832cc40", {
        balance: newWalletBalance,
      });

      setIsModalOpen(false); // Close the modal after successful sale
    } catch (error) {
      console.error("Error processing the sale:", error);
      alert("There was an error processing your sale.");
    }
  };

  return (
    <>
      <button className="sell-button" onClick={() => setIsModalOpen(true)}>
        Sell
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <h2>Sell {ticker}</h2>
          <p>Current Price: ${currentPrice.toFixed(2)}</p>
          <p>Money in Wallet: ${wallet.toFixed(2)}</p>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button onClick={handleSell}>Confirm Sale</button>
        </div>
      </Modal>
    </>
  );
};

export default SellStock;
