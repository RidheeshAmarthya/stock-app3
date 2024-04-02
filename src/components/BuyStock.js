// BuyStock.js
import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal"; // Make sure to create Modal.js based on the code provided below

const BuyStock = ({
  wallet,
  setWallet,
  portfolio,
  setPortfolio,
  ticker,
  currentPrice,
  onUpdatePortfolio, // This callback function will update the state in the parent component
}) => {
  const [quantity, setQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuy = async () => {
    const totalCost = quantity * currentPrice;
    if (wallet < totalCost) {
      alert("Not enough money in wallet!");
      return;
    }

    try {
      let updatedPortfolio;
      const stockIndex = portfolio.findIndex(
        (stock) => stock.ticker === ticker
      );

      if (stockIndex !== -1) {
        // Stock exists, patch it
        const stock = portfolio[stockIndex];
        const updatedStock = {
          quantity: stock.quantity + quantity,
          totalcost: stock.totalcost + totalCost,
        };

        const response = await axios.patch(
          `/portfolio/${ticker}`,
          updatedStock
        );
        updatedPortfolio = [...portfolio];
        updatedPortfolio[stockIndex] = { ...stock, ...response.data };
      } else {
        // Stock does not exist, post it
        const newStock = {
          ticker,
          quantity,
          totalcost: totalCost,
        };

        const response = await axios.post("/Createportfolio", newStock);
        updatedPortfolio = [...portfolio, response.data];
      }

      // Calculate the new wallet balance
      const newWalletBalance = wallet - totalCost;

      // Update wallet in local state
      setWallet(newWalletBalance);
      // Update portfolio in local state
      setPortfolio(updatedPortfolio);

      // Now, update the parent component via the callback function
      if (onUpdatePortfolio) {
        onUpdatePortfolio(updatedPortfolio, newWalletBalance);
      }

      // Now, update the wallet balance on the server
      await axios.patch("/balance/66066e225c4da4de1832cc40", {
        balance: newWalletBalance,
      });

      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error processing the transaction:", error);
      alert("There was an error processing your transaction.");
    }
  };

  return (
    <>
      <button className="buy-button" onClick={() => setIsModalOpen(true)}>
        Buy
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <h2>Buy {ticker}</h2>
          <p>Current Price: ${currentPrice.toFixed(2)}</p>
          <p>Money in Wallet: ${wallet.toFixed(2)}</p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button onClick={handleBuy}>Confirm Purchase</button>
        </div>
      </Modal>
    </>
  );
};

export default BuyStock;
