import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Typography,
} from "@mui/material";
import { ViewBack } from "../../Assets/Icons/DashboardIcons";
interface Orderprops {
  setOpen: () => void;
  data?: any;
}
const OrderDetails: React.FC<Orderprops> = ({ setOpen, data }) => {
  console.log(data,'i am data')
  const handleClose = () => setOpen();
  const pathname = window.location.pathname
  console.log(pathname,"path")
  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        width: "80%",
        height: "90vh",
        p: 4,
        position: "absolute",
        top: "8%",
        right: 10,
        overflowY: "auto",
        zIndex: 1,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        sx={{ cursor: "pointer" }}
        onClick={() => handleClose()}
      >
        <ViewBack />
      </Box>
      <Typography variant="caption" color="grey">
        Orders Details
      </Typography>
      <TableContainer
        sx={{
          border: " 1px solid rgba(232, 241, 253, 1)",
          borderRadius: 1,
          mb: 4,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {
                pathname == "/Payments" &&
              <TableCell>
                <strong>Timestamp</strong>
              </TableCell>
              }
              <TableCell>
                <strong>Order ID</strong>
              </TableCell>
              <TableCell>
                <strong>Table No</strong>
              </TableCell>
              <TableCell>
                <strong>Total Amount</strong>
              </TableCell>
              <TableCell>
                <strong>Order Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {
                pathname == "/Payments" &&
              <TableCell>{data?.date}</TableCell>
              }
              <TableCell>{data?.id}</TableCell>
              <TableCell>{data?.name}</TableCell>
              <TableCell>{data?.amount}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>{data?.status}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {
        pathname == "/Orders" &&
        <Box>
      <Typography variant="caption" color="grey">
        Items
      </Typography>
      <TableContainer
        sx={{
          border: " 1px solid rgba(232, 241, 253, 1)",
          borderRadius: 1,
          mb: 4,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Items</strong>
              </TableCell>
              <TableCell>
                <strong>Amount</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{data?.detail}</TableCell>
              <TableCell>{data?.dishAmount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="caption" color="grey">
        Add-Ons
      </Typography>
      <TableContainer
        sx={{
          border: " 1px solid rgba(232, 241, 253, 1)",
          borderRadius: 1,
          mb: 4,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Add-on Items</strong>
              </TableCell>
              <TableCell>
                <strong>Amount</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {data?.addOns?.length>0 &&
              data?.addOns.map((item:any) =>{
                return (
            <TableRow>
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>{item?.price}</TableCell>
            </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
        </Box>
      }
    </Box>
  );
};

export default OrderDetails;
