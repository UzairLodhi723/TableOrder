import {
  Home,
  Search,
  ShoppingCart,
  Notifications,
  RoomService,
} from "@mui/icons-material";
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Fab,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const bgUser = require("../../Assets/bgImage.png");
interface LayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<LayoutProps> = ({ children }) => {
  const [value, setValue] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let newValue;
    switch (location.pathname) {
      case "/DetailMenu":
        newValue = 0;
        break;
      case "/Search":
        newValue = 1;
        break;
      case "/cart":
        newValue = 2;
        break;
      case "/waiterOrder":
        newValue = 3;
        break;
      default:
        newValue = 0;
        break;
    }
    if (value !== newValue) {
      setValue(newValue);
    }
  }, [location.pathname, value]);
  
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.reduce((sum: any, item: any) => sum + item.quantity, 0));
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((sum: any, item: any) => sum + item.quantity, 0));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url(${bgUser})`,
        backgroundSize: "center",
        backgroundPosition: "bottom",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(16, 16, 16, .7)",
        },
      }}
    >
      {children}

      <Box
        sx={{
          display: window.location.pathname.includes("splash") ||window.location.pathname.includes("cashPayment") 
            ? "none"
            : "block",
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: "50px",
          zIndex: 10,
          backgroundColor: "#fff",
          boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <BottomNavigation
          value={value}
          onChange={(_, newValue) => {
            console.log(newValue,"on chnage")
            setValue(newValue)
          }}
          sx={{
            backgroundColor: "transparent",
            height: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >

          <BottomNavigationAction
            icon={
              <Box
                sx={{
                  backgroundColor: value === 0 ? "#c9aa06" : "transparent",
                  borderRadius: "50%",
                  padding: value === 0 ? "8px" : "0px",
                  border: value === 0 ? "6px solid #131313" : "none",
                  transition: "all 0.3s ease",

                  transform:
                    value === 0
                      ? "translateY(-25px) scale(1)"
                      : "translateY(0) scale(1)",
                  boxShadow:
                    value === 0 ? "0px -4px 12px rgba(0,0,0,0.2)" : "none",
                }}
                onClick={() => navigate("/DetailMenu")}
                >
                <Home
                  sx={{ color: value === 0 ? "#fff" : "#a67c00", fontSize: 32 }}
                />
              </Box>
            }
          />

          <BottomNavigationAction
            icon={
              <Box
                sx={{
                  backgroundColor: value === 1 ? "#c9aa06" : "transparent",
                  borderRadius: "50%",
                  padding: value === 1 ? "8px" : "0px",
                  border: value === 1 ? "6px solid #131313" : "none",
                  transition: "all 0.3s ease",
                  transform:
                    value === 1
                      ? "translateY(-25px) scale(1)"
                      : "translateY(0) scale(1)",
                  boxShadow:
                    value === 1 ? "0px 4px 12px rgba(0,0,0,0.2)" : "none",
                  }}
                  onClick={() => navigate("/Search")}
              >
                <Search
                  sx={{ color: value === 1 ? "#fff" : "#a67c00", fontSize: 32 }}
                />
              </Box>
            }
          />

          <BottomNavigationAction
            icon={
              <Box
                sx={{
                  backgroundColor: value === 2 ? "#c9aa06" : "transparent",
                  borderRadius: "50%",
                  padding: value === 2 ? "8px" : "0px",
                  border: value === 2 ? "6px solid #131313" : "none",
                  transition: "all 0.3s ease",
                  transform:
                    value === 2
                      ? "translateY(-25px) scale(1)"
                      : "translateY(0) scale(1)",
                  boxShadow:
                    value === 2 ? "0px 4px 12px rgba(0,0,0,0.2)" : "none",
                }}
                  onClick={() => navigate("/cart")}
                >
                   <Badge
            badgeContent={cartCount}
            sx={{
              "& .MuiBadge-badge": {
                bgcolor:value === 2 ? "#fff" : "#c9aa06",
                color:value === 2 ? "#c9aa06":"#fff",
                fontSize: "12px",
                fontWeight: "bold",
                minWidth: "15px",
                height: "15px",
              },
            }}
          >
                <ShoppingCart
                  sx={{ color: value === 2 ? "#fff" : "#a67c00", fontSize: 28 }}
                  />
          </Badge>
              </Box>
            }
          />

          <BottomNavigationAction
            icon={
              <Box
                sx={{
                  backgroundColor: value === 3 ? "#c9aa06" : "transparent",
                  borderRadius: "50%",
                  padding: value === 3 ? "8px" : "0px",
                  border: value === 3 ? "6px solid #131313" : "none",
                  transition: "all 0.3s ease",
                  transform:
                    value === 3
                      ? "translateY(-25px) scale(1)"
                      : "translateY(0) scale(1)",
                  boxShadow:
                    value === 3 ? "0px 4px 12px rgba(0,0,0,0.2)" : "none",
                }}
                onClick={() => navigate("/waiterOrder")}
              >
                {" "}
                <RoomService
                  sx={{ color: value === 3 ? "#fff" : "#a67c00", fontSize: 32 }}
                />
              </Box>
            }
          />
        </BottomNavigation>
      </Box>
    </Box>
  );
};

export default UserLayout;
