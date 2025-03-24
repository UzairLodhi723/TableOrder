import { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { DashboardLayout } from "../component/Navbar/Navbar";
import SignUp from "../pages/Authantication/Signup";
import Login from "../pages/Authantication/Login";
import Splash from "../pages/UserPages/Splash";
import WaiterOerderPlace from "../pages/UserPages/WaiterOrderPlace/WaiterOerderPlace";
import CallWaiterFor from "../pages/UserPages/WaiterOrderPlace/CallWaiterFor";
import Cutlary from "../pages/UserPages/WaiterOrderPlace/Cutlary";
import DetailMenu from "../pages/UserPages/Menu/DetailMenu";
import DescriptionMenu from "../pages/UserPages/Menu/DescriptionMenu";
import CartScreen from "../pages/UserPages/Menu/CartScreen";
import PaymentScreen from "../pages/UserPages/Menu/PaymentScreen";
import { useSelector } from "react-redux";
import CashPayment from "../pages/UserPages/Menu/CashPayment";
import SearchMenu from "../pages/UserPages/Menu/SearchMenu";
const Analytics = lazy(() => import("../pages/Analytics/Analytics"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Order = lazy(() => import("../pages/Order/Order"));
const Menu = lazy(() => import("../pages/Menu/Menu"));
const PaymentDash = lazy(() => import("../pages/Payment/Payment"));
const QRManagement = lazy(() => import("../pages/QRManagement/QRManagement"));
const Reviews = lazy(() => import("../pages/Reviews/Reviews"));
const Settings = lazy(() => import("../pages/Settings/Settings"));
const Support = lazy(() => import("../pages/Support/Support"));
const Routes = () => {
  const {token } = useSelector((state:any)=>state.auth)
  console.log(token)
  return useRoutes([
    {
      path: '/SignUp',
      element: <SignUp />
    },
    {
      path: '/',
      element: <Login />
    },
    
    {
      path: '/splash/:id',
      element: <Splash />
    },
    {
      path: '/waiterOrder',
      element: <WaiterOerderPlace />
    },
    {
      path: '/callWaiterFor',
      element: <CallWaiterFor />
    },
    {
      path: '/cutlary',
      element: <Cutlary />
    },
    {
      path: '/DetailMenu',
      element: <DetailMenu />
    },
    {
      path: '/Search',
      element: <SearchMenu />
    },
    {
      path: '/Description',
      element: <DescriptionMenu />
    },
    {
      path: '/cart',
      element: <CartScreen />
    },
    {
      path: '/payment',
      element: <PaymentScreen />
    },
    {
      path: '/cashPayment',
      element: <CashPayment />
    },
    
    {
      element: (
          <Suspense fallback={""}>
            {
              token?
              <DashboardLayout>
              <Outlet />
        </DashboardLayout>
              :
              <Navigate to={"/"} replace={true}/>
            }
          </Suspense>
      ),
      children: [
        { path: "Dashboard",element: <Dashboard />, index: true },
        { path: "Analytics",element: <Analytics /> },
        { path: "Orders",element: <Order /> },
        { path: "Menu",element: <Menu /> },
        { path: "Payments",element: <PaymentDash /> },
        { path: "QR_Managment",element: <QRManagement /> },
        { path: "Reviews",element: <Reviews /> },
        { path: "Settings",element: <Settings /> },
        { path: "Support",element: <Support /> },
      ],
    },
    
  ]);
};

export default Routes;
