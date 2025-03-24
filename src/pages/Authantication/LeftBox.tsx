import React from 'react'
import Grid from "@mui/material/Grid2"
import { Avatar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const testImage = require('../../Assets/bgAuth.png');
const logo = require('../../Assets/logo.png');
interface LeftProps {
    heading1:String;
    heading2?:String;
    buttonText?:String
    path?:string
}
const LeftBox:React.FC<LeftProps> = ({
    heading1,
    heading2,
    buttonText,
    path
}) => {
  const navigate = useNavigate()
  return (
    <Grid
      size={{ xs:12,md:6}}
        sx={{
          backgroundImage: `url(${testImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          padding: 4,
        }}
      >
        <Avatar src={logo} sx={{width:200, height:200, borderRadius:0, mt:5}} />
        <Typography variant="h3" fontWeight="bold" fontFamily={"Jaldi, sans-serif"} fontSize={"48px"}>
          {heading1}
        </Typography>
        {
          path &&
          <>
        <Typography variant="h4" mt={"20%"} fontFamily={"Jaldi, sans-serif"} fontSize={"40px"}>
          {heading2}
        </Typography>
        <Button variant="contained" sx={{px:8,py:1.5, mt: 2, bgcolor: "white", color: "black" }} onClick={() => navigate(path)}>
          {buttonText}
        </Button>
          </>
        }
      </Grid>
  )
}

export default LeftBox