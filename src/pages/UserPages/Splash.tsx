import React, { useEffect } from "react";
import UserLayout from "../../component/Layout/UserLayout";
import { Avatar, Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
const logo = require("../../Assets/logo2.png");

const Splash = () => {
  const navigate = useNavigate();
  const {id} = useParams()
    useEffect(() =>{
      localStorage.setItem("tableNo" ,JSON.stringify(id) )
        setTimeout(() =>{
            navigate("/waiterOrder");
        },2000)
    },[navigate])
  return (
    <UserLayout>
      <Box zIndex={2} textAlign={"center"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
        <Avatar
          src={logo}
          sx={{
            width: 150,
            height: 150,
            borderRadius: 0,
            marginLeft: 4,
            objectFit: "cover",
          }}
        />
        <Typography
        color="#fff"
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginTop: "2rem",
          }}
        >
          Table No: {id}
        </Typography>
      </Box>
    </UserLayout>
  );
};

export default Splash;
