import { useEffect, useState } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useLocation, useNavigate } from "react-router-dom";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UserLayout from "../../../component/Layout/UserLayout";
import { Images_URL } from "../../../store/rtk";
const salad = require("../../../Assets/Images/salad.png");
const Cheez = require("../../../Assets/Images/Cheez.png");
const img3 = require("../../../Assets/Images/topSelling1.jpeg");

const CartScreen = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const handleIncrement = (id: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const handleDecrement = (id: number) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const updateCart = (updatedCart: any[]) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.amount * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const goBack = () => navigate(-1);

  const imageUrl = `${Images_URL}menu/dish/`;
  return (
    <UserLayout>
      <Box
        sx={{
          p: 2,
          color: "white",
          height: "90vh",
          zIndex: 2,
          overflow: "auto",
          scrollbarWidth:"none",
          mt: "10%",
          mb: 10,
          width: "100%",
        }}
      >
        <Box
          position={"absolute"}
          top={"4%"}
          left={"5%"}
          display={"flex"}
          onClick={goBack}
        >
          <ArrowBackIosIcon sx={{ color: "#fff" }} />
          <Typography variant="h5" color="#fff">
            {cartItems ? cartItems.length: 0} Items in cart
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
          }}
        >
          {cartItems.length>0?
          cartItems.map((item:any) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  position: "relative",
                  borderRadius: 2,
                  background:
                    "linear-gradient(-86.76deg, #D1D1D1 12.37%, #ECECEC)",
                  marginRight: 2,
                }}
              >
                <img
                  src={imageUrl+item.dishimage}
                  alt={item.name}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography fontWeight="bold">{item.name}</Typography>
                <Typography color="#ffcc00">Rs {item.amount}</Typography>

                {/* Quantity Controls */}
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton
                    onClick={() => handleDecrement(item.id)}
                    sx={{ color: "#462c9c" }}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  <Typography fontWeight="bold" fontSize="16px">
                    {item.quantity}
                  </Typography>
                  <IconButton
                    onClick={() => handleIncrement(item.id)}
                    sx={{ color: "#462c9c" }}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          )):
          <Typography variant="h5" color="#fff" textAlign={"center"} mt={10}>
            No items in cart
          </Typography>
          }
        </Box>
        {
          cartItems.length>0 &&
          <>
        <Box sx={{ mt: 4 }}>
          <Typography>Subtotal</Typography>
          <Typography fontWeight="bold" sx={{ float: "right" }}>
            Rs {subtotal}
          </Typography>
          <Typography mt={2}>Tax 10%</Typography>
          <Typography fontWeight="bold" sx={{ float: "right" }}>
            Rs {tax}
          </Typography>
          <Typography variant="h6" mt={1}>
            Total
            </Typography>
            <Typography
              sx={{ float: "right", color: "#ffcc00", fontWeight: "bold" }}
            >
              Rs {total}
            </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            mx:"20%",
            mt:4,
            py:2,
            alignItems:"center",
            width:"60%",
            backgroundColor: "#a67c00",
            color: "white",
            "&:hover": { backgroundColor: "#a37b30" },
            borderRadius: 1,
          }}
          onClick={() => navigate("/payment",{
            state: total
          })}
        >
          Submit Your Order
        </Button>
          </>
        }
      </Box>
    </UserLayout>
  );
};

export default CartScreen;
