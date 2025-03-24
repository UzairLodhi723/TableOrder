import {
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import UserAvatar from "../../component/UserAvatar/UserAvatar";
import OrderTable from "../../component/Tables/OrderTable";
const orders = [
  {
    id: "#5644",
    name: "Table No 13",
    detail: "Cheese Patty Burger",
    amount: "Rs 767",
    dishAmount: "Rs 467",
    status: "In Progress",
    date: "2025-03-01",
    addOns:[  
      { id: 1, name: "Mozzarella Cheese", price: 100, quantity: 1 },
      { id: 2, name: "Extra lettuce", price: 100, quantity: 1 },
      { id: 3, name: "Sauce", price: 100, quantity: 1 },
  ]
  },
  {
    id: "#6112",
    name: "Table No 01",
    detail: "Spicy Chicken Bowl",
    amount: "Rs 645",
    dishAmount: "Rs 645",
    status: "In Progress",
    date: "2025-03-02",
  },
  {
    id: "#6141",
    name: "Table No 05",
    detail: "Nutella Brownie",
    amount: "Rs 686",
    dishAmount: "Rs 686",
    status: "In Progress",
    date: "2025-03-03",
  },
  {
    id: "#6535",
    name: "Table No 13",
    detail: "Mint Margarita",
    amount: "Rs 8413",
    dishAmount: "Rs 8413",
    status: "In Progress",
    date: "2025-03-04",
  },
  {
    id: "#6541",
    name: "Table No 05",
    detail: "Hot Spicy Fried Rice",
    amount: "Rs 435",
    dishAmount: "Rs 435",
    status: "Ready",
    date: "2025-03-05",
  },
  
];
const Order = () => {
  
  return (
    <Box sx={{ padding: 2, bgcolor: "#fff" }}>
      <Box display={"flex"} justifyContent={"space-between"} mx={1}>
        <Typography variant="h5" color="rgba(70, 66, 85, 1)">
          {" "}
          Order List
        </Typography>
        <UserAvatar />
      </Box>
      <Grid container>
        <Grid size={{ xs: 12, md: 7 }}>
          <TextField
            fullWidth
            placeholder="Search here"
            variant="outlined"
            sx={{
              bgcolor: "white",
              border: "1px solid",
              borderColor: "#ebebeb",
              borderRadius: 1,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "#a67c00" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Box py={2}>
        <Typography variant="caption" color="grey">
          Orders
        </Typography>
      </Box>
      <OrderTable order={orders} orderhead={["Order ID"," Name","Order Detail"," Total amount","Status"]}/>
    </Box>
  );
};

export default Order;
