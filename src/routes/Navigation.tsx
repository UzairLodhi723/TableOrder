import { SidebarAnalytics, SidebarDashboard, SidebarLogout, SidebarMenu, SidebarOrders, SidebarPayment, SidebarReview, SidebarSettings, SidebarSupport } from '../Assets/Icons/SidebarIcons';
import QrCode2Icon from '@mui/icons-material/QrCode2';

export const Navigation =[
{
    title:"Dashboard",
    path:"/Dashboard",
    icon:<SidebarDashboard/>
},
{
    title:"Orders & Customers",
},
{
    title:"Orders",
    path:"/Orders",
    icon:<SidebarOrders/>
},
{
    title:"Menu & Analytics",
},
{
    title:"Menu",
    path:"/Menu",
    icon:<SidebarMenu/>
},
{
    title:"Analytics",
    path:"/Analytics",
    icon:<SidebarAnalytics/>
},
{
    title:"Reviews",
    path:"/Reviews",
    icon:<SidebarReview/>
},
{
    title:"Payment",
    path:"/Payments",
    icon:<SidebarPayment/>
},
{
    title:"Other Menu",
},
{
    title:"Settings",
    path:"/Settings",
    icon:<SidebarSettings/>
},
{
    title:"QR Managment",
    path:"/QR_Managment",
    icon:<QrCode2Icon/>
},
{
    title:"Support",
    path:"/Support",
    icon:<SidebarSupport/>
},
{
    title:"Log Out",
    path:"/",
    icon:<SidebarLogout/>
}
]