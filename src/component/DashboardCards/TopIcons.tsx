import React from "react";
import { Box, Badge, IconButton } from "@mui/material";
import { DashboardBell, DashboardMessage, DashboardSetting } from "../../Assets/Icons/DashboardIcons";

interface TopIconsProps {
  icon: "notifications" | "messages" | "settings";
  count: number;
}

const iconMap = {
  notifications: <DashboardBell />, 
  messages: <DashboardMessage />, 
  settings: <DashboardSetting />,
};

const TopIcons: React.FC<TopIconsProps> = ({ icon, count }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 38,
        height: 36,
        border: "1px solid #666",
        borderRadius: "12px",
        bgcolor: "#F4F3F1",
        position: "relative",
        mx:.5
      }}
    >
      <Badge
        badgeContent={count}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#9c7c2a",
            color: "white",
            fontSize: "12px",
            width: 24,
            height: 24,
            borderRadius: "50%",
            top: 0,
            right: 0,
            position: "absolute",
            border: "2px solid white",
          },
        }}
      >
        <IconButton>{iconMap[icon]}</IconButton>
      </Badge>
    </Box>
  );
};

export default TopIcons;
