// Context.js
import React, { createContext, useContext, useState } from "react";

const StockDataContext = createContext();

export const StockDataProvider = ({ children }) => {
  const [stockData, setStockData] = useState({});

  const cacheStockData = (ticker, data) => {
    setStockData((prevState) => ({ ...prevState, [ticker]: data }));
  };

  const getStockData = (ticker) => stockData[ticker];

  return (
    <StockDataContext.Provider value={{ cacheStockData, getStockData }}>
      {children}
    </StockDataContext.Provider>
  );
};

export const useStockData = () => useContext(StockDataContext);
