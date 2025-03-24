import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import React, { useState } from "react";
import { useCreateQRMutation } from "../../store/rtk";
import { ShowToast } from "../../component/ShowToast";
import { errorHandler } from "../../utils/helper/errorHandler";
interface Props {
  setOpen: () => void;
}
const CreateQR: React.FC<Props> = ({ setOpen }) => {
  const [createQR] = useCreateQRMutation()
  const [tableNumber, setTableNumber] = useState("");
  console.log(tableNumber,"table")
  const [error, setError] = useState("");

  const handleCreateQRCode = async() => {

    if (tableNumber == "") {
      ShowToast("Please Add Table Number");
    } else {
      try{

        const response = await createQR({table_no:tableNumber}).unwrap() as any
        if(response && response?.status === "success"){
          ShowToast("QRCode Genrated Sucessfully")
          console.log(response,"resImage")
        }
      }
       catch (error) {
           console.error("Upload Failed", error);
           errorHandler(error)
         }
    }
  }

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        width: "80%",
        height: "90vh",
        p: 4,
        position: "absolute",
        top: "8%",
        right: 10,
        overflowY: "auto",
        zIndex: 1,
      }}
    >
      <Box sx={{ width: "50%", m: "auto", mt:"7%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            m: "auto",
          }}
        >
          <Typography variant="h5" sx={{ color: "#a67c00" }}>
            Create QR Code
          </Typography>
          <Button
            sx={{
              borderColor: "#d8d8d8",
              color: "grey",
              textTransform: "none",
              borderRadius: 1,
              paddingX: 2,
              border: "1px solid #d8d8d8",
            }}
            onClick={() => setOpen()}
          >
            Back
          </Button>
        </Box>
        <Box sx={{ border: "1px solid rgba(206, 206, 206, 1)", p: 3, mt: 2, borderRadius:1 }}>
          <Typography fontSize={16} fontWeight={600} marginBottom={1}>
            Enter Table No
          </Typography>

          <TextField
            fullWidth
            placeholder="Enter Table Number Manually"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            error={!!error}
            sx={{ marginBottom: 2 }}
          />

          {error && (
            <Alert severity="error" sx={{ marginBottom: 2, color:"red" }}>
              {error}
            </Alert>
          )}
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#a67c00",
                color: "#fff",
                borderRadius: 1,
                px: 7,
                py: 2,
                "&:hover": { bgcolor: "#D4AF37 " },
              }}
              onClick={handleCreateQRCode}
            >
              Create QR Code
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateQR;
