import React, { useEffect } from "react";
import Highcharts from "highcharts";

const StockChart1 = ({ dailyStockData, marketOpen, ticker }) => {
  const lineColor = marketOpen ? "green" : "red";

  useEffect(() => {
    if (!dailyStockData) return;

    const transformedData = dailyStockData.results.map((dataPoint) => {
      return [dataPoint.t, dataPoint.c];
    });

    Highcharts.chart("stock-chart-container", {
      chart: {
        type: "line",
        zoomType: "x",
        backgroundColor: "#f0f0f0", // Grey background
      },
      title: {
        text: ticker + " Hourly Price Variation",
        align: "center",
      },
      xAxis: {
        type: "datetime",
        tickInterval: (24 / 8) * 3600 * 1000, // Aim for around 6 intervals
        labels: {
          format: "{value:%H:%M}",
        },
        crosshair: true,
        gridLineWidth: 1, // Adjust grid line width as needed
      },
      yAxis: {
        title: {
          text: "", // Remove Y-axis title
        },
        opposite: true, // Move Y-axis to the right
        gridLineColor: "#707073", // Darker grid lines for Y-axis
        gridLineWidth: 1, // Adjust grid line width as needed
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
          color: lineColor,
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
