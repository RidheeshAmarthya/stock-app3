// StockChart.js
import React, { useEffect } from "react";
import Highcharts from "highcharts";

const StockChart1 = ({ dailyStockData }) => {
  useEffect(() => {
    if (!dailyStockData) return;

    const transformedData = dailyStockData.results.map((dataPoint) => {
      return [dataPoint.t, dataPoint.c];
    });

    Highcharts.chart("stock-chart-container", {
      chart: {
        type: "line",
        zoomType: "x",
      },
      title: {
        text: "AAPL Hourly Price Variation",
        align: "left",
      },
      xAxis: {
        type: "datetime",
        tickInterval: 3600 * 1000,
        labels: {
          format: "{value:%H:%M}",
        },
        crosshair: true,
      },
      yAxis: {
        title: {
          text: "Stock Price (USD)",
        },
      },
      tooltip: {
        shared: true,
        xDateFormat: "%A, %b %e, %H:%M",
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
          },
          lineWidth: 3,
          color: "#FF0000",
        },
      },
      series: [
        {
          name: "Price",
          data: transformedData,
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }, [dailyStockData]);

  return <div id="stock-chart-container"></div>;
};

export default StockChart1;
