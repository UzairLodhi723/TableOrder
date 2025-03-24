import UserLayout from "../../../component/Layout/UserLayout";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { useAddNotificationMutation } from "../../../store/rtk";
import { useEffect, useState } from "react";
import { ShowToast } from "../../../component/ShowToast";
import { errorHandler } from "../../../utils/helper/errorHandler";

const CallWaiterFor = () => {
  const [CreateNotification] = useAddNotificationMutation();
  const [tableNo, setTableNo] = useState<string | null>(null);
  useEffect(() => {
    const table = localStorage.getItem("tableNo");
    const tableNumber = Number(table?.replace(/"/g, ""));
    setTableNo(tableNumber.toLocaleString());
  }, []);
  const CallWaiter = async (item:number) => {
    try {
      const response = (await CreateNotification({
        table_no: tableNo,
        message: item ==1? "Manually place order":item == 2? "Clean the table":"Complaint"
      }).unwrap()) as any;
      if (response && response?.status === "success") {
        ShowToast("Your Message has been delivered, Waiter is on the way");
      }
    } catch (error) {
      console.error("Upload Failed", error);
      errorHandler(error);
    }
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <UserLayout>
      <Box position={"absolute"} top={"4%"} left={"5%"} onClick={goBack}>
        <ArrowBackIosIcon sx={{ color: "#fff" }} />
      </Box>
      <Box zIndex={2} mt={{ xs: "30%", md: "10%" }}>
        <Typography
          sx={{
            color: "white",
            fontSize: "18px",
            fontWeight: "500",
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          Call the Waiter for?
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#a67c00",
              color: "white",
              borderRadius: 1,
              textTransform: "none",
              fontSize: 16,
              padding: "10px 16px",
            }}
            onClick={() => CallWaiter(1)}
          >
            Manually place order
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#a67c00",
              color: "white",
              borderRadius: 1,
              textTransform: "none",
              fontSize: 16,
              padding: "10px 16px",
            }}
            onClick={() => CallWaiter(2)}
          >
            Clean the table
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#a67c00",
              color: "white",
              borderRadius: 1,
              textTransform: "none",
              fontSize: 16,
              padding: "10px 16px",
            }}
            onClick={() => navigate("/cutlary")}
          >
            Cutlary Provision
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#a67c00",
              color: "white",
              borderRadius: 1,
              textTransform: "none",
              fontSize: 16,
              padding: "10px 16px",
            }}
            onClick={() => CallWaiter(4)}
          >
            Complaint
          </Button>
        </Box>
      </Box>
    </UserLayout>
  );
};

export default CallWaiterFor;
