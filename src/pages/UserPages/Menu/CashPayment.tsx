import React from 'react'
import UserLayout from '../../../component/Layout/UserLayout'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const CashPayment = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1);
      };
  return (
    <UserLayout>
    <Box
      position={"absolute"}
      top={"4%"}
      left={"5%"}
      display={"flex"}
      onClick={goBack}
    >
      <ArrowBackIosIcon sx={{ color: "#fff" }} />
      <Typography variant="h5" color="#fff">
        Payment Option
      </Typography>
    </Box>
    <Box width={{xs:"60%", md:"50%"}} height={"100vh"} zIndex={1} display={"flex"} flexDirection={"column"} justifyContent={"center"} textAlign={"center"} >
        <Typography variant="h3" color="#fff"  >
        Please proceed to the cashier counter to pay the amount. <br/> Thank you
        </Typography>
    </Box>
    </UserLayout>
  )
}

export default CashPayment