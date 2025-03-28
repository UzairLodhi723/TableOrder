import {
  Box,
  Card,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useGetAnalyticsQuery } from "../../store/rtk";


const AnalyicCards = () => {
  const {data} = useGetAnalyticsQuery (undefined,{"refetchOnFocus":true,"refetchOnReconnect":true,"refetchOnMountOrArgChange":true})
  const [AnalyticsData, setAnalyticsData] = useState(null)
  useEffect(()=>{
    if(data){
      setAnalyticsData(data)
    }
  },[data])
  console.log(AnalyticsData,"AnalyticsData")
  const Overview = [
    {
      heading1: "Today's",
      heading2: "Orders",
      data: data?.today_Order,
    },
    {
      heading1: "Tota",
      heading2: "Orders",
      data: data?.total_orders      ,
    },
    {
      heading1: "Total",
      heading2: "Customers",
      data: data?.total_customer,
    },
    {
      heading1: "Total",
      heading2: "Revenue",
      data: data?.totalRevenue,
    },
  ];
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Chart Data
  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    colors: ["#94792e"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "40%",
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: [
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr"
      ],
    },
    stroke: {
        lineCap: "round",
      },
  };

  const chartSeries = [
    {
      name: "Customers",
      data: [data?.customer_Map?.May?data?.customer_Map?.May:0,
        data?.customer_Map?.June?data?.customer_Map?.June:0,
        data?.customer_Map?.July?data?.customer_Map?.July:0,
        data?.customer_Map?.August?data?.customer_Map?.August:0,
        data?.customer_Map?.September?data?.customer_Map?.September:0,
        data?.customer_Map?.October?data?.customer_Map?.October:0,
        data?.customer_Map?.November?data?.customer_Map?.November:0,
        data?.customer_Map?.December?data?.customer_Map?.December:0,
        data?.customer_Map?.January?data?.customer_Map?.January:0,
        data?.customer_Map?.February?data?.customer_Map?.February:0,
        data?.customer_Map?.March?data?.customer_Map?.March:0,
        data?.customer_Map?.April?data?.customer_Map?.April:0,
         ],
    },
  ];

  return (
    <Box>
      <Grid container spacing={4}>
        {/* Overview */}
        <Grid size={{ xs: 11 }}>
          <Card
            sx={{
              padding: 1,
              bgcolor: "#EDEDED",
              border: " 1px solid #7F7F7F",
              boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              mx={1}
              mb={1}
              color="rgba(70, 66, 85, 1)"
            >
              Overview
            </Typography>
            <Box sx={{ display: "flex", gap: 12, mx: 4 }}>
              {Overview.map((item, index) => {
                return (
                  <Box key={index} sx={{ display: "flex" }}>
                    <Typography variant="caption" color="grey">
                      {item.heading1} <br />{" "}
                      <span style={{ fontSize: 13 }}>{item.heading2} </span>
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ color: "#94792e", fontWeight: 600, mx: 2, my: 1 }}
                    >
                      {item.data}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Card>
        </Grid>

        {/* Menu Status & Selling Rate */}
        <Grid size={{ xs: 12, md: 5.5 }}>
          <Card
            sx={{
              padding: 2,
              bgcolor: "#EDEDED",
              border: " 1px solid #7F7F7F",
              boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              mx={1}
              mb={1}
              color="rgba(70, 66, 85, 1)"
            >
              Menu Status
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pr: 4,
                pl: 2,
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "rgba(93, 102, 121, 1)",
                    pb: 1,
                  }}
                >
                  Special Dishes
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "rgba(133, 141, 157, 1)",
                    pb: 1,
                  }}
                >
                  Steak
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "rgba(133, 141, 157, 1)",
                    pb: 1,
                  }}
                >
                  Sweet corn soup
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "rgba(133, 141, 157, 1)",
                    pb: 1,
                  }}
                >
                  BBQ
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "rgba(93, 102, 121, 1)",
                    pb: 1,
                  }}
                >
                  Desert
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "rgba(133, 141, 157, 1)",
                    pb: 1,
                  }}
                >
                  Nutella Brownie
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "rgba(133, 141, 157, 1)",
                    pb: 1,
                  }}
                >
                  Creamy Fudge Brownie
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: "rgba(133, 141, 157, 1)",
                    pb: 1,
                  }}
                >
                  Apple Pie
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5.5 }}>
          <Card
            sx={{
              padding: 1,
              bgcolor: "#EDEDED",
              border: " 1px solid #7F7F7F",
              boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Typography variant="h6">Selling Rate</Typography>
            <Box display={"flex"}>
              <Chart
                options={{
                  chart: {
                    type: "radialBar",
                    offsetY: -20,
                    sparkline: {
                      enabled: true,
                    },
                  },
                  colors: ["#a67c00"],
                  plotOptions: {
                    radialBar: {
                      startAngle: -90,
                      endAngle: 90,
                      track: {
                        background: "#fff",
                        strokeWidth: "97%",
                        margin: 5,
                      },
                      dataLabels: {
                        name: {
                          show: false,
                        },
                        value: {
                          offsetY: -2,
                          fontSize: "22px",
                        },
                      },
                    },
                  },
                  labels: ["Successful"],
                }}
                series={[0]}
                type="radialBar"
                height={280}
              />
              <Box my={4}>
                <Typography variant="caption">
                  <span
                    style={{ fontSize: 10, color: "#a67c00", fontWeight: 400 }}
                  >
                    ●
                  </span>
                  Successful
                </Typography>
                <br />
                <Typography variant="caption">
                  <span
                    style={{ fontSize: 10, color: "#fff", fontWeight: 400 }}
                  >
                    ●
                  </span>
                  Unsuccessful
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Customer Map */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card
            sx={{
              padding: 1,
              bgcolor: "#EDEDED",
              border: " 1px solid #7F7F7F",
              boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Customer Map</Typography>
              <Box>
                {/* <Typography
                  component="span"
                  sx={{ borderBottom: "2px solid #94792e", cursor: "pointer" }}
                >
                  Yearly
                </Typography> */}
                {/* <IconButton onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton> */}
                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MenuItem onClick={handleMenuClose}>Monthly</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Weekly</MenuItem>
                </Menu>
              </Box>
            </Box>
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={220}
            />
          </Card>
        </Grid>

        {/* Customer Feedback */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card
            sx={{
              padding: 2,
              bgcolor: "#EDEDED",
              border: " 1px solid #7F7F7F",
              boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Typography variant="h6" my={2}>
              Customers Feedback
            </Typography>
            <Box>
              {[
                {
                  table: "13",
                  feedback: "Food was very delicious..",
                  id: "#5644",
                },
                {
                  table: "01",
                  feedback: "Sauce was extra spicy, could be better",
                  id: "#6112",
                },
                { table: "05", feedback: "Highly recommended", id: "#6541" },
              ].map((item) => (
                  <Box
                    key={item.id}
                    display={"flex"}
                    justifyContent={"space-between"}
                    sx={{ mb: 2, mr: 5 }}
                    borderBottom={"1px solid rgba(208, 211, 217, 1)"}
                  >
                    <Box width={"60%"}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: "rgba(93, 102, 121, 1)" }}
                      >
                        Table no {item.table}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#666" }}>
                        {item.feedback}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: "12px", color: "#999" }}>
                      {item.id}
                    </Typography>
                  </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyicCards;
