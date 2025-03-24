import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Avatar,
} from "@mui/material";
import { Add, Remove, ArrowBack, Star } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UserLayout from "../../../component/Layout/UserLayout";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Images_URL } from "../../../store/rtk";
const img1 = require("../../../Assets/Images/topSelling1.jpeg");
const Cheez = require("../../../Assets/Images/Cheez.png");
const salad = require("../../../Assets/Images/salad.png");
const sauce = require("../../../Assets/Images/sauce.jpeg");

const DescriptionMenu = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const { state } = useLocation();
  console.log(state)
  const [selectedData, setSelectedData] = useState<any[]>([]);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(Math.max(count - 1, 1));
  const goBack = () => {
    navigate(-1);
  };
  const handleClick = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const updatedCart = existingCart.some((item: any) => item.id === state.id)
      ? existingCart.map((item: any) =>
          item.id === state.id
            ? { ...item, quantity: item.quantity + count }
            : item
        )
      : [
          ...existingCart,
          {
            id: state.id,
            dishname: state.dishname,
            amount: state.price,
            dishimage: state.dishimage,
            quantity: count,
          },...selectedData
        ];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };
  const imageUrl = `${Images_URL}menu/dish/`;

  return (
    <UserLayout>
      <Box sx={{ color: "#fff", zIndex: 2 }}>
        {/* Back Button */}
        <Box
          position={"absolute"}
          top={"4%"}
          left={"5%"}
          zIndex={5}
          onClick={goBack}
        >
          <ArrowBackIosIcon sx={{ color: "#fff" }} />
        </Box>

        {/* Product Image */}
        <Card
          sx={{ background: "transparent", borderRadius: 0, minWidth: "100%" }}
        >
          <CardMedia
            component="img"
            height="240px"
            image={imageUrl + state.image}
            alt="Burger"
          />
        </Card>

        {/* Product Details */}
        <Box
          sx={{
            background: "linear-gradient(-86.76deg, #D1D1D1 12.37%, #ECECEC)",
            borderRadius: 5,
            overflow: "auto",
          }}
          p={2}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Button
              startIcon={<Star />}
              sx={{ bgcolor: "#c59b08", color: "#fff" }}
            >
              {state?.rating ? state?.rating : "4.8"}
            </Button>
            <Typography fontWeight="bold" color="#c59b08">
              Rs {state?.price}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight="bold" mb={1} color="#000">
              {state?.dishname}
            </Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <IconButton onClick={handleDecrement} sx={{ color: "#462c9c" }}>
                <RemoveCircleOutlineIcon />
              </IconButton>
              <Typography fontWeight="bold" fontSize="16px" color="#000">
                {count}
              </Typography>
              <IconButton onClick={handleIncrement} sx={{ color: "#462c9c" }}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
          </Box>
          <Typography variant="body1" mb={2} color="#000">
            {state?.description}
          </Typography>
          <Box mx={2}>
            <Typography mb={1} color="#000">
              Add Ons
            </Typography>
            <Box display="flex" gap={3} mb={3}>
              {[
                {
                  id: 1,
                  dishname: "Mozzarella Cheese",
                  amount: 100,
                  quantity: 1,
                  dishimage: Cheez,
                },
                {
                  id: 2,
                  dishname: "Extra lettuce",
                  amount: 100,
                  quantity: 1,
                  dishimage: salad,
                },
                { id: 3, dishname: "Sauce", amount: 100, quantity: 1, dishimage: sauce },
              ]?.map((item: any, index: number) => (
                <Box
                  key={index}
                  sx={{
                    width: 80,
                    height: 80,
                    position: "relative",
                    borderRadius: 2,
                    background:
                      "linear-gradient(-86.76deg, #D1D1D1 12.37%, #ECECEC)",
                  }}
                >
                  <Avatar
                    src={item?.image}
                    alt={"Add Ons"}
                    sx={{ height: 80, width: 80 }}
                  />
                  <IconButton
                    sx={{
                      color: "white",
                      bgcolor: "green",
                      width: 20,
                      height: 20,
                      position: "absolute",
                      bottom: -3,
                      right: -3,
                    }}
                    onClick={() =>
                      setSelectedData((prev: any) => [...prev, item])
                    }
                  >
                    <Add sx={{ p: 0.5 }} />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>

          <Button
            fullWidth
            sx={{ bgcolor: "#a67c00", color: "#fff", p: 1.5, my: 2 }}
            onClick={handleClick}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </UserLayout>
  );
};

export default DescriptionMenu;
