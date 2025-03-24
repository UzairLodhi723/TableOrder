import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Images_URL } from "../../store/rtk";

interface DishCardProps {
  image?: any;
  name: string;
  price: number;
  bowls?: number | string;
  userId:string;
  onClick:() => void
}

const DishCard: React.FC<DishCardProps> = ({ image, name, price, bowls, onClick, userId }) => {
  console.log(bowls,"bowls")
  const imageUrl = `${Images_URL}menu/dish/${image}`
  return (
    <Card
      sx={{
        width: 200,
        minHeight: 270,
        bgcolor: "black",
        borderRadius: 1,
        overflow: "hidden",
        boxShadow: 3,
        position: "relative",
      }}
    >
      <CardContent sx={{ color: "white", textAlign: "center", px: 4 }}>
        <Avatar src={imageUrl} sx={{ height: 100, width: 100, mx: 2 }} />
        <Typography variant="body2" fontWeight="bold" py={1}>
          {name}
        </Typography>
        <Typography variant="caption" color="grey">
          Rs: {price} • {bowls}: Bowls
        </Typography>
      </CardContent>
      <Box
        sx={{
          bgcolor: "#281e00",
          width: 200,
          textAlign: "center",
          py: 1,
          position: "absolute",
          bottom: 0,
          cursor:"pointer"
        }}
        onClick={onClick}
      >
        <Button
          startIcon={<EditIcon />}
          sx={{ color: "#a67c00", textTransform: "none" }}
        >
          Edit dish
        </Button>
      </Box>
    </Card>
  );
};

export default DishCard;
