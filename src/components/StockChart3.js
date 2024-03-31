import React, { useEffect } from "react";
import Highcharts from "highcharts";

const StockAnalysisChart = ({ analysisData }) => {
  useEffect(() => {
    if (!analysisData) return;

    // Extract categories (periods) from the data
    const categories = analysisData.map((dataPoint) => dataPoint.period);

    // Prepare the series data for Highcharts
    const seriesData = [
      {
        name: "Buy",
        data: analysisData.map((dataPoint) => dataPoint.buy),
      },
      {
        name: "Strong Buy",
        data: analysisData.map((dataPoint) => dataPoint.strongBuy),
      },
      {
        name: "Hold",
        data: analysisData.map((dataPoint) => dataPoint.hold),
      },
      {
        name: "Sell",
        data: analysisData.map((dataPoint) => dataPoint.sell),
      },
      {
        name: "Strong Sell",
        data: analysisData.map((dataPoint) => dataPoint.strongSell),
      },
    ];

    // Initialize Highcharts
    Highcharts.chart("stock-analysis-chart-container", {
      chart: {
        type: "column",
      },
      title: {
        text: "NVDA Stock Analyst Recommendations",
        align: "left",
      },
      xAxis: {
        categories: categories,
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: "Recommendation Count",
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
  }, [analysisData]);

  return <div id="stock-analysis-chart-container"></div>;
};

export default StockAnalysisChart;
