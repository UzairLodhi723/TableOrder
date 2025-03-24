import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
interface propsPie {
    series?:number[]
    name?:string
    color1?:string
    color2?:string
}

const PieCharts: React.FC<propsPie> = ({
    series,
    name,
    color1,
    color2,
}) => {
  const [state, setState] = useState<{
    series: number[];
    options: ApexOptions;
  }>({
    series: series?series:[0],
    options: {
      chart: {
        type: "radialBar",
        height: 200,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "30%",
          },
          track: {
            background: color1,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              fontSize: "16px",
              fontWeight: "bold",
              color: "#000",
              offsetY: 5,
            },
          },
        },
      },
      colors: [color2], // Custom color
      labels: ["Total Order"],
    },
  });

  return (
    <div style={{ textAlign: "center", minWidth:"33%", }}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="radialBar"
        height={200}
      />
      <div style={{ marginTop: "-20px", color: "#000", fontSize: "15px", fontWeight:600,  }}>
        {name}
      </div>
    </div>
  );
};

export default PieCharts;
