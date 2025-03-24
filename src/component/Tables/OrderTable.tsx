import {
  Box,
  Button,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OrderDetails from "../../pages/Order/OrderDetails";
import DateRangePicker from "../DateRange/DateRangePicker";
import { format } from 'date-fns';
interface OrderProps {
  orderhead?: string[];
  order?: any[];
}
const OrderTable: React.FC<OrderProps> = ({ orderhead, order }) => {
  const [orders, setorders] = useState(order);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [rowPerPage, setRowPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [ShowSubMenu, setShowSubMenu] = useState(false);
  const [ShowDetailMenu, setShowDetailMenu] = useState(false);
  const [filterData, setFilterData] = useState<any[]>([]);
  const [openRange, setOpenRange] = useState<boolean>(false);
  const {pathname} = useLocation()

  useEffect(() => {
    if (pathname==="/Orders") {
      const filteredOrders = orders?.filter((order) =>
        order?.name.includes(search)
      ) || [];
      setFilterData(filteredOrders);
    } else {
      const filteredOrders = orders?.filter((order) =>
        order?.id.includes(search)
      ) || [];
      setFilterData(filteredOrders);
    }
  }, [search, orders]);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    orderId: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(orderId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleChanegStatus = (status: string) => {
    const updatedOrders = orders?.map((order) => {
      if (order.id === selectedOrder?.id) {
        return { ...order, status: status };
      }
      return order;
    }
    );
    setorders(updatedOrders);
    handleCloseMenu();
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  useEffect(() => {
    handleDateApply();
  }, [startDate]);
  
  const handleDateSelect = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    console.log(`Selected Start Date: ${format(start, 'yyyy-MM-dd')}`);
    console.log(`Selected End Date: ${format(end, 'yyyy-MM-dd')}`);
  }
  
  const handleDateApply = () => {
    if (startDate && endDate) {
      const filteredData = orders?.filter((order) => {
        const orderDate = new Date(order?.date);
        return orderDate >= startDate && orderDate <= endDate;
      }) ?? [];
  
      setFilterData(filteredData);
    }
  };
  return (
    <Box>
      <Box
        sx={{
          display:{xs:"block",md:"flex"},
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ece2c7",
              color: "#000",
              fontWeight: 400,
              textTransform: "none",
              borderRadius: "20px",
              paddingX: 2,
              border: "1px solid",
              borderColor: "#000",
            }}
          >
            Newest
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#d8d8d8",
              color: "grey",
              textTransform: "none",
              borderRadius: "20px",
              paddingX: 2,
            }}
            onClick={() => setRowPerPage(orders?orders?.length -1:5)}
          >
            All
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 1, position:"relative" }}>
          <Button
            startIcon={<FilterListIcon />}
            sx={{
              borderColor: "#d8d8d8",
              color: "grey",
              textTransform: "none",
              borderRadius: 1,
              paddingX: 2,
              border: "1px solid #d8d8d8",
            }}
            onClick={() => setOpenRange(!openRange)}
          >
            Filter
          </Button>
          {
        openRange &&
        <Box sx={{position: 'absolute', left:0, top:50, zIndex: 10,}}>
          <DateRangePicker onDateSelect={handleDateSelect}  close={() => setOpenRange(!openRange)}/>
        </Box>
      }
          <TextField
            fullWidth
            type="number"
            placeholder={pathname==="/Orders"?"Search by table number":"Search by Order ID"}
            variant="outlined"
            size="small"
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              minWidth: 270,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      {filterData.length > 0 ? (
        <TableContainer
          sx={{ border: " 1px solid rgba(232, 241, 253, 1)", borderRadius: 1 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {orderhead?.map((item, index) => {
                  return (
                    <TableCell
                      key={index}
                      sx={{
                        color: "grey",
                        fontSize: 12,
                        fontWeight: 400,
                        bgcolor: "#F8F9FC",
                        py: 1,
                      }}
                    >
                      {item}
                    </TableCell>
                  );
                })}
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {filterData
                .slice((currentPage - 1) * rowPerPage, currentPage * rowPerPage)
                .map((order) => (
                  <TableRow
                    key={order?.id}
                    sx={{ borderBottom: "1px solid #ECECEC" }}
                  >
                    <TableCell
                      sx={{
                        color: "#4a4a4a",
                        fontWeight: "bold",
                        fontSize: 12,
                        py: 0.8,
                        m: 0,
                      }}
                    >
                      {order?.id}
                    </TableCell>
                    <TableCell sx={{ py: 0.8, color: "grey" }}>
                      {order?.name}
                    </TableCell>
                    <TableCell sx={{ py: 0.8, color: "grey" }}>
                      {order?.detail}
                    </TableCell>
                    <TableCell sx={{ py: 0.8, color: "grey" }}>
                      {order?.amount}
                    </TableCell>
                    <TableCell sx={{ py: 0.8, color: "grey" }}>
                      <Chip
                        label={order?.status}
                        sx={{
                          backgroundColor:
                            order?.status === "Ready" ? "#a67c00":order?.status === "Complete"?"#a67c00" : "#DDCD9F",
                          color: order?.status === "Ready" ? "#fff":order?.status === "Complete"?"#fff" : "#000",
                          fontWeight: 400,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 0.8 }}>
                      <IconButton onClick={(e) => handleOpenMenu(e, order)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <Typography
            variant="h4"
            fontWeight={500}
            textAlign={"center"}
            sx={{ color: "#000" }}
          >
            {" "}
            No Data Found
          </Typography>
        </Box>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            paddingTop: 0,
            backgroundColor: "#E0E0E0",
            border: "1px solid #a67c00",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          },
        }}
      >
        {
          !ShowSubMenu?
          <Box>
        <MenuItem
          onClick={() => setShowSubMenu(!ShowSubMenu)}
          sx={{
            color: "#000",
            "&:hover": { backgroundColor: "#c3ae70" },
          }}
        >
          Change Status
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu()
            setShowDetailMenu(!ShowDetailMenu)
          }}
          sx={{
            color: "#000",
            "&:hover": { backgroundColor: "#c3ae70" },
          }}
        >
          View Details
        </MenuItem>
          </Box>
        :
        <Box>
        <MenuItem
          onClick={() => handleChanegStatus(pathname==="/Orders"?"In Progress":"Pending")}
          sx={{
            color: "#000",
            "&:hover": { backgroundColor: "#c3ae70" },
          }}
          >
          {pathname==="/Orders"?"In Progress":"Pending"}
        </MenuItem>
        <MenuItem
          onClick={() => handleChanegStatus(pathname==="/Orders"?"Ready":"Complete")}
          sx={{
            color: "#000",
            "&:hover": { backgroundColor: "#c3ae70" },
          }}
          >
          {pathname==="/Orders"?"Ready":"Complete"}
        </MenuItem>
        </Box>
        }
      </Menu>
      {ShowDetailMenu && <OrderDetails data={selectedOrder} setOpen={() =>setShowDetailMenu(!ShowDetailMenu)}/>}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 3,
          gap: 2,
        }}
      >
        <Button
          disabled={currentPage > 1 ? false : true}
          startIcon={<ArrowBackIosIcon />}
          sx={{
            borderColor: "#d8d8d8",
            color: "grey",
            textTransform: "none",
            borderRadius: 1,
            paddingX: 2,
            border: "1px solid #d8d8d8",
          }}
          onClick={() => setCurrentPage((prev: number) => prev - 1)}
        >
          Previous
        </Button>
        <Pagination
          count={orders && Math.ceil(orders?.length / rowPerPage)}
          shape="rounded"
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#c1a36d !important",
              color: "#fff !important",
            },
            "& .MuiPaginationItem-root": {
              color: "#4a4a4a",
            },
          }}
          onChange={handlePageChange}
        />
        <Button
          disabled={
            orders && Math.ceil(orders.length / rowPerPage) === currentPage
              ? true
              : false
          }
          endIcon={<ArrowForwardIosIcon />}
          sx={{
            borderColor: "#d8d8d8",
            color: "grey",
            textTransform: "none",
            borderRadius: 1,
            paddingX: 2,
            border: "1px solid #d8d8d8",
          }}
          onClick={() => setCurrentPage((prev: number) => prev + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default OrderTable;
