const finnhub = require("finnhub");

const apiClient = new finnhub.ApiClient();
apiClient.authentications["api_key"].apiKey =
  "co2aripr01qvggedvg6gco2aripr01qvggedvg70";
const finnhubClient = new finnhub.DefaultApi(apiClient);

// Fetch company profile
const getCompanyProfile = (symbol, callback) => {
  finnhubClient.companyProfile2({ symbol: symbol }, callback);
};

// Add more functions as needed for different Finnhub API calls

module.exports = {
  getCompanyProfile,
};
