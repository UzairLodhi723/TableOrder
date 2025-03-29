import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TopCards from "../../component/DashboardCards/TopCards";
import OrderReport from "../../component/DashboardCards/OrderReports";
import TopSellingItem from "../../component/DashboardCards/TopSelling";
import CustomerMap from "../../component/DashboardCards/CustomerMap";
import PieCharts from "../../component/DashboardCards/PieCharts";
import UserAvatar from "../../component/UserAvatar/UserAvatar";
import { NotificationsPopover } from "../../component/Navbar/notifications-popover";
import { useGetAllOrdersQuery, useGetDashboardQuery } from "../../store/rtk";


const Dashboard = () => {
  const {data} = useGetDashboardQuery(undefined,{"refetchOnFocus":true,"refetchOnReconnect":true,"refetchOnMountOrArgChange":true})
   const {data:OrderData} = useGetAllOrdersQuery(undefined,{"refetchOnFocus":true,"refetchOnReconnect":true,"refetchOnMountOrArgChange":true})
    const [allorder,setAllOrder] = useState([])
  const [DashboardData, setDashboardData] = useState(null)
  useEffect(()=>{
    if(data){
      setDashboardData(data)
    }
    if(OrderData){
    setAllOrder(OrderData)
    }

  },[data, OrderData])
  return (
    <Box sx={{ p: 3, bgcolor: "#fff", minHeight: "100vh" }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        <Grid size={{ xs: 12, md: 7 }}>
        <Typography variant="body1" color="rgba(163, 163, 163, 1)">
        Hi, admin. Welcome back to Excuse Me!
      </Typography>
        </Grid>
        <Grid
          size={{ xs: 6, md: 3 }}
          py={1}
          borderRight={"1px solid rgba(208, 214, 222, 1)"}
        >
          <Box
            display="flex"
            justifyContent={"flex-end"}
            alignItems="center"
            gap={4}
            mx={3}
          >
            {/* Notification */}
            <NotificationsPopover/>
            {/* <AccountPopover/> */}
          </Box>
        </Grid>
        <Grid size={{ xs: 6, md: 2 }}>
          <UserAvatar/>
        </Grid>
      </Grid>
      {/* Metrics */}
      <Typography variant="h5" mb={2}> Dashboard</Typography>
      <TopCards data = {DashboardData}/>
      {/* Charts */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 7.5 }}>
          <Typography variant="h6">Pie Chart</Typography>
          <Box sx={{ display: "flex" }}>
            <PieCharts
              series={[data?.totalorders?parseFloat(((Number(data?.totalorders) / 1000) * 100).toFixed(2)):0]}
              name="Total Orders"
              color1="#dfd0a3"
              color2="#a67c00"
            />
            <PieCharts
              series={[data?.todayOrders?data?.todayOrders:0]}
              name="Customer Growth"
              color1="#cbcbcb"
              color2="#878686"
            />
            <PieCharts
              series={[data?.totalRevenue?(data?.totalRevenue/100000)*100:0]}
              name="Total Revenue"
              color1="#a0bbb1"
              color2="#0a5239"
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4.5 }}>
          <Card
            sx={{ bgcolor: "#ECECEC", border: "1px solid rgba(0, 0, 0, 0.2)" }}
          >
            <Typography variant="h6" px={2}>
              Customer Map
            </Typography>
            <CustomerMap data = {DashboardData} />
          </Card>
        </Grid>
      </Grid>

      {/* Order Report Table */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <OrderReport  data = {allorder}/>
        </Grid>
        <Grid size={{ xs: 12, md: 2.7 }}>
          <TopSellingItem data={DashboardData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
