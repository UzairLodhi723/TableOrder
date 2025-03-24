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
import { Images_URL, useGetAllDishQuery } from "../../../store/rtk";

export default function SearchMenu() {
  const { data: dishesData } = useGetAllDishQuery(undefined, {
      refetchOnFocus: true,
    });
  const [AllDishes, setAllDishes] = useState<any[] | []>([]);
  const [search, setSearch] = useState<string>("");
  const [filterData, setFilterData] = useState<any[]>([]);
  const navigate = useNavigate()
  useEffect(() => {
    if (dishesData) {
      setAllDishes(dishesData?.menu);
    }
    if (search.trim() === "") {
      setFilterData(dishesData?.menu || []);
    } else {
      const filteredMenu =
        AllDishes?.filter((dish) =>
          dish?.dishname?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        ) || [];
      setFilterData(filteredMenu);
    }
  }, [search, dishesData]);

    const imageUrl = `${Images_URL}menu/dish/`;
  return (
    <UserLayout>
      <Box
        sx={{
          width: "90%",
          height: "100vh",
          mb: 10,
          zIndex: 2,
        }}
      >
        <Typography variant="h4" color="white">
          Menu
        </Typography>
        <TextField
          fullWidth
          placeholder="Search"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          sx={{
            bgcolor: "white",
            borderRadius: 5,
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
              "&:hover fieldset": {
                border: "none", 
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: "grey" }} />
              </InputAdornment>
            ),
          }}
        />

        <Box
          overflow={"auto"}
          maxHeight={"73vh"}
          sx={{ scrollbarWidth: "none" }}
        >
          <Grid container spacing={0}>
            {filterData.length > 0 ? (
              filterData?.map((item, index) => (
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
              <Box sx={{ display: "flex", justifyContent: "center",alignItems:"center",  mt: 10, width:"100%" }}>
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
