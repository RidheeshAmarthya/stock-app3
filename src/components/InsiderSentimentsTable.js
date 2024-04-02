import React from "react";

const InsiderSentimentsTable = ({ insiderInsights }) => {
  // Calculate totals
  const totalChange = insiderInsights.data.reduce(
    (acc, item) => acc + item.change,
    0
  );
  const totalMspr = insiderInsights.data.reduce(
    (acc, item) => acc + item.mspr,
    0
  );

  // Filter positive and negative sentiments
  const positiveSentiments = insiderInsights.data.filter(
    (item) => item.mspr > 0
  );
  const negativeSentiments = insiderInsights.data.filter(
    (item) => item.mspr < 0
  );

  // Calculate positive and negative totals
  const totalPositiveChange = positiveSentiments.reduce(
    (acc, item) => acc + item.change,
    0
  );
  const totalPositiveMspr = positiveSentiments.reduce(
    (acc, item) => acc + item.mspr,
    0
  );

  const totalNegativeChange = negativeSentiments.reduce(
    (acc, item) => acc + item.change,
    0
  );
  const totalNegativeMspr = negativeSentiments.reduce(
    (acc, item) => acc + item.mspr,
    0
  );

  const tableStyle = {
    width: "100%",
    textAlign: "center",
    borderLeft: "none",
    borderTop: "none",
    borderRight: "none",
  };

  const thTdStyle = {
    backgroundColor: "white",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    borderLeft: "none",
    borderRight: "none",
    borderTop: "none",
    padding: "8px",
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Insider Sentiments</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>{insiderInsights.symbol}</th>
            <th style={thTdStyle}>MSPR</th>
            <th style={thTdStyle}>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={thTdStyle}>
              <strong>Total</strong>
            </td>
            <td style={thTdStyle}>{totalMspr.toFixed(2)}</td>
            <td style={thTdStyle}>{totalChange}</td>
          </tr>
          <tr>
            <td style={thTdStyle}>
              <strong>Positive</strong>
            </td>
            <td style={thTdStyle}>{totalPositiveMspr.toFixed(2)}</td>
            <td style={thTdStyle}>{totalPositiveChange}</td>
          </tr>
          <tr>
            <td style={thTdStyle}>
              <strong>Negative</strong>
            </td>
            <td style={thTdStyle}>{totalNegativeMspr.toFixed(2)}</td>
            <td style={thTdStyle}>{totalNegativeChange}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InsiderSentimentsTable;
