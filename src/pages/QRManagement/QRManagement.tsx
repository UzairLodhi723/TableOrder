import {
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import UserAvatar from "../../component/UserAvatar/UserAvatar";
import QRTable from "../../component/Tables/QRTable";

const QRManagement = () => {
  return (
    <Box sx={{ padding: 2, bgcolor: "#fff" }}>
    <Box display={"flex"} justifyContent={"space-between"} mx={1}>
      <Typography variant="h5" color="rgba(70, 66, 85, 1)">
        {" "}
        QR Management
      </Typography>
      <UserAvatar />
    </Box>
    <Grid container mb={4}>
      <Grid size={{ xs: 12, md: 7 }}>
        <TextField
          fullWidth
          placeholder="Search here"
          variant="outlined"
          sx={{
            bgcolor: "white",
            border: "1px solid",
            borderColor: "#ebebeb",
            borderRadius: 1,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon sx={{ color: "#a67c00" }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
        <QRTable orderhead={["QR Code"," QR Code ID","Table No","Date Created","Status", "Action"]} />
    </Box>
  )
}

export default QRManagement