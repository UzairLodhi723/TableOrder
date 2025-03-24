import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import UserLayout from "../../../component/Layout/UserLayout";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Images_URL,
  useGetAllCategoryQuery,
  useGetAllDishQuery,
} from "../../../store/rtk";
import { Categories } from "../../../utils/_mock";
const img1 = require("../../../Assets/Images/topSelling1.jpeg");
const img2 = require("../../../Assets/Images/topSelling2.jpeg");
const img3 = require("../../../Assets/Images/topSelling3.jpeg");
const Cheez = require("../../../Assets/Images/Cheez.png");
const salad = require("../../../Assets/Images/salad.png");
const sauce = require("../../../Assets/Images/sauce.jpeg");

const menuItems = [
  {
    id: 1,
    name: "Chicken double patty Burger",
    description: "Extra Cheesy",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.4",
    price: 450,
    time: "20 Min",
    image: img1,
    addOns: [
      {
        id: 1,
        name: "Mozzarella Cheese",
        price: 100,
        quantity: 1,
        image: Cheez,
      },
      { id: 2, name: "Extra lettuce", price: 100, quantity: 1, image: salad },
      { id: 3, name: "Sauce", price: 100, quantity: 1, image: sauce },
    ],
  },
  {
    id: 2,
    name: "Zinger Burger",
    description: "Crispy Chicken",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.8",
    price: 750,
    time: "15 Min",
    image: img2,
    addOns: [
      {
        id: 1,
        name: "Mozzarella Cheese",
        price: 100,
        quantity: 1,
        image: Cheez,
      },
      { id: 2, name: "Sauce", price: 100, quantity: 1, image: sauce },
    ],
  },
  {
    id: 3,
    name: "Big Cheese burger",
    description: "Doubled layer cheese",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.9",
    price: 470,
    time: "20 Min",
    image: img3,
    addOns: [
      {
        id: 1,
        name: "Mozzarella Cheese",
        price: 100,
        quantity: 1,
        image: Cheez,
      },
      { id: 2, name: "Extra lettuce", price: 100, quantity: 1, image: salad },
    ],
  },
  {
    id: 1,
    name: "Chicken double patty Burger",
    description: "Extra Cheesy",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.4",
    price: 450,
    time: "20 Min",
    image: img1,
    addOns: [
      { id: 1, name: "Extra lettuce", price: 100, quantity: 1, image: salad },
      { id: 2, name: "Sauce", price: 100, quantity: 1, image: sauce },
    ],
  },
  {
    id: 2,
    name: "Zinger Burger",
    description: "Crispy Chicken",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.8",
    price: 750,
    time: "15 Min",
    image: img2,
  },
  {
    id: 3,
    name: "Big Cheese burger",
    description: "Doubled layer cheese",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.9",
    price: 470,
    time: "20 Min",
    image: img3,
  },
  {
    id: 1,
    name: "Chicken double patty Burger",
    description: "Extra Cheesy",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.4",
    price: 450,
    time: "20 Min",
    image: img1,
  },
  {
    id: 2,
    name: "Zinger Burger",
    description: "Crispy Chicken",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.8",
    price: 750,
    time: "15 Min",
    image: img2,
  },
  {
    id: 3,
    name: "Big Cheese burger",
    description: "Doubled layer cheese",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.9",
    price: 470,
    time: "20 Min",
    image: img3,
  },
  {
    id: 1,
    name: "Chicken double patty Burger",
    description: "Extra Cheesy",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.4",
    price: 450,
    time: "20 Min",
    image: img1,
  },
  {
    id: 2,
    name: "Zinger Burger",
    description: "Crispy Chicken",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.8",
    price: 750,
    time: "15 Min",
    image: img2,
  },
  {
    id: 3,
    name: "Big Cheese burger",
    description: "Doubled layer cheese",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.9",
    price: 470,
    time: "20 Min",
    image: img3,
  },
  {
    id: 1,
    name: "Chicken double patty Burger",
    description: "Extra Cheesy",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.4",
    price: 450,
    time: "20 Min",
    image: img1,
  },
  {
    id: 2,
    name: "Zinger Burger",
    description: "Crispy Chicken",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.8",
    price: 750,
    time: "15 Min",
    image: img2,
  },
  {
    id: 3,
    name: "Big Cheese burger",
    description: "Doubled layer cheese",
    detail:
      "Big juicy chicken burger with cheese, lettuce, tomato, onions and special sauce !",
    rating: "4.9",
    price: 470,
    time: "20 Min",
    image: img3,
  },
];

export default function DetailMenu() {
  const { data: dishesData } = useGetAllDishQuery(undefined, {
    refetchOnFocus: true,
  });
  console.log(dishesData, "dishesData");
  const { data: categories } = useGetAllCategoryQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  console.log(categories, "categories");

  const [categorie, setCategorie] = useState<any[] | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [AllDishes, setAllDishes] = useState<any[] | []>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (categories?.categories?.length > 0) {
      setCategorie(categories?.categories);
      setSelectedCategory(categories?.categories[0]?.name);
    }
    if (dishesData) {
      setAllDishes(dishesData?.menu);
    }
  }, [categories, dishesData]);
  const imageUrl = `${Images_URL}menu/dish/`;
  return (
    <UserLayout>
      <Box
        sx={{
          width: "90%",
          height: "100vh",
          mb: 10,
          zIndex: 2,
          // scrollbarWidth:"none"
        }}
      >
        <Typography variant="h4" color="white">
          Menu
        </Typography>
        <Box display={"flex"} overflow={"auto"} mt={1}>
          {categorie.length > 0 &&
            categorie?.map((category: any, index: number) => (
              <Button
                key={index}
                variant="contained"
                sx={{
                  bgcolor: "#a67c00",
                  color: "#fff",
                  fontSize: 10,
                  p: 1,
                  textTransform: "none",

                  border: "1px solid rgba(0, 0, 0, 1)",
                  "&:hover": { bgcolor: "#b59a4c" },
                  borderRadius: 3,
                  mr: 1,
                  mb: 2,
                }}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </Button>
            ))}
        </Box>
        <Box
          overflow={"auto"}
          maxHeight={"73vh"}
          sx={{ scrollbarWidth: "none" }}
        >
          <Grid container spacing={0}>
            {AllDishes.length > 0 ? (
              AllDishes.filter(
                (dish: any) => dish?.category === selectedCategory
              ).map((item, index) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                  <Card
                    sx={{ backgroundColor: "#262626", borderRadius: 3, mb: 2 }}
                    onClick={() =>
                      navigate("/Description", {
                        state: item,
                      })
                    }
                  >
                    <CardMedia
                      component="img"
                      height={170}
                      image={imageUrl + item?.dishimage}
                      alt={item.name}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 1,
                        px: 2,
                        background:
                          "linear-gradient(86.76deg, #FFFFFF 34.64%, rgba(239, 238, 238, 0.2) 80.76%)",
                      }}
                    >
                      <Typography
                        variant="body1"
                        fontFamily={"poly"}
                        sx={{ color: "#000" }}
                      >
                        {item.dishname}
                      </Typography>
                      <Typography variant="body2" color="gray">
                        {item.tagline}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          // justifyContent: "space-between",
                          mt: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: "rgba(201, 170, 5, 1)",
                            fontWeight: "bold",
                          }}
                        >
                          Rs {item.price}
                        </Typography>
                        <Typography variant="body2" color="#000" mx={2}>
                          ⏱ {item.availabilitytime} Min
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <Typography variant="h6" color="gray">
                  No items found
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>
      </Box>
    </UserLayout>
  );
}
