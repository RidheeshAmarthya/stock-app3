import React, { useEffect } from "react";
import Highcharts from "highcharts";

const EarningsSurpriseChart = ({ earningsData }) => {
  useEffect(() => {
    if (!earningsData || earningsData.length === 0) return;

    const categories = earningsData.map((dataPoint) => {
      const surprise = dataPoint.actual - dataPoint.estimate;
      let monthDay;
      switch (dataPoint.quarter) {
        case 1:
          monthDay = "01-01";
          break;
        case 2:
          monthDay = "04-01";
          break;
        case 3:
          monthDay = "07-01";
          break;
        case 4:
          monthDay = "10-01";
          break;
        default:
          monthDay = "01-01";
      }
      const dateString = `${dataPoint.year}-${monthDay}`;
      // Use a non-breaking space and a span to manage layout
      return `${dateString}<br><span style="display:inline-block; min-width:50px;">Surprise:&nbsp;${surprise.toFixed(
        2
      )}</span><br>`;
    });

    const actualEarnings = {
      name: "Actual",
      data: earningsData.map((dataPoint) => dataPoint.actual),
      marker: {
        symbol: "square",
      },
    };

    const estimatedEarnings = {
      name: "Estimated",
      data: earningsData.map((dataPoint) => dataPoint.estimate),
      marker: {
        symbol: "diamond",
      },
    };

    Highcharts.chart("earnings-surprise-chart-container", {
      chart: {
        type: "spline",
        backgroundColor: "#f0f0f0",
      },
      title: {
        text: "Historical EPS Surprises",
      },
      xAxis: {
        categories: categories,
        labels: {
          useHTML: true,
        },
        title: {
          text: "Period",
        },
      },
      yAxis: {
        title: {
          text: "Quarterly EPS",
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

  return (
    <div
      id="earnings-surprise-chart-container"
      style={{ width: "100%", height: "400px" }}
    ></div>
  );
};

export default EarningsSurpriseChart;
