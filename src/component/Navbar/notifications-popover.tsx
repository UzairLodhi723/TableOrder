
import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Popover,
  Typography,
  IconButton,
} from "@mui/material";
import { Scrollbar } from "../Scrollbar";
import TopIcons from "../DashboardCards/TopIcons";
import { useGetAllNotificationQuery } from "../../store/rtk";

export function NotificationsPopover({
  ...other
}) {
  const {data} = useGetAllNotificationQuery(undefined,{
    refetchOnFocus:true
  })
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [notifications, setNotifications] = useState<any[] | []>([]);
  useEffect(() =>{
    if(data){
      setNotifications(data?.notification)
      }
  },[data])

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date"; // Handle invalid date
    }
  
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    if (!isFinite(diffInSeconds)) {
      return "Invalid time difference";
    }
  
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  
    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, 'second');
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    } else if (diffInSeconds < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    } else if (diffInSeconds < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
    }
  };
  
  return (
    <>
      <IconButton
        color={openPopover ? "primary" : "default"}
        onClick={handleOpenPopover}
        {...other}
      >
      <TopIcons icon="notifications" count={notifications?.length}/>
      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 360,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              backgroundColor:"#ECECEC"
            },
          },
        }}
      >

        <Scrollbar
          fillContent
          sx={{ maxHeight: "50vh" }}
        >
          {notifications.length>0?notifications?.map((notification, index) => (
        <Box key={index} sx={{ py: 1,px:2, borderBottom: '1px solid #ccc', lineHeight:1, cursor:"pointer" }}>
          <Typography fontWeight="bold" variant="body1" lineHeight={1.5}>
            Table No {notification.table}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
            {notification.message}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ marginTop: 0.5 }}>
            {getTimeAgo(notification.created_At)}
          </Typography>
        </Box>
      ))
    :
    <Box sx={{py:2,display:"flex",justifyContent:"center"}}>
      <Typography variant="h6" color="text.secondary"
      sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>No notifications
      </Typography>
      </Box>}
        </Scrollbar>
      </Popover>
    </>
  );
}
