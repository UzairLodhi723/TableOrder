import { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
// import { categories, dishes } from "../../utils/_mock";
import DishCard from "./DishCard";
import AddDishModal from "./AddDishModal";
import AddCategory from "./AddCategory";
import { useGetAllCategoryQuery, useGetAllDishQuery } from "../../store/rtk";



export default function MenuTabs() {
  const { data: dishesData } = useGetAllDishQuery(undefined,{
    refetchOnFocus:true
  });
  console.log(dishesData,"dishesData")
  const {data:categories, refetch} = useGetAllCategoryQuery(undefined,{
    refetchOnFocus:true,
    refetchOnMountOrArgChange: true,
  });
  const [AllDishes, setAllDishes] = useState<any[]|[]>([])
  const [categorie, setCategorie] = useState<any|[]>([])
  const [selectedCategory, setSelectedCategory] =useState<string|null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDish, setSelectedDish] = useState(null);
  useEffect(() => {
    refetch()
    if (categories?.categories?.length>0) {
      setCategorie(categories?.categories);
      setSelectedCategory(categories?.categories[0]?.name)
    }
    if(dishesData){
      setAllDishes(dishesData?.menu) 
    }
  },[categories, dishesData])

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
  };
  const handleDishClick = (val: any) => {
    setSelectedDish(val)
    setOpen(true);
  };

  return (
    <Card
      sx={{ border: "1px solid rgba(0, 0, 0, 1)", backgroundColor: "#F4F4F4" }}
    >
      <Box sx={{ width: "100%", marginTop: 2 }}>
        <CardContent>
          <Box width={"100%"} display="flex" justifyContent="flex-end">
         <AddCategory categorie={categorie} setCategorie={(e:any) => setCategorie(e)}  />
          </Box>
          {
            categorie?.length>0?
            <>
          <Tabs
            value={selectedCategory}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {categorie?.length>0 &&
            categorie?.map((category:any, index:number) => (
              <Tab
                key={index}
                label={category.name}
                value={category.name}
                sx={{ color: "#000", fontSize: 14, fontWeight: 500 }}
              />
            ))}
          </Tabs>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              borderTop: "1px solid #000",
              borderBottom: "1px solid #000",
              py: 2,
              mr: 5,
              ml: 2,
              scrollbarWidth: 0,
              maxHeight: "60vh",
              overflowY: "auto",
            }}
          >
            <Card
              sx={{
                width: 200,
                minHeight: 270,
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setOpen(!open)}
            >
              <Typography variant="h4">+</Typography>
              <Typography variant="body2" fontWeight={"bold"}>
                Add new Dish
              </Typography>
            </Card>
            {AllDishes.length > 0 &&
              AllDishes.filter((dish:any) => dish?.category === selectedCategory)
              .map((dish, index) => (
                <Box key={index}>
                  <DishCard
                    name={dish?.dishname}
                    image={dish?.dishimage}
                    price={dish?.price}
                    bowls={dish?.quantity}
                    userId={dish?.userId}
                    onClick={() => handleDishClick(dish)}
                  />
                </Box>
              ))}
          </Box>

            </>
            :
            <Typography display={"flex"} justifyContent={"center"} alignItems={"center"}>
              No dishes found in this category
            </Typography>
          }
        </CardContent>
      </Box>
      <AddDishModal open={open} data = {selectedDish} categories={categorie}   onClose={() => {
        setOpen(false)
        setSelectedDish(null)
         }} />
    </Card>
  );
}
