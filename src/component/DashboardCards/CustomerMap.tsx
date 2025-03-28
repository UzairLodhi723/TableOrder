import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface CustomerMapProps {
  data?:any
}

const CustomerMap:React.FC<CustomerMapProps> = ({
  data
}) => {
  const [state, setState] = React.useState<{
    series: ApexAxisChartSeries;
    options: ApexOptions;
  }>({
    series: [
      {
        data: [
          data?.weeklyLogs?.Sunday?data?.weeklyLogs?.Sunday:0,
          data?.weeklyLogs?.Monday?data?.weeklyLogs?.Monday:0, 
          data?.weeklyLogs?.Tuesday?data?.weeklyLogs?.Tuesday:0, 
          data?.weeklyLogs?.Wednesday?data?.weeklyLogs?.Wednesday:0, 
          data?.weeklyLogs?.Thursday?data?.weeklyLogs?.Thursday:0, 
          data?.weeklyLogs?.Friday?data?.weeklyLogs?.Friday:0, 
          data?.weeklyLogs?.Saturday?data?.weeklyLogs?.Saturday:0
        ],
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
