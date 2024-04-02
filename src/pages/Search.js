import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import "./Search.css";
import StockChart1 from "../components/StockChart1"; // Adjust the path as necessary
import StockChart2 from "../components/StockChart2"; // Adjust the path as necessary
import StockChart3 from "../components/StockChart3"; // Adjust the path as necessary
import StockChart4 from "../components/StockChart4"; // Adjust the path as necessary
import InsiderSentimentsTable from "../components/InsiderSentimentsTable";
import Modal from "../components/Modal";
import axios from "axios";
import { useStockData } from "./Context"; // Import the context hook
import { Link } from "react-router-dom";
import img from "../assets/alt-img.jpg";
import xLogo from "../assets/X-Logo.png";
import facebookLogo from "../assets/facebook-Logo.png";

const stockChartData = {
  ticker: "AAPL",
  queryCount: 757,
  resultsCount: 16,
  adjusted: true,
  results: [
    {
      v: 25841,
      vw: 169.945,
      o: 170,
      c: 169.99,
      h: 170.12,
      l: 169.7,
      t: 1711526400000,
      n: 869,
    },
    {
      v: 9083,
      vw: 170.142,
      o: 170.07,
      c: 170.15,
      h: 170.2,
      l: 170.07,
      t: 1711530000000,
      n: 275,
    },
    {
      v: 30581,
      vw: 170.4913,
      o: 170.22,
      c: 170.44,
      h: 170.61,
      l: 170.16,
      t: 1711533600000,
      n: 666,
    },
    {
      v: 42993,
      vw: 170.425,
      o: 170.5,
      c: 170.5,
      h: 170.55,
      l: 170.28,
      t: 1711537200000,
      n: 1192,
    },
    {
      v: 180245,
      vw: 170.3117,
      o: 170.238,
      c: 170.7787,
      h: 170.86,
      l: 169.96,
      t: 1711540800000,
      n: 5219,
    },
    {
      v: 9.392838e6,
      vw: 171.6236,
      o: 170.75,
      c: 172.7152,
      h: 172.88,
      l: 170.11,
      t: 1711544400000,
      n: 97645,
    },
    {
      v: 9.455644e6,
      vw: 172.4079,
      o: 172.72,
      c: 172.455,
      h: 173.12,
      l: 171.94,
      t: 1711548000000,
      n: 115616,
    },
    {
      v: 5.225302e6,
      vw: 172.5128,
      o: 172.44,
      c: 172.06,
      h: 172.76,
      l: 172.05,
      t: 1711551600000,
      n: 109390,
    },
    {
      v: 4.148534e6,
      vw: 172.1325,
      o: 172.07,
      c: 172.165,
      h: 172.3499,
      l: 171.86,
      t: 1711555200000,
      n: 122787,
    },
    {
      v: 3.389431e6,
      vw: 172.2572,
      o: 172.17,
      c: 172.288,
      h: 172.49,
      l: 172,
      t: 1711558800000,
      n: 42957,
    },
    {
      v: 4.337171e6,
      vw: 172.5431,
      o: 172.28,
      c: 172.7,
      h: 172.82,
      l: 172.23,
      t: 1711562400000,
      n: 47601,
    },
    {
      v: 1.1946021e7,
      vw: 173.1243,
      o: 172.7,
      c: 173.41,
      h: 173.6,
      l: 172.62,
      t: 1711566000000,
      n: 118075,
    },
    {
      v: 2.678293e6,
      vw: 173.3152,
      o: 173.33,
      c: 173.15,
      h: 173.69,
      l: 173.09,
      t: 1711569600000,
      n: 2946,
    },
    {
      v: 47750,
      vw: 173.1071,
      o: 173.12,
      c: 173.09,
      h: 173.25,
      l: 173.01,
      t: 1711573200000,
      n: 890,
    },
    {
      v: 63761,
      vw: 173.0117,
      o: 173.08,
      c: 172.93,
      h: 173.31,
      l: 172.88,
      t: 1711576800000,
      n: 1053,
    },
    {
      v: 26897,
      vw: 172.9262,
      o: 172.89,
      c: 172.9,
      h: 173,
      l: 172.87,
      t: 1711580400000,
      n: 659,
    },
  ],
  status: "OK",
  request_id: "4413d82dd947c221c9c5a4d06d9e62fd",
  count: 16,
};
const historicalStockData = {
  ticker: "AAPL",
  queryCount: 757,
  resultsCount: 16,
  adjusted: true,
  results: [
    {
      v: 25841,
      vw: 169.945,
      o: 170,
      c: 169.99,
      h: 170.12,
      l: 169.7,
      t: 1711526400000,
      n: 869,
    },
    {
      v: 9083,
      vw: 170.142,
      o: 170.07,
      c: 170.15,
      h: 170.2,
      l: 170.07,
      t: 1711530000000,
      n: 275,
    },
    {
      v: 30581,
      vw: 170.4913,
      o: 170.22,
      c: 170.44,
      h: 170.61,
      l: 170.16,
      t: 1711533600000,
      n: 666,
    },
    {
      v: 42993,
      vw: 170.425,
      o: 170.5,
      c: 170.5,
      h: 170.55,
      l: 170.28,
      t: 1711537200000,
      n: 1192,
    },
    {
      v: 180245,
      vw: 170.3117,
      o: 170.238,
      c: 170.7787,
      h: 170.86,
      l: 169.96,
      t: 1711540800000,
      n: 5219,
    },
    {
      v: 9.392838e6,
      vw: 171.6236,
      o: 170.75,
      c: 172.7152,
      h: 172.88,
      l: 170.11,
      t: 1711544400000,
      n: 97645,
    },
    {
      v: 9.455644e6,
      vw: 172.4079,
      o: 172.72,
      c: 172.455,
      h: 173.12,
      l: 171.94,
      t: 1711548000000,
      n: 115616,
    },
    {
      v: 5.225302e6,
      vw: 172.5128,
      o: 172.44,
      c: 172.06,
      h: 172.76,
      l: 172.05,
      t: 1711551600000,
      n: 109390,
    },
    {
      v: 4.148534e6,
      vw: 172.1325,
      o: 172.07,
      c: 172.165,
      h: 172.3499,
      l: 171.86,
      t: 1711555200000,
      n: 122787,
    },
    {
      v: 3.389431e6,
      vw: 172.2572,
      o: 172.17,
      c: 172.288,
      h: 172.49,
      l: 172,
      t: 1711558800000,
      n: 42957,
    },
    {
      v: 4.337171e6,
      vw: 172.5431,
      o: 172.28,
      c: 172.7,
      h: 172.82,
      l: 172.23,
      t: 1711562400000,
      n: 47601,
    },
    {
      v: 1.1946021e7,
      vw: 173.1243,
      o: 172.7,
      c: 173.41,
      h: 173.6,
      l: 172.62,
      t: 1711566000000,
      n: 118075,
    },
    {
      v: 2.678293e6,
      vw: 173.3152,
      o: 173.33,
      c: 173.15,
      h: 173.69,
      l: 173.09,
      t: 1711569600000,
      n: 2946,
    },
    {
      v: 47750,
      vw: 173.1071,
      o: 173.12,
      c: 173.09,
      h: 173.25,
      l: 173.01,
      t: 1711573200000,
      n: 890,
    },
    {
      v: 63761,
      vw: 173.0117,
      o: 173.08,
      c: 172.93,
      h: 173.31,
      l: 172.88,
      t: 1711576800000,
      n: 1053,
    },
    {
      v: 26897,
      vw: 172.9262,
      o: 172.89,
      c: 172.9,
      h: 173,
      l: 172.87,
      t: 1711580400000,
      n: 659,
    },
  ],
  status: "OK",
  request_id: "4413d82dd947c221c9c5a4d06d9e62fd",
  count: 16,
};

