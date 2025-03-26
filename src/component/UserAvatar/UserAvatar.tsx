import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Avatar,
  Popover,
  MenuList,
  Typography,
  MenuItem,
} from "@mui/material";
import { useRouter } from "../../utils/hooks/use-router";
import { usePathname } from "../../utils/hooks/use-pathname";
import { Images_URL, useGetUserQuery } from "../../store/rtk";
const userImg = require("../../Assets/userImage.jpeg");

const dataOptions = [
  {
    label: "Settings",
    href: "/Settings",
  },
  {
    label: "Logout",
    href: "/",
  },
];

const UserAvatar = () => {
  const {data} = useGetUserQuery(undefined,{"refetchOnFocus":true,"refetchOnReconnect":true,"refetchOnMountOrArgChange":true})
  const [avatar,setAvatar] = useState<any>(null)
    const [userID,setUserId] = useState<any>(null)
    useEffect(()=>{
      if(data && data.user){
        setUserId(data?.user?.uuid)
        setAvatar(data.user.avatar || null)
        console.log(data.user.avatar,"data.user.avatar")
      }
    },[data])
  const router = useRouter();
  const pathname = usePathname();

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleClickItem = useCallback(
    (path: string) => {
      handleClosePopover();
      router.push(path);
    },
    [handleClosePopover, router]
  );
  const userimage = Images_URL+"avatar/"+userID+"/"+avatar
  return (
    <>
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems="center"
        sx={{ cursor: "pointer" }}
        onClick={(e: any) => handleOpenPopover(e)}
      >
        <Typography variant="body2" fontWeight={"bold"}>
          <span style={{ fontWeight: "400" }}>Hello,</span> Admin
        </Typography>
        <Avatar src={userimage?userimage:userImg} sx={{ ml: 2 }} />
      </Box>
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: { width: 120 },
          },
        }}
      >
        <MenuList
          disablePadding
          sx={{
            paddingTop: 0,
            backgroundColor: "#E0E0E0",
            border: "1px solid #a67c00",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {dataOptions.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.href === pathname}
              onClick={() => handleClickItem(option.href)}
              sx={{
                color: "#000",
                "&:hover": { backgroundColor: "#c3ae70" },
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
};

export default UserAvatar;
