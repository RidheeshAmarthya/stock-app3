import React, { useEffect } from "react";
import Highcharts from "highcharts";

const EarningsSurpriseChart = ({ earningsData }) => {
  useEffect(() => {
    if (!earningsData) return;

    // Convert the period into a more readable format if necessary
    const categories = earningsData.map(
      (dataPoint) => `Q${dataPoint.quarter} ${dataPoint.year}`
    );

    // Actual and Estimated Earnings Data
    const actualEarnings = {
      name: "Actual Earnings",
      data: earningsData.map((dataPoint) => dataPoint.actual),
      marker: {
        symbol: "square",
      },
    };

    const estimatedEarnings = {
      name: "Estimated Earnings",
      data: earningsData.map((dataPoint) => dataPoint.estimate),
      marker: {
        symbol: "diamond",
      },
    };

    Highcharts.chart("earnings-surprise-chart-container", {
      chart: {
        type: "spline",
      },
      title: {
        text: "NVDA Earnings Surprise Analysis",
      },
      xAxis: {
        categories: categories,
        title: {
          text: "Period",
        },
      },
      yAxis: {
        title: {
          text: "Earnings Per Share (USD)",
        },
        labels: {
          format: "{value}",
        },
      },
      tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: " USD",
        pointFormat:
          '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> USD<br/>',
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: "#666666",
            lineWidth: 1,
          },
        },
      },
      series: [actualEarnings, estimatedEarnings],
    });
  }, [earningsData]);

  return <div id="earnings-surprise-chart-container"></div>;
};

export default EarningsSurpriseChart;
