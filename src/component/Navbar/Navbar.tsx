import type { Theme, SxProps, Breakpoint } from "@mui/material/styles";
import { Fragment, useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { Main } from "./main";
import { layoutClasses } from "../../utils/exportes";
import {
  Navigation,
  NavigationAdmin,
  Navigationmanager,
} from "../../routes/Navigation";
import { MenuButton } from "../menu-button";
import { LayoutSection } from "../Layout/MainLayout";
import { HeaderSection } from "./header-section";
import { NavDesktop, NavMobile } from "../Sidebar/Sidebar";
import { _notifications } from "../../utils/_mock";
import { useGetUserQuery } from "../../store/rtk";

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};
export function DashboardLayout({
  sx,
  children,
  header,
}: DashboardLayoutProps) {
    const {data} = useGetUserQuery(undefined,{"refetchOnFocus":true,"refetchOnReconnect":true,"refetchOnMountOrArgChange":true})
      const [user,setUser] = useState<any>(null)
      console.log(user,"user")
      useEffect(()=>{
        if(data && data.user){
          setUser(data?.user)
        }
      },[data])
  const theme = useTheme();
  const [navOpen, setNavOpen] = useState(false);

  const layoutQuery: Breakpoint = "lg";
  const type = "admin";

  return (
    <LayoutSection
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          sx={{
            ...header?.sx,
            [theme.breakpoints.up(layoutQuery)]: { display: "none" },
          }}
          slots={{
            leftArea: (
              <Fragment>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: "none" },
                  }}
                />
                <NavMobile
                  data={user?.usertype == "owner" ? Navigation:user?.usertype == "admin"? NavigationAdmin : Navigationmanager}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                />
              </Fragment>
            ),
          }}
        />
      }
      sidebarSection={
        <NavDesktop
        data={user?.usertype == "owner" ? Navigation:user?.usertype == "admin"? NavigationAdmin : Navigationmanager}
          layoutQuery={layoutQuery}
        />
      }
      footerSection={null}
      cssVars={{
        "--layout-nav-vertical-width": "278px",
        "--layout-dashboard-content-pt": theme.spacing(1),
        "--layout-dashboard-content-pb": theme.spacing(8),
        "--layout-dashboard-content-px": theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: "var(--layout-nav-vertical-width)",
          },
        },
        ...sx,
        bgcolor: "#fff",
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
