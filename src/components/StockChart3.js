import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";

const StockAnalysisChart = ({ analysisData, ticker }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!analysisData) return;

    // Extract categories (periods) from the data
    const categories = analysisData.map((dataPoint) => dataPoint.period);

    // Prepare the series data for Highcharts
    const seriesData = [
      {
        name: "Strong Buy",
        data: analysisData.map((dataPoint) => dataPoint.strongBuy),
        color: "#195f32", // Example color
      },
      {
        name: "Buy",
        data: analysisData.map((dataPoint) => dataPoint.buy),
        color: "#23af50", // Example color
      },
      {
        name: "Hold",
        data: analysisData.map((dataPoint) => dataPoint.hold),
        color: "#af7d28", // Example color
      },
      {
        name: "Sell",
        data: analysisData.map((dataPoint) => dataPoint.sell),
        color: "#f05050", // Example color
      },
      {
        name: "Strong Sell",
        data: analysisData.map((dataPoint) => dataPoint.strongSell),
        color: "#732828", // Example color
      },
    ];

    // Initialize or update Highcharts
    if (!chart) {
      const newChart = Highcharts.chart("stock-analysis-chart-container", {
        chart: {
          type: "column",
          backgroundColor: "#f0f0f0", // Grey background
        },
        title: {
          text: `Recommendations Trends`,
          align: "center",
        },
        xAxis: {
          categories: categories,
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: "#Analysis",
          },
          stackLabels: {
            enabled: true,
          },
        },
        tooltip: {
          headerFormat: "<b>{point.x}</b><br/>",
          pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
        },
        plotOptions: {
          column: {
            stacking: "normal",
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: seriesData,
      });
      setChart(newChart);
    } else {
      // Update chart with new data if necessary
      chart.series.forEach((serie, index) => {
        serie.setData(seriesData[index].data);
      });
      chart.setTitle({ text: `${ticker} Stock Analyst Recommendations` });
      chart.redraw();
    }
  }, [analysisData, ticker]); // Re-run effect if analysisData or ticker changes

  return <div id="stock-analysis-chart-container"></div>;
};

export default StockAnalysisChart;
