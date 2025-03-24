import { Box, Button, IconButton, Typography } from "@mui/material";
import UserLayout from "../../../component/Layout/UserLayout";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import {
  Dish,
  Fork,
  Glass,
  Knife,
  Spoon,
} from "../../../Assets/Icons/UserIcons";
import { useNavigate } from "react-router-dom";
import { ShowToast } from "../../../component/ShowToast";
import { useAddNotificationMutation } from "../../../store/rtk";
import { errorHandler } from "../../../utils/helper/errorHandler";
const items = [
  { id: 1, name: "Spoon", icon: <Spoon /> },
  { id: 2, name: "Fork", icon: <Fork /> },
  { id: 3, name: "Plate", icon: <Dish /> },
  { id: 4, name: "Knife", icon: <Knife /> },
  { id: 5, name: "Glass", icon: <Glass /> },
];
const Cutlary = () => {
   const [CreateNotification] = useAddNotificationMutation();
    const [tableNo, setTableNo] = useState<string | null>(null);
    useEffect(() => {
      const table = localStorage.getItem("tableNo");
      const tableNumber = Number(table?.replace(/"/g, ""));
      setTableNo(tableNumber.toLocaleString());
    }, []);
  const navigate = useNavigate();
  const [counts, setCounts] = useState<{
    [key: number]: { count: number; name: string };
  }>(() =>
    items.reduce(
      (acc, item) => ({ ...acc, [item.id]: { count: 0, name: item.name } }),
      {}
    )
  );
  console.log(counts,"counts")

  const handleIncrement = (id: number) => {
    setCounts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        count: prev[id].count + 1,
      },
    }));
  };

  const handleDecrement = (id: number) => {
    setCounts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        count: Math.max(prev[id].count - 1, 0),
      },
    }));
  };
  const goBack = () => {
    navigate(-1);
  };
  const CallWaiter = async () => {
    const orderedItems = Object.values(counts)
    .filter((item) => item.count > 0)
    .map((item) => `${item.count} x ${item.name}`)
    .join(', ');

    try {
      const response = (await CreateNotification({
        table_no: tableNo,
        message:`Table ${tableNo} has placed an order: ${orderedItems}`
      }).unwrap()) as any;
      if (response && response?.status === "success") {
        ShowToast("Your Message has been delivered, Waiter is on the way");
      }
    } catch (error) {
      console.error("Upload Failed", error);
      errorHandler(error);
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
        <Typography variant="body2" color="#fff">
          Cutlery Detail
        </Typography>
      </Box>
      <Box zIndex={2} mt={{ xs: "20%", md: "7%" }}>
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#a67c00",
              borderRadius: "12px",
              padding: "12px 16px",
              marginBottom: 3,
            }}
          >
            {/* Icon and Name */}
            <Box display="flex" alignItems="center" gap={1} mr={2}>
              {item.icon}
              <Typography fontWeight="bold" fontSize="16px" color="#fff" mb={1}>
                {item.name}
              </Typography>
            </Box>

            {/* Counter */}
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton
                onClick={() => handleDecrement(item.id)}
                sx={{ color: "#462c9c" }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <Typography fontWeight="bold" fontSize="16px">
                {counts[item.id].count}
              </Typography>
              <IconButton
                onClick={() => handleIncrement(item.id)}
                sx={{ color: "#462c9c" }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Button
          fullWidth
          sx={{
            backgroundColor: "#a67c00",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            padding: "12px",
            borderRadius: "12px",
          }}
          onClick={CallWaiter}
        >
          Order Cutlary
        </Button>
      </Box>
    </UserLayout>
  );
};

export default Cutlary;
