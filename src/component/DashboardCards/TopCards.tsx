import {
  DashboardOrdersPerDay,
  DashboardRevnue,
  DashboardTotalOrders,
} from "../../Assets/Icons/DashboardIcons";
import Grid from "@mui/material/Grid2";
import { Card, Typography } from '@mui/material';
import { Box } from '@mui/material';
const TopCards = () => {
    const cardData = [
        {
          icon: <DashboardTotalOrders />,
          label: "Total Orders",
          value: 175,
          percentage: 4,
        },
        {
          icon: <DashboardOrdersPerDay />,
          label: "Order Per Day",
          value: 65,
          percentage: 25,
        },
        {
          icon: <DashboardRevnue />,
          label: "Total Revenue",
          value: "57k PKR",
          percentage: 25,
        },
      ];
  return (
    <Grid container spacing={3}>
    {cardData &&
      cardData?.map((item, index) => (
        <Grid size={{ xs: 12, md: 3.6 }} key={index}>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              px: 3,
              py:1,
              border: "1px solid rgba(0, 0, 0, 0.2)",
              bgcolor: "#ECECEC",
              borderRadius: 3,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Icon Section */}
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: "#b59a4c",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                mr: 2,
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  mt:1,
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </Box>
            </Box>

            {/* Data Section */}
            <Box textAlign={"center"} mx={2}>
              <Typography
                variant="h3"
                fontWeight={700}
                color="rgba(70, 66, 85, 1)"
                sx={{ fontSize: "2rem" }}
              >
                {item.value}
              </Typography>
              <Typography variant="body1" color="text" fontSize={14}>
                {item.label}
              </Typography>
              <Box display="flex" alignItems="center" mt={0.5}>
                <Typography
                  variant="body2"
                  color="success.main"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 500,
                  }}
                >
                  &#x2191; {item.percentage}% (30 days)
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
  </Grid>
  )
}

export default TopCards