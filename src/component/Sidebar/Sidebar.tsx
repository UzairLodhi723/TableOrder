import type { Theme, SxProps, Breakpoint } from "@mui/material/styles";

import { useEffect } from "react";
import {
  Divider,
  Box,
  ListItem,
  ListItemButton,
  Avatar,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import { RouterLink } from "../../routes/router-link";
import { varAlpha } from "../../theme/styles";
import { usePathname } from "../../utils/hooks/use-pathname";
import { Scrollbar } from "../Scrollbar";
import { useDispatch } from "react-redux";
import { clearToken } from "../../store/store";
const bgSidebar = require("../../Assets/bgSidebar.png");
const logo = require('../../Assets/logo2.png');

export type NavContentProps = {
  data: {
    path?: string;
    title: string;
    show?:boolean;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        // px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: "none",
        position: "fixed",
        flexDirection: "column",
        backgroundImage: `url(${bgSidebar})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: "var(--layout-nav-zIndex)",
        width: "var(--layout-nav-vertical-width)",

        borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(
          theme.vars.palette.grey["500Channel"],
          0.12
        )})`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: "flex",
        },
        boxShadow:
          "0px 5px 5px -3px rgba(0, 0, 0, 0.06),0px 8px 10px 1px rgba(0, 0, 0, 0.042),0px 3px 14px 2px rgba(0, 0, 0, 0.036)",
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          // px: 2.5,
          overflow: "unset",
          backgroundImage: `url(${bgSidebar})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "var(--layout-nav-mobile-width)",
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, sx }: NavContentProps) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  return (
    <>
      <Stack direction="row" sx={{ mt:-1}}>
      <Avatar src={logo} sx={{width:120, height:120, borderRadius:0, marginLeft:4,objectFit:"cover"}} />
      </Stack>
      {/* <Divider /> */}

      {slots?.topArea}

      <Scrollbar fillContent>
      <Box
        component="nav"
        display="flex"
        flex="1 1 auto"
        flexDirection="column"
        sx={sx}
      >
        <Box component="ul" gap={0.2} display="flex" flexDirection="column">
          {data.map((item, index) => {
            const isActived = item?.path === pathname;

            return (
              <Box key={index}>
               { item?.path?
                <ListItem disableGutters disablePadding>
                  <ListItemButton
                  onClick={() => {
                    if (item?.title === "Log Out") {
                      dispatch(clearToken());
                    }
                  }}
                    disableGutters
                    component={RouterLink}
                    href={item?.path}
                    sx={{
                      pl: item.title==="Dashboard"?4:7,
                      // py: 1,
                      gap: 2,
                      borderRadius: 0,
                      typography: "body2",
                      fontWeight: "fontWeightMedium",
                      color: "white",
                      minHeight: "var(--layout-nav-item-height)",
                      ...(isActived && {
                        fontWeight: "fontWeightSemiBold",
                        bgcolor: "var(--layout-nav-item-active-bg)",
                        borderLeft: "5px solid #a67c00",
                        "&:hover": {
                          bgcolor: "var(--layout-nav-item-hover-bg)",
                        },
                      }),
                    }}
                  >
                    <Box component="span" sx={{ width: 20, height: 20 }}>
                      {item?.icon}
                    </Box>
  
                    <Typography fontSize={"14px"} flexGrow={1}>
                      {item?.title}
                    </Typography>
  
                    {item?.info && item?.info}
                  </ListItemButton>
                </ListItem>
                :
                <Typography color="rgba(166, 124, 0, 1)" textAlign={"center"}> {item.title}</Typography>
                  }
              </Box>
            );
          })}
        </Box>
      </Box>
      </Scrollbar>
      {slots?.bottomArea}
    </>
  );
}
