import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { Images_URL } from "../../store/rtk";
const topSelling1 = require("../../Assets/Images/topSelling1.jpeg");
const topSelling2 = require("../../Assets/Images/topSelling2.jpeg");
const topSelling3 = require("../../Assets/Images/topSelling3.jpeg");

const topSellingItems = [
  {
    name: "Chees Burger",
    image: topSelling1,
    sales: 150,
  },
  {
    name: "Pizza Peperoni",
    image: topSelling2,
    sales: 120,
  },
  {
      name: "Pizza Steak",
      image: topSelling3,
      sales: 110,
    },
    {
      name: "Pizza Peperoni",
      image: topSelling2,
      sales: 120,
    },
];
interface TopSellingItemProps {
  data?:any
}

const TopSellingItem:React.FC<TopSellingItemProps> = ({
  data
}) => {
   const imageUrl = `${Images_URL}menu/dish/`;
  
  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: 3,
        bgcolor: "#f4f4f4",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        p:2.2,
        height:"53vh",
        overflow:"auto",
      }}
    >
      {/* <CardContent > */}
        <Typography  fontSize={16} fontWeight={600} mb={1}>
          Top Selling Item
        </Typography>
        <span style={{fontSize:14, color:"#000", lineHeight:0.1}} >
          The top ordered menu this week
        </span>

        {data?.topItems?.length>0 ?
        data?.topItems.map((item:any, index:number) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              my: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={ imageUrl+item?.dishimage}
                alt={item?.name}
                sx={{ width: 40, height: 40, mr: 1 }}
              />
              <Typography variant="body2" fontSize={16} fontWeight={500}>
                {item.name}
              </Typography>
            </Box>
            <Typography variant="body2" fontSize={16} fontWeight={500}>
              {item.sales}
            </Typography>
          </Box>
        )):
        <Typography  fontSize={16} fontWeight={600} display={"flex"} justifyContent={"center"} alignItems={"center"}  m={"auto"}>
          No Items Found
        </Typography>
        }
      {/* </CardContent> */}
    </Card>
  );
};

export default TopSellingItem;
