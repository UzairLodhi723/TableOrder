import UserLayout from "../../../component/Layout/UserLayout";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { PlaceOrderIcon, UserbellIcon } from "../../../Assets/Icons/UserIcons";
import { useNavigate } from "react-router-dom";

const WaiterOerderPlace = () => {
    const naviagte = useNavigate()
    const goBack = () =>{
        naviagte(-1)
    }
  return (
    <UserLayout>
      <Box
        position={"absolute"}
        top={"4%"}
        left={"5%"}
        onClick={goBack}
      >
        <ArrowBackIosIcon sx={{ color: "#fff" }} />
      </Box>
      <Box zIndex={2} mt={{xs:"30%",md:"10%"}} mx={5}>
        <Typography
          sx={{
            color: "white",
            fontSize: "18px",
            fontWeight: "500",
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          Choose what you want to do?
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <UserbellIcon/>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#a67c00",
                color: "white",
                borderRadius: 1,
                textTransform: "none",
                fontSize:16,
                width:"70%",
                padding: "10px 16px",
              }}
              onClick={() => naviagte("/callWaiterFor")}
            >
              Call the waiter
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box mt={1}>
            <PlaceOrderIcon/>
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#a67c00",
                color: "white",
                borderRadius: 1,
                textTransform: "none",
                fontSize:16,
                lineHeight:1.2,
                width:"70%",
                padding: "10px 16px",
              }}
              onClick={() => naviagte("/DetailMenu")}
            >
              Place your Order through app
            </Button>
          </Box>
        </Box>
      </Box>
    </UserLayout>
  );
};

export default WaiterOerderPlace;
