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
  setTagMessage,
  setIsTagVisible,
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
          `https://stock-app3-backend-obu6dw52ya-wm.a.run.app/portfolio/${ticker}`,
          updatedStock
        );
        updatedPortfolio = [...portfolio];
        updatedPortfolio[stockIndex] = { ...stock, ...response.data };
        setTagMessage({
          text: "Stock purchased successfully!",
          type: "success",
        });
        setIsTagVisible(true);
        setIsModalOpen(false); // Close the modal
      } else {
        // Stock does not exist, post it
        const newStock = {
          ticker,
          quantity,
          totalcost: totalCost,
        };

        const response = await axios.post(
          "https://stock-app3-backend-obu6dw52ya-wm.a.run.app/Createportfolio",
          newStock
        );
        updatedPortfolio = [...portfolio, response.data];
        setTagMessage({
          text: "Stock purchased successfully!",
          type: "success",
        });
        setIsTagVisible(true);
        setIsModalOpen(false); // Close the modal
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
      await axios.patch(
        "https://stock-app3-backend-obu6dw52ya-wm.a.run.app/balance/66066e225c4da4de1832cc40",
        {
          balance: newWalletBalance,
        }
      );

      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error processing the transaction:", error);
      setTagMessage({
        text: "There was an error processing your transaction.",
        type: "error",
      });
      setIsTagVisible(true);
    }
  };

  return (
    <>
      <button className="buy-button" onClick={() => setIsModalOpen(true)}>
        Buy
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <h2>{ticker}</h2>
          <hr></hr>
          <p>Current Price: {currentPrice.toFixed(2)}</p>
          <p>Money in Wallet: {wallet.toFixed(2)}</p>

          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <hr></hr>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              className="buy-buttonM"
              onClick={handleBuy}
              disabled={quantity * currentPrice > wallet}
              style={{
                opacity: quantity * currentPrice > wallet ? 0.5 : 1,
              }}
            >
              Confirm Purchase
            </button>
            <p>Total: {(currentPrice * quantity).toFixed(2)}</p>
          </div>
        </div>
        {quantity * currentPrice > wallet && (
          <p style={{ color: "red" }}>Not enough money in wallet.</p>
        )}
      </Modal>
    </>
  );
};

export default BuyStock;
