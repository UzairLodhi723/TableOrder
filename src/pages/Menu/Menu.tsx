import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import Grid from "@mui/material/Grid2";
import UserAvatar from '../../component/UserAvatar/UserAvatar'
import SearchIcon from "@mui/icons-material/Search";
import MenuTabs from './TabMenu';

const Menu = () => {
  return (
    <Box sx={{ padding: 2, bgcolor: "#fff" }}>
    <Box display={"flex"} justifyContent={"space-between"} mx={1}>
      <Typography variant="h5" color="rgba(70, 66, 85, 1)">
        {" "}
        Products Management
      </Typography>
      <UserAvatar />
    </Box>
    <Grid container mb={3}>
      <Grid size={{ xs: 12, md: 10 }}>
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
    <MenuTabs/>
    </Box>
  )
}

export default Menu