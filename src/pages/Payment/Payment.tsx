import {
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import UserAvatar from "../../component/UserAvatar/UserAvatar";
import PaymentTable from "../../component/Tables/PaymentTable";
import { useGetAllPaymentQuery } from "../../store/rtk";
import { useEffect, useState } from "react";
const orders = [
  {
    id: "#5644",
    name: "Nabeel Imtiaz",
    detail: "Cash",
    amount: "Rs 467",
    status: "Pending",
    date: "2025-03-01",
  },
  {
    id: "#6112",
    name: "Hassan Khan",
    detail: "Jazzcash",
    amount: "Rs 645",
    status: "Pending",
    date: "2025-03-02",
  },
  {
    id: "#6141",
    name: "Bilal Siddiqui",
    detail: "Cash",
    amount: "Rs 686",
    status: "Pending",
    date: "2025-03-03",
  },
  {
    id: "#6535",
    name: "Younas Ali",
    detail: "Debit Card",
    amount: "Rs 8413",
    status: "Pending",
    date: "2025-03-04",
  },
  {
    id: "#6541",
    name: "Ahmed Awan",
    detail: "Jazzcash",
    amount: "Rs 435",
    status: "Complete",
    date: "2025-03-05",
  },
  
];
const Payment = () => {
  const {data} = useGetAllPaymentQuery(undefined,{"refetchOnFocus":true,"refetchOnReconnect":true,"refetchOnMountOrArgChange":true})
  console.log(data,"dat")
  const [allorder,setAllOrder] = useState([])
    useEffect(()=>{
      if(data){
        setAllOrder(data.paymentlist)
        console.log("data",data)
      }
    },[data])
  return (
    <Box sx={{ padding: 2, bgcolor: "#fff" }}>
    <Box display={"flex"} justifyContent={"space-between"} mx={1}>
      <Typography variant="h5" color="rgba(70, 66, 85, 1)">
        {" "}
        Payment Management
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
    <PaymentTable order={allorder} orderhead={["Order ID"," Customer Name","Payment Way"," Total amount","Payment Status"]}/>
  </Box>
  )
}

export default Payment