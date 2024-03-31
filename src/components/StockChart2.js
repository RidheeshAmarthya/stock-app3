import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

// Load Highcharts modules
require("highcharts/indicators/indicators-all")(Highcharts);

const StockChart2 = ({ dailyStockData }) => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const processData = () => {
      const ohlc = [];
      const volume = [];
      const { results } = dailyStockData;

      results.forEach((item) => {
        const timestamp = item.t; // The 't' field represents the timestamp
        ohlc.push([
          timestamp, // date
          item.o, // open
          item.h, // high
          item.l, // low
          item.c, // close
        ]);
        volume.push([
          timestamp, // date
          item.v, // volume
        ]);
      });

      const groupingUnits = [
        ["week", [1]],
        ["month", [1, 2, 3, 4, 6]],
      ];

      // Set chart options
      setChartOptions({
        rangeSelector: { selected: 2 },
        title: { text: "AAPL Historical" },
        subtitle: { text: "With SMA and Volume by Price technical indicators" },
        yAxis: [
          {
            startOnTick: false,
            endOnTick: false,
            labels: { align: "right", x: -3 },
            title: { text: "OHLC" },
            height: "60%",
            lineWidth: 2,
            resize: { enabled: true },
          },
          {
            labels: { align: "right", x: -3 },
            title: { text: "Volume" },
            top: "65%",
            height: "35%",
            offset: 0,
            lineWidth: 2,
          },
        ],
        tooltip: { split: true },
        plotOptions: {
          series: { dataGrouping: { units: groupingUnits } },
        },
        series: [
          {
            type: "candlestick",
            name: "AAPL",
            id: "aapl",
            zIndex: 2,
            data: ohlc,
          },
          {
            type: "column",
            name: "Volume",
            id: "volume",
            data: volume,
            yAxis: 1,
          },
          {
            type: "vbp",
            linkedTo: "aapl",
            params: { volumeSeriesID: "volume" },
            dataLabels: { enabled: false },
            zoneLines: { enabled: false },
          },
          {
            type: "sma",
            linkedTo: "aapl",
            zIndex: 1,
            marker: { enabled: false },
          },
        ],
      });
    };

    processData();
  }, [dailyStockData]); // Add dailyStockData as a dependency here

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={chartOptions}
      />
    </div>
  );
};

export default StockChart2;