function getOffsetDate({ years = 0, months = 0, days = 0, hours = 0 }) {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() + years);
  currentDate.setMonth(currentDate.getMonth() + months);
  currentDate.setDate(currentDate.getDate() + days);
  currentDate.setHours(currentDate.getHours() + hours);

  const offsetDate = currentDate.toISOString().split("T")[0]; // Formats the date as YYYY-MM-DD
  return offsetDate;
}

const tabs = [
  { id: "summary", title: "Summary" },
  { id: "news", title: "Top News" },
  { id: "charts", title: "Charts" },
  { id: "insights", title: "Insights" },
];

const Tab = ({ id, title, activeTab, setActiveTab }) => (
  <button
    className={`tab ${activeTab === id ? "active" : ""}`}
    onClick={() => setActiveTab(id)}
    style={{
      padding: "10px",
      cursor: "pointer",
      borderBottom: activeTab === id ? "2px solid blue" : "none",
    }}
  >
    {title}
  </button>
);

const API_KEY = "co2aripr01qvggedvg6gco2aripr01qvggedvg70";

const currentDate = getOffsetDate({ days: 0 });
const tenDaysAgo = getOffsetDate({ days: -10 });
console.log(currentDate);
console.log(tenDaysAgo);

const Search = ({ onSearch }) => {
  const [stockCompanyInfo, setStockCompanyInfo] = useState(null);
  const [stockInfo, setStockInfo] = useState(true);
  const [peers, setPeers] = useState([]);
  const [analysisData, setAnalysisData] = useState([]);
  const [earningsData, setEarningsData] = useState([]);
  const [insiderInsights, setInsiderInsights] = useState([]);
  const [news, setNews] = useState([]);
  const { ticker } = useParams();
  const { cacheStockData, getStockData } = useStockData(); // Use the context hook

  //Retry API calls
  const fetchWithRetry = async (url, options, retries = 5, delay = 30000) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        if (response.status === 429 && retries > 0) {
          // If status code is 429, log it and retry after delay
          setIsLoading(true);
          console.log(
            `Request rate limit exceeded, retrying after ${
              delay / 1000
            } seconds... (${retries} retries left)`
          );
        } else if (retries > 0) {
          // For other errors, retry after delay
          console.log(
            `Attempt failed with status ${response.status}, retrying... (${retries} retries left)`
          );
        } else {
          // If no retries left, throw error
          throw new Error(`Fetch failed with status ${response.status}`);
        }

        // Wait for the specified delay before retrying
        await new Promise((resolve) => setTimeout(resolve, delay));
        setIsLoading(false);
        return fetchWithRetry(url, options, retries - 1, delay);
      }
      setIsLoading(false);
      return response.json(); // Assuming the response is JSON
    } catch (error) {
      if (retries > 0) {
        console.log(`Attempt failed, retrying... (${retries} retries left)`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        setIsLoading(false);
        return fetchWithRetry(url, options, retries - 1, delay);
      } else {
        // Rethrow error after last attempt
        throw error;
      }
    }
  };

  useEffect(() => {
    if (ticker) {
      onSearch(ticker);
    }
  }, [ticker, onSearch]);
  const [marketStatus, setMarketStatus] = useState({
    isOpen: false,
    lastOpenDate: null,
  });

  // Helper function to calculate the last open market day
  const getLastOpenMarketDay = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    let lastOpenDay = new Date();

    if (dayOfWeek === 0) {
      // Sunday
      lastOpenDay.setDate(today.getDate() - 2); // Last Friday
    } else if (dayOfWeek === 1) {
      // Monday
      lastOpenDay.setDate(today.getDate() - 3); // Last Friday
    } else {
      // Tuesday to Saturday
      lastOpenDay.setDate(today.getDate() - 1); // Previous day
    }

    return lastOpenDay.toISOString().split("T")[0]; // Return the date in YYYY-MM-DD format
  };

  // Fetch market status from Finnhub
  const fetchMarketStatus = async () => {
    const url = `https://finnhub.io/api/v1/stock/market-status?exchange=US&token=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.isOpen) {
        setMarketStatus({ isOpen: true, lastOpenDate: null });
      } else {
        const lastOpenDate = getLastOpenMarketDay();
        setMarketStatus({ isOpen: false, lastOpenDate: lastOpenDate });
      }
    } catch (error) {
      console.error("Error fetching market status:", error);
    }
  };

  // Fetch market status when the component mounts or ticker changes
  useEffect(() => {
    fetchMarketStatus();
  }, [ticker]);

  // Display logic for market status
  // Display logic for market status with dynamic styling
  const marketOpenCloseDisplay = marketStatus.isOpen ? (
    <p style={{ color: "green" }}>Market is Open</p>
  ) : (
    <p style={{ color: "red" }}>
      Market Closed on {marketStatus.lastOpenDate} 13:00:00
    </p>
  );

  // const API_KEY_POLYGON = "y9CbEJ1gYrXZpwAWpXbAJrAL1ziBkaV2";
  // const API_KEY_POLYGON = "QbUvKSfaomuQ26Fa3twUTwQUQQTQxZ1m";
  // // Additional state for storing the stock chart data
  // const [stockChartData, setStockChartData] = useState(null);

  // // Helper function to fetch stock data for the chart
  // const fetchStockChartData = async (startDate, endDate) => {
  //   const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/hour/${startDate}/${endDate}?adjusted=true&sort=asc&limit=5000&apiKey=${API_KEY_POLYGON}`;

  //   try {
  //     const data = await fetchWithRetry(url, {}, 5, 15000);
  //     setStockChartData(data);
  //   } catch (error) {
  //     console.error("Error fetching stock chart data:", error);
  //   }
  // };
  // useEffect(() => {
  //   if (!ticker || !marketStatus.lastOpenDate) return;

  //   // Determine the appropriate date range based on market status
  //   let startDate, endDate;
  //   if (marketStatus.isOpen) {
  //     // Market is open, use the previous day for both start and end dates
  //     const yesterday = new Date();
  //     yesterday.setDate(yesterday.getDate() - 1);
  //     startDate = endDate = yesterday.toISOString().split("T")[0];
  //   } else {
  //     // Market is closed, use the last open date and the day before it
  //     const lastOpenDay = new Date(marketStatus.lastOpenDate);
  //     const dayBeforeLastOpen = new Date(lastOpenDay);
  //     dayBeforeLastOpen.setDate(lastOpenDay.getDate() - 1);

  //     startDate = dayBeforeLastOpen.toISOString().split("T")[0];
  //     endDate = lastOpenDay.toISOString().split("T")[0];
  //   }

  //   fetchStockChartData(startDate, endDate);
  // }, [ticker, marketStatus]);
  // const [historicalStockData, setHistoricalStockData] = useState(null);
  // const fetchHistoricalStockData = async () => {
  //   const currentDate = new Date();
  //   const twoYearsAgo = new Date(currentDate);
  //   twoYearsAgo.setFullYear(currentDate.getFullYear() - 2);

  //   const startDate = twoYearsAgo.toISOString().split("T")[0];
  //   const endDate = currentDate.toISOString().split("T")[0];

  //   const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}?adjusted=true&sort=asc&limit=5000&apiKey=${API_KEY_POLYGON}`;

  //   try {
  //     const data = await fetchWithRetry(url, {}, 5, 15000);
  //     setHistoricalStockData(data);
  //   } catch (error) {
  //     console.error("Error fetching historical stock data:", error);
  //   }
  // };
  // useEffect(() => {
  //   if (!ticker) return;

  //   fetchHistoricalStockData();
  // }, [ticker]);
  // Comment

  //Buy button

  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [stockToBuy, setStockToBuy] = useState({ ticker: "", quantity: 0 });
  const [buyError, setBuyError] = useState("");
  const handleBuyClick = () => {
    setStockToBuy({ ...stockToBuy, ticker: stockCompanyInfo.ticker });
    setBuyModalOpen(true);
  };
  const handleBuyStock = async () => {
    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${stockToBuy.ticker}&token=${API_KEY}`;
    try {
      const quoteResponse = await axios.get(quoteUrl);
      const purchaseAmount = quoteResponse.data.c * stockToBuy.quantity;
      if (wallet >= purchaseAmount) {
        let updatedPortfolio = [...portfolio];
        const stockIndex = portfolio.findIndex(
          (p) => p.ticker === stockToBuy.ticker
        );
        let updatedWalletBalance = wallet - purchaseAmount;

        if (stockIndex !== -1) {
          // Update portfolio if stock exists
          const updatedStock = {
            ...portfolio[stockIndex],
            quantity: portfolio[stockIndex].quantity + stockToBuy.quantity,
            totalcost: portfolio[stockIndex].totalcost + purchaseAmount,
          };
          await axios.patch(`/portfolio/${stockToBuy.ticker}`, updatedStock);
          updatedPortfolio[stockIndex] = updatedStock;
        } else {
          // Add new stock to portfolio if it doesn't exist
          const newStock = {
            ticker: stockToBuy.ticker,
            quantity: stockToBuy.quantity,
            totalcost: purchaseAmount,
          };
          await axios.post("/Createportfolio", newStock);
          updatedPortfolio.push(newStock);
        }

        // Update local portfolio state
        setPortfolio(updatedPortfolio);

        // Update the wallet balance on the server
        await axios.patch(`/balance/66066e225c4da4de1832cc40`, {
          balance: updatedWalletBalance,
        });

        // Update local wallet state
        setWallet(updatedWalletBalance);

        // Close the buy modal
        setBuyModalOpen(false);
      } else {
        setBuyError("Not enough money in wallet.");
      }
    } catch (error) {
      console.error("Error during stock purchase:", error);
      setBuyError("Error during purchase. Try again.");
    }
  };
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  //Sell button
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [stockToSell, setStockToSell] = useState({ ticker: "", quantity: 0 });
  const [sellError, setSellError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSellClick = () => {
    setStockToSell({ ticker: stockCompanyInfo.ticker, quantity: 0 });
    setSellModalOpen(true);
  };
  const handleSellStock = async () => {
    const stockIndex = portfolio.findIndex(
      (p) => p.ticker === stockToSell.ticker
    );
    if (stockIndex !== -1) {
      const stock = portfolio[stockIndex];
      const sellQuantity = parseInt(stockToSell.quantity);
      if (sellQuantity <= 0 || sellQuantity > stock.quantity) {
        setSellError("Invalid quantity to sell.");
        return;
      }

      const currentPrice = stockInfo.c; // Assuming stockInfo.c is the current price of the stock
      const sellAmount = currentPrice * sellQuantity;
      const updatedQuantity = stock.quantity - sellQuantity;
      const avgCost = stock.totalcost / stock.quantity;
      const updatedTotalCost = stock.totalcost - avgCost * sellQuantity;
      const updatedWalletBalance = wallet + sellAmount;

      try {
        if (updatedQuantity > 0) {
          // Update existing stock in portfolio
          await axios.patch(`/portfolio/${stockToSell.ticker}`, {
            quantity: updatedQuantity,
            totalcost: updatedTotalCost,
          });
        } else {
          // If no stocks left, remove the stock from the portfolio
          await axios.delete(`/DeleteFromportfolio/${stockToSell.ticker}`);
        }

        // Update wallet balance
        await axios.patch(`/balance/66066e225c4da4de1832cc40`, {
          balance: updatedWalletBalance,
        });

        // Update local state
        const updatedPortfolio = [...portfolio];
        if (updatedQuantity > 0) {
          updatedPortfolio[stockIndex] = {
            ...stock,
            quantity: updatedQuantity,
            totalcost: updatedTotalCost,
          };
        } else {
          updatedPortfolio.splice(stockIndex, 1); // Remove stock from portfolio
        }
        setPortfolio(updatedPortfolio);
        setWallet(updatedWalletBalance);
        setSellModalOpen(false); // Close the sell modal
      } catch (error) {
        console.error("Error during stock sale:", error);
        setSellError("Error during sale. Try again.");
      }
    } else {
      setSellError("Stock not found in portfolio.");
    }
  };

  // Fetch watchlist and check if current ticker is in watchlist
  useEffect(() => {
    const fetchWatchlist = async () => {
      const response = await fetch("/watchList");
      const data = await response.json();
      const watchListTickers = data.map((item) => item.watchList);
      setIsInWatchlist(watchListTickers.includes(ticker));
    };

    if (ticker) {
      fetchWatchlist();
    }
  }, [ticker]);

  const [wallet, setWallet] = useState(0);
  const [portfolio, setPortfolio] = useState([]);

  // Fetch wallet balance and portfolio data
  useEffect(() => {
    const getWalletBalance = async () => {
      const response = await axios.get("/balance");
      setWallet(response.data[0]);
    };

    const getPortfolio = async () => {
      const response = await axios.get("/portfolio");
      const portfolioData = response.data;
      setPortfolio(portfolioData);
    };

    getWalletBalance();
    getPortfolio();
  }, []);

  console.log(wallet);
  console.log(portfolio);

  //Watchlist function
  const handleStarClick = async () => {
    if (isInWatchlist) {
      // Remove from watchlist
      await fetch(`/DeletewatchList/${ticker}`, {
        method: "DELETE",
      });
    } else {
      // Add to watchlist
      await fetch("/CreatewatchList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ watchList: ticker }),
      });
    }
    setIsInWatchlist(!isInWatchlist); // Toggle watchlist status
  };

  //API CALLS
  useEffect(() => {
    const fetchData = async () => {
      if (!ticker) return;
      setIsLoading(true); // Start loading

      const cachedData = getStockData(ticker);
      if (cachedData) {
        // If data is cached, use it instead of making a new API call
        setStockCompanyInfo(cachedData.stockCompanyInfo);
        setIsLoading(false); // End loading because we're using cached data

        // Set other state variables with cached data
      } else {
        // Construct other API URLs

        const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${API_KEY}`;
        const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`;
        const peersUrl = `https://finnhub.io/api/v1/stock/peers?symbol=${ticker}&token=${API_KEY}`;
        const analysisUrl = `https://finnhub.io/api/v1/stock/recommendation?symbol=${ticker}&token=${API_KEY}`;
        const earningsUrl = `https://finnhub.io/api/v1/stock/earnings?symbol=${ticker}&token=${API_KEY}`;
        const insiderUrl = `https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${ticker}&from=2022-01-01&token=${API_KEY}`;
        const newsUrl = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${tenDaysAgo}&to=${currentDate}&token=${API_KEY}`;

        try {
          // Fetch both URLs concurrently
          const [
            profileResponse,
            quoteResponse,
            peerResponse,
            analysisResponse,
            earningsResponse,
            insiderResponse,
            newsResponse,
          ] = await Promise.all([
            fetch(profileUrl),
            fetch(quoteUrl),
            fetch(peersUrl),
            fetch(analysisUrl),
            fetch(earningsUrl),
            fetch(insiderUrl),
            fetch(newsUrl),
          ]);

          // Wait for both promises to resolve
          const profileData = await profileResponse.json();
          const quoteData = await quoteResponse.json();
          const peersData = await peerResponse.json();
          const analysisData = await analysisResponse.json();
          const earningsData = await earningsResponse.json();
          const insiderData = await insiderResponse.json();
          const newsData = await newsResponse.json();

          // Log and set the state for both
          console.log("Profile Data:", profileData);
          console.log("Quote Data:", quoteData);
          console.log("Peers Data:", peersData);
          console.log("Analysis Data:", analysisData);
          console.log("Earnings Data:", earningsData);
          console.log("Insider Data:", insiderData);
          console.log("News Data:", newsData);

          setStockCompanyInfo(profileData);
          setStockInfo(quoteData);
          setPeers(peersData);
          setAnalysisData(analysisData);
          setEarningsData(earningsData);
          setInsiderInsights(insiderData);
          setNews(newsData);

          setIsLoading(false); // End loading because we're using cached data
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false); // Ensure loading ends even if there's an error
        }
      }
    };

    fetchData();
  }, [ticker, cacheStockData, getStockData]);

  //TABS
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const openModalWithNews = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  //CURRENT TIME AND TAB
  const [currentTime, setCurrentTime] = useState("");
  const [activeTab, setActiveTab] = useState("summary");

  useEffect(() => {
    const now = new Date();
    const formatted =
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0") +
      " " +
      String(now.getHours()).padStart(2, "0") +
      ":" +
      String(now.getMinutes()).padStart(2, "0") +
      ":" +
      String(now.getSeconds()).padStart(2, "0");
    setCurrentTime(formatted);
    // This effect runs only once on component mount, as there are no dependencies
  }, []);

  //Refresh
  const fetchStockInfo = async () => {
    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`;
    try {
      const response = await axios.get(quoteUrl);
      setStockInfo(response.data);
    } catch (error) {
      console.error("Error fetching stock information:", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchStockInfo();
    const updateRightTabContents = () => {
      fetchStockInfo(); // Refresh stock info

      // Update current time
      const now = new Date();
      const formatted =
        now.getFullYear() +
        "-" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0") +
        " " +
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0") +
        ":" +
        String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(formatted);
    };

    const intervalId = setInterval(updateRightTabContents, 1500000); //Change this to 15k

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [ticker]); // Depend on `ticker` to restart interval when it changes

  function convertUnixTimestampToDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  }

  const [isMessageVisible, setIsMessageVisible] = useState(true);
  const handleCloseMessage = () => {
    setIsMessageVisible(false); // Assuming you have a state called isMessageVisible
  };

  // State for controlling the disabled state of buy and sell buttons
  const [isBuyDisabled, setIsBuyDisabled] = useState(false);
  const [isSellDisabled, setIsSellDisabled] = useState(false);

  // Error message states
  const [buyErrorMessage, setBuyErrorMessage] = useState("");
  const [sellErrorMessage, setSellErrorMessage] = useState("");

  // Fetch wallet balance
  const getWalletBalance = async () => {
    try {
      const response = await axios.get("/balance");
      if (response.data && response.data.length > 0) {
        setWallet(response.data[0].balance); // Assuming the balance is in the first object of the response array
      }
    } catch (error) {
      console.error("Failed to fetch wallet balance:", error);
      // Handle error (e.g., by setting state to show an error message to the user)
    }
  };

  // Fetch portfolio data
  const getPortfolio = async () => {
    try {
      const response = await axios.get("/portfolio");
      if (response.data) {
        setPortfolio(response.data); // Assuming the API returns an array of portfolio items
      }
    } catch (error) {
      console.error("Failed to fetch portfolio:", error);
      // Handle error
    }
  };

  // Fetch wallet balance and portfolio data on component mount
  useEffect(() => {
    // You should have functions getWalletBalance and getPortfolio implemented similar to what was shown
    getWalletBalance();
    getPortfolio();
  }, []);

  // Real-time validation for buying
  useEffect(() => {
    const purchaseCost = stockToBuy.quantity * stockInfo.c;
    if (purchaseCost > wallet) {
      setBuyErrorMessage("Not enough money in wallet!");
      setIsBuyDisabled(true);
    } else {
      setBuyErrorMessage("");
      setIsBuyDisabled(false);
    }
  }, [stockToBuy.quantity, wallet, stockInfo.c]);

  // Real-time validation for selling
  useEffect(() => {
    const portfolioItem = portfolio.find(
      (p) => p.ticker === stockToSell.ticker
    );
    const sellQuantity = stockToSell.quantity;
    if (!portfolioItem || sellQuantity > portfolioItem.quantity) {
      setSellErrorMessage("You cannot sell stocks that you don't have!");
      setIsSellDisabled(true);
    } else {
      setSellErrorMessage("");
      setIsSellDisabled(false);
    }
  }, [stockToSell.quantity, portfolio, stockToSell.ticker]);

  return (
    <div className="stock-search-container">
      <h1>STOCK SEARCH</h1>
      <Searchbar onSearch={onSearch} />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "20vh",
          }}
        >
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : stockInfo && stockInfo.d === null ? (
        isMessageVisible && (
          <div
            style={{
              color: "red", // Red text
              margin: "10px 0",
              padding: "10px",
              backgroundColor: "#ffdada", // Light red background for emphasis
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {ticker === undefined
              ? "Ticker cannot be null. Please enter a ticker symbol."
              : "Please enter a valid ticker"}
            {console.log(
              "Ticker cannot be null. Please enter a ticker:",
              ticker
            )}
            <button
              onClick={handleCloseMessage} // You need to define this function to handle closing the message
              style={{
                marginLeft: "15px",
                backgroundColor: "transparent",
                border: "none",
                color: "black",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        )
      ) : (
        stockCompanyInfo &&
        stockInfo && (
          <div className="main-body">
            {stockCompanyInfo && stockInfo && (
              <div>
                <div className="stock-details">
                  <div className="stock-info-left">
                    <div className="ticker-star">
                      <h2>{stockCompanyInfo.ticker}</h2>
                      <span
                        onClick={handleStarClick}
                        style={{
                          cursor: "pointer",
                          color: isInWatchlist ? "yellow" : "grey",
                          padding: "20px 5px",
                        }}
                      >
                        ★
                      </span>
                    </div>
                    <div className="stock-logo-center"></div>
                    <p className="stock-name">{stockCompanyInfo.name}</p>
                    <p className="stock-exchange">
                      {stockCompanyInfo.exchange}
                    </p>
                    <div className="stock-buttons">
                      <button className="buy-buttonM" onClick={handleBuyClick}>
                        Buy
                      </button>
                      {portfolio.some(
                        (p) => p.ticker === stockCompanyInfo?.ticker
                      ) && (
                        <button
                          className="sell-buttonM"
                          onClick={handleSellClick}
                        >
                          Sell
                        </button>
                      )}{" "}
                    </div>
                  </div>
                  <div className="stock-logo-center">
                    <img
                      src={stockCompanyInfo.logo}
                      alt={`${stockCompanyInfo.name} logo`}
                    />
                    <div className="stock-search-container">
                      {/* Your existing component structure */}
                      {/* Display the market status below the company logo */}
                      <div className="market-status">
                        {marketOpenCloseDisplay}
                      </div>
                    </div>
                  </div>
                  <div className="stock-info-right">
                    <p
                      className={`current-price ${
                        stockInfo.d < 0 ? "negative" : "positive"
                      }`}
                    >
                      {stockInfo.c}
                    </p>
                    {/* <p>{formatTimestamp(stockInfo.t)}</p> */}
                    <p
                      className={`price-change ${
                        stockInfo.d !== null
                          ? stockInfo.d < 0
                            ? "negative"
                            : "positive"
                          : ""
                      }`}
                    >
                      {stockInfo.d !== null ? (
                        <>
                          {stockInfo.d < 0 ? "▼" : "▲"}{" "}
                          {Math.abs(stockInfo.d).toFixed(2)} (
                          {stockInfo.dp !== null
                            ? stockInfo.dp.toFixed(2)
                            : "N/A"}
                          %)
                        </>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <div className="current-time">{currentTime}</div>
                  </div>
                </div>

                <div className="tabs">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.id}
                      id={tab.id}
                      title={tab.title}
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                    />
                  ))}
                </div>
                <div className="tab-content">
                  {activeTab === "summary" && (
                    <div className="summary-grid">
                      <div className="Prices">
                        <p>
                          <strong>High Price:</strong> {stockInfo.h}
                        </p>
                        <p>
                          <strong>Low Price:</strong> {stockInfo.l}
                        </p>
                        <p>
                          <strong>Open Price:</strong> {stockInfo.o}
                        </p>
                        <p>
                          <strong>Prev. Close:</strong> {stockInfo.pc}
                        </p>
                      </div>
                      <div className="About-the-company">
                        <h3>About the company</h3>
                        <p>IPO Start Date: {stockCompanyInfo.ipo}</p>
                        <p>Industry: {stockCompanyInfo.finnhubIndustry}</p>
                        <p>
                          Webpage:{" "}
                          <a href={stockCompanyInfo.weburl} target="_blank">
                            {stockCompanyInfo.weburl}
                          </a>
                        </p>

                        <h4>Company peers:</h4>
                        <div>
                          {peers.map((peerTicker, index) => (
                            <span key={peerTicker}>
                              <Link to={`/search/${peerTicker}`}>
                                {peerTicker}
                              </Link>
                              {index < peers.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="chart1">
                        {stockChartData && (
                          <StockChart1
                            key={stockCompanyInfo.ticker + Date.now()} // Ensures component re-renders with each search
                            dailyStockData={stockChartData}
                            marketOpen={marketStatus.isOpen}
                            ticker={stockCompanyInfo.ticker}
                          />
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "news" && (
                    <div>
                      <div
                        className="news-container"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gridGap: "20px",
                          gridAutoRows: "minmax(100px, auto)",
                        }}
                      >
                        {news.map(
                          (article, index) =>
                            index < 8 && (
                              <button
                                key={article.id}
                                className="news-item"
                                onClick={() => openModalWithNews(article)}
                                style={
                                  {
                                    /* ... your news item styles ... */
                                  }
                                }
                              >
                                <div
                                  key={article.id}
                                  className="news-item"
                                  style={{
                                    padding: "10px",
                                    borderColor: "dark grey",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "start",
                                  }}
                                >
                                  <img
                                    src={article.image}
                                    alt=""
                                    style={{
                                      width: "150px",
                                      height: "100px",
                                      borderRadius: "5px",
                                      marginRight: "20px",
                                    }}
                                    onError={(e) => (e.target.src = img)} // Use the imported img as the fallback
                                  />
                                  <div>{article.headline}</div>
                                </div>
                              </button>
                            )
                        )}
                      </div>
                      {isModalOpen && (
                        <div
                          className="modal"
                          style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.7)", // Darkened overlay
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000, // Ensure it's above other content
                          }}
                        >
                          <div
                            className="modal-content"
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "5px",
                              minWidth: "30%",
                              maxWidth: "30%",
                              textAlign: "left",
                            }}
                          >
                            <button
                              onClick={closeModal}
                              style={{
                                marginLeft: "auto",
                                display: "block",
                                marginBottom: "10px",
                                color: "blue",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              x
                            </button>
                            <h2>{selectedNews.source}</h2>
                            <p>
                              {convertUnixTimestampToDate(
                                selectedNews.datetime
                              )}
                            </p>
                            <hr></hr>
                            <h3>{selectedNews.headline}</h3>
                            <p>{selectedNews.summary}</p>
                            <p>
                              For more details click{" "}
                              <a
                                href={selectedNews.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                here
                              </a>
                            </p>

                            <div className="Share-box">
                              <p>Share</p>
                              <div className="Share-buttons">
                                <div className="x-share-button">
                                  <a
                                    class="twitter-share-button"
                                    href={`https://twitter.com/intent/tweet?text=${selectedNews.headline} ${selectedNews.url}`}
                                    data-size="large"
                                  >
                                    <img
                                      width="50px"
                                      height="50px"
                                      src="https://about.x.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png"
                                    />
                                  </a>
                                </div>

                                <div
                                  className="fb-share-button"
                                  data-href={selectedNews.url}
                                  data-layout="button_count"
                                  data-size="small"
                                >
                                  <a
                                    target="_blank"
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                      selectedNews.url
                                    )}&amp;src=sdkpreparse`}
                                    className="fb-xfbml-parse-ignore"
                                  >
                                    <img
                                      width="50px"
                                      height="50px"
                                      src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/512px-Facebook_f_logo_%282021%29.svg.png?20210818083032"
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div></div>
                    </div>
                  )}

                  {activeTab === "charts" && (
                    <div>
                      {historicalStockData && (
                        <StockChart2
                          key={stockCompanyInfo.ticker + Date.now()} // Ensures component re-renders with each search
                          ticker={stockCompanyInfo.ticker}
                          dailyStockData={historicalStockData}
                        />
                      )}
                    </div>
                  )}
                  {activeTab === "insights" && (
                    <div class="containerI">
                      <div class="insider-insights">
                        <InsiderSentimentsTable
                          insiderInsights={insiderInsights}
                        />
                      </div>
                      <div class="charts">
                        <div class="chartI">
                          <StockChart3 analysisData={analysisData} />
                        </div>
                        <div class="chartII">
                          <StockChart4 earningsData={earningsData} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )
      )}
      <div>
        {buyModalOpen && (
          <Modal isOpen={buyModalOpen} onClose={() => setBuyModalOpen(false)}>
            <div>{stockToBuy.ticker}</div>
            <hr></hr>
            <p>Current Price: {stockInfo.c}</p>
            <p>Money in Wallet: {wallet.toFixed(2)}</p>
            <div className="model-input">
              Quantity:
              <input
                min={0}
                type="number"
                value={stockToBuy.quantity}
                onChange={(e) => {
                  const quantity = parseInt(e.target.value) || 0;
                  setStockToBuy({
                    ...stockToBuy,
                    quantity: quantity,
                  });
                  // Automatically clear the error message if the condition is corrected
                  if (quantity * stockInfo.c <= wallet) {
                    setBuyErrorMessage("");
                  }
                }}
                placeholder="Quantity"
              />
            </div>
            <div>
              {buyErrorMessage && (
                <p style={{ color: "red" }}>{buyErrorMessage}</p>
              )}
            </div>
            <hr></hr>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                Total Cost: ${(stockToBuy.quantity * stockInfo.c).toFixed(2)}
              </p>
              <button
                className="stock-buttons, buy-button"
                style={{
                  backgroundColor:
                    isBuyDisabled || stockToBuy.quantity * stockInfo.c > wallet
                      ? "#f0f0f0"
                      : "#28a745", // light gray or your preferred enabled color
                  color:
                    isBuyDisabled || stockToBuy.quantity * stockInfo.c > wallet
                      ? "#dcdcdc"
                      : "#ffffff", // light text color for disabled or white for enabled
                  cursor:
                    isBuyDisabled || stockToBuy.quantity * stockInfo.c > wallet
                      ? "not-allowed"
                      : "pointer",
                }}
                disabled={
                  isBuyDisabled || stockToBuy.quantity * stockInfo.c > wallet
                }
                onClick={handleBuyStock}
              >
                Buy
              </button>
            </div>
          </Modal>
        )}

        {sellModalOpen && (
          <Modal isOpen={sellModalOpen} onClose={() => setSellModalOpen(false)}>
            <div>{stockToSell.ticker}</div>
            <hr></hr>
            <p>Current Price: {stockInfo.c}</p>
            <p>
              Quantity Owned:{" "}
              {portfolio.find((p) => p.ticker === stockToSell.ticker)
                ?.quantity || 0}
            </p>
            <div className="model-input">
              Quantity:
              <input
                min={0}
                type="number"
                value={stockToSell.quantity}
                onChange={(e) => {
                  const quantity = parseInt(e.target.value) || 0;
                  setStockToSell({
                    ...stockToSell,
                    quantity: quantity,
                  });
                  // Automatically clear the error message if the condition is corrected
                  const portfolioItem = portfolio.find(
                    (p) => p.ticker === stockToSell.ticker
                  );
                  if (portfolioItem && quantity <= portfolioItem.quantity) {
                    setSellErrorMessage("");
                  }
                }}
                placeholder="Quantity"
              />
            </div>
            <div>
              {sellErrorMessage && (
                <p style={{ color: "red" }}>{sellErrorMessage}</p>
              )}
            </div>
            <hr></hr>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                Total Value: ${(stockToSell.quantity * stockInfo.c).toFixed(2)}
              </p>
              <button
                style={{
                  backgroundColor:
                    isSellDisabled ||
                    !portfolio.find((p) => p.ticker === stockToSell.ticker)
                      ?.quantity >= stockToSell.quantity
                      ? "#f0f0f0"
                      : "#28a745", // light gray or your preferred enabled color for sell
                  color:
                    isSellDisabled ||
                    !portfolio.find((p) => p.ticker === stockToSell.ticker)
                      ?.quantity >= stockToSell.quantity
                      ? "#dcdcdc"
                      : "#ffffff", // light text color for disabled or white for enabled
                  cursor:
                    isSellDisabled ||
                    !portfolio.find((p) => p.ticker === stockToSell.ticker)
                      ?.quantity >= stockToSell.quantity
                      ? "not-allowed"
                      : "pointer",
                }}
                className="stock-buttons, sell-button"
                disabled={
                  isSellDisabled ||
                  !portfolio.find((p) => p.ticker === stockToSell.ticker)
                    ?.quantity >= stockToSell.quantity
                }
                onClick={handleSellStock}
              >
                Sell
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};
export default Search;
