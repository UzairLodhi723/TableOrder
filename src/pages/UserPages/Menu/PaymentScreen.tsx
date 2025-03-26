import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Card,
  CardContent,
  Typography,
  Radio,
  Button,
  Divider,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useLocation, useNavigate } from "react-router-dom";
import UserLayout from "../../../component/Layout/UserLayout";
import {
  Cash,
  Easypaisa,
  Jazzcash,
  MasterCard,
  VisaCard,
} from "../../../Assets/Icons/UserIcons";

import Grid from "@mui/material/Grid2";
import { ShowToast } from "../../../component/ShowToast";
import { useAddOrderMutation } from "../../../store/rtk";
import { errorHandler } from "../../../utils/helper/errorHandler";

const PaymentScreen = () => {
  const [addOrder] = useAddOrderMutation();
  const [Name, setName] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const goBack = () => {
    navigate(-1);
  };
  const [tableNo , setTableNo] = useState("")
  const [cartData , setCartData] = useState<any|[]>([])
  const [selectedCard, setSelectedCard] = useState<string>("");
  useEffect(() =>{
    const table = localStorage.getItem("tableNo");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log(cart)
    const tableNumber = Number(table?.replace(/"/g, ""));
    setTableNo(tableNumber.toLocaleString());
    setCartData(cart)
  },[])

  const handleSelect = (cardType: string) => {
    setSelectedCard(cardType);
  };
  const proceedToPay = async () => {
    if (!Name.trim()) {
      ShowToast("Please enter your name");
    } else if (!selectedCard) {
      ShowToast("Please select a payment method");
    } else {
      try {
        const payload = {
          table_no:tableNo,
          totalamount:state.toString(),
          customer_name:Name,
          payment_way:selectedCard,
          items:cartData,
        };
        console.log(payload,"payload")
        const response = await addOrder(payload).unwrap() as any;
        if (response && response?.status === "success") {
          ShowToast("Order Placed sucessfully");
          localStorage.removeItem("")
        }
      } catch (error) {
        console.error("Upload Failed", error);
        errorHandler(error);
      }
    }
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
      <Box
        sx={{
          py: 2,
          px: 3,
          color: "white",
          height: "90vh",
          zIndex: 2,
          overflow: "auto",
          scrollbarWidth: "none",
          mt: { xs: "10%", sm: "7%", md: "5%" },
          mb: 10,
          width: { xs: "100%", md: "40%" },
        }}
      >
        <TextField
          fullWidth
          placeholder="Enter Your Name"
          variant="outlined"
          InputProps={{
            sx: { backgroundColor: "#fff", borderRadius: 1, height: 40 },
          }}
          sx={{ my: 2 }}
          onChange={(e) => setName(e?.target?.value)}
        />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Card
              sx={{
                background:
                  "linear-gradient(86.76deg, #A3A3A3 34.64%, rgba(239, 238, 238, 0.2) 80.76%)",
                border: " 1px solid rgba(0, 0, 0, 1)",
                borderRadius: 2,
                mb: 1,
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={1}
                  p={0.5}
                  borderRadius={1}
                  border={"1px solid rgba(245, 245, 245, 1)"}
                  onClick={() => handleSelect("mastercard")}
                >
                  <Typography>
                    <MasterCard /> Master Card
                  </Typography>
                  <Radio
                    checked={selectedCard === "mastercard"}
                    onChange={() => handleSelect("mastercard")}
                    sx={{ color: "#a67c00" }}
                  />
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={0.5}
                  borderRadius={1}
                  border={"1px solid rgba(245, 245, 245, 1)"}
                  onClick={() => handleSelect("Visa")}
                >
                  <Typography>
                    <VisaCard /> Visa Card
                  </Typography>
                  <Radio
                    checked={selectedCard === "Visa"}
                    onChange={() => handleSelect("Visa")}
                    sx={{ color: "#a67c00" }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Card
              sx={{
                background:
                  "linear-gradient(86.76deg, #A3A3A3 34.64%, rgba(239, 238, 238, 0.2) 80.76%)",
                border: " 1px solid rgba(0, 0, 0, 1)",
                borderRadius: 2,
                mb: 2,
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={1}
                  p={0.5}
                  borderRadius={1}
                  border={"1px solid rgba(245, 245, 245, 1)"}
                  onClick={() => handleSelect("JazzCash")}
                >
                  <Box display={"flex"} alignItems={"center"}>
                    <Jazzcash />
                    <Typography variant="body1" mx={1}>
                      Jazz Cash
                    </Typography>
                  </Box>
                  <Radio
                    checked={selectedCard === "JazzCash"}
                    onChange={() => handleSelect("JazzCash")}
                    sx={{ color: "#a67c00" }}
                  />
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={1}
                  p={0.5}
                  borderRadius={1}
                  border={"1px solid rgba(245, 245, 245, 1)"}
                  onClick={() => handleSelect("EasyPaisa")}
                >
                  <Box display={"flex"} alignItems={"center"}>
                    <Easypaisa />
                    <Typography variant="body1" mx={1}>
                      EasyPaisa
                    </Typography>
                  </Box>
                  <Radio
                    checked={selectedCard === "EasyPaisa"}
                    onChange={() => handleSelect("EasyPaisa")}
                    sx={{ color: "#a67c00" }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Card
              sx={{
                background:
                  "linear-gradient(86.76deg, #A3A3A3 34.64%, rgba(239, 238, 238, 0.2) 80.76%)",
                border: " 1px solid rgba(0, 0, 0, 1)",
                borderRadius: 2,
                mb: 2,
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={1}
                  p={0.5}
                  borderRadius={1}
                  border={"1px solid rgba(245, 245, 245, 1)"}
                  onClick={() =>
                    navigate("/cashPayment", {
                      state: state,
                    })
                  }
                >
                  <Box display={"flex"} alignItems={"center"}>
                    <Cash />
                    <Typography variant="body1" mx={1}>
                      Cash
                    </Typography>
                  </Box>
                  <ArrowForward sx={{ color: "#fff" }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography>Total Payment</Typography>
        <Box display="flex" justifyContent={"space-evenly"}>
          <Box width={"40%"}>
            <Typography variant="h5" color="#FFD700">
              Rs {state}
            </Typography>
            <Typography variant="body2" sx={{ color: "#aaa", mb: 2 }}>
              View detailed Bill
            </Typography>
          </Box>
          <Box ml={2} width={"50%"}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#a67c00", color: "#fff", mb: 1, py: 1 }}
              fullWidth
              onClick={proceedToPay}
            >
              Proceed to Pay
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#a67c00", color: "#fff", py: 1 }}
              fullWidth
              onClick={() => navigate("/DetailMenu")}
            >
              Add More Items
            </Button>
          </Box>
        </Box>
      </Box>
    </UserLayout>
  );
};

export default PaymentScreen;
