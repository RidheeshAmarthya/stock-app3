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

  return (
    <div>
      <h2>Insider Sentiments</h2>
      <table>
        <thead>
          <tr>
            <th>{insiderInsights.symbol}</th>
            <th>MSPR</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total</td>
            <td>{totalMspr.toFixed(2)}</td>
            <td>{totalChange}</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{totalPositiveMspr.toFixed(2)}</td>
            <td>{totalPositiveChange}</td>
          </tr>
          <tr>
            <td>Negative</td>
            <td>{totalNegativeMspr.toFixed(2)}</td>
            <td>{totalNegativeChange}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InsiderSentimentsTable;
