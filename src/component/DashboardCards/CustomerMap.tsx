import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";



const CustomerMap = () => {
  const [state, setState] = React.useState<{
    series: ApexAxisChartSeries;
    options: ApexOptions;
  }>({
    series: [
      {
        data: [60, 80, 35, 60, 70, 25, 63],
       
      },
    ],
    
    options: {
      chart: {
        type: "bar", 
        height: 200,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
          borderRadius: 2,
          borderRadiusApplication: "end",
          colors: {
            ranges: [{
              from: 0,
              to: 50,
              color: '#000'
            }, {
              from: 50,
              to: 100,
              color: '#a67c00'
            }]
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ],
      },
      fill: {
        opacity: 1,
        colors:["#a67c00"]
      },
      grid:{
        show: false,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  });

  return (
    <div id="chart" style={{backgroundColor:"#ECECEC"}}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={230}
      />
    </div>
  );
};

export default CustomerMap;
