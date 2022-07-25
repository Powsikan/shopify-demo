import React, { useEffect } from "react";
import { render } from "react-dom";
// Import Highcharts
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card } from "@mui/material";

export default function LineChart({ purchaseDate, totalSales }) {
  const chartOptions = {
    title: {
      text: "Shopify Sales",
    },
    chart: {
      type: "line",
    },
    xAxis: {
      categories: purchaseDate !== undefined ? purchaseDate : [], //['2022-06-16','2022-06-18','2022-06-29','2022-06-29','2022-07-08','2022-07-17']
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    // series: [
    //   {
    //     name: "Shopify",
    //     // data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
    //     data: totalSales !== undefined ? totalSales : [], //[37.8,34.16,41.99,41.82,107.99,293],
    //     color: "#64943E",
    //   },
    // ],

    series: [{
        name: 'Shopify',
        data: totalSales !== undefined ? totalSales : [],
        color: "#64943E",
    }, ],
    credits: {
      enabled: false,
    }, // The water mark removal place
  };

  return (
    <>
      <div>
        <Card
          sx={{
            width: "600px",
            height: "400px",
            marginLeft: "0px",
            alignContent: "center",
          }}
        >
          <HighchartsReact options={chartOptions} highcharts={Highcharts} />
        </Card>
      </div>
      
    </>
  );
}
