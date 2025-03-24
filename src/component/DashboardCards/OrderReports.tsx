import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
} from "@mui/material";
import { DashboardFilter } from "../../Assets/Icons/DashboardIcons";
import DateRangePicker from "../DateRange/DateRangePicker";
import { format } from 'date-fns';
import { useEffect, useState } from "react";

const orderReports = [
  {
    table: "Table no. 13",
    menu: "Chicken double patty burger",
    price: "Rs 650",
    status: "Preparing",
    date: "2025-03-01",
  },
  {
    table: "Table no. 02",
    menu: "Salted Pasta with mushroom sauce",
    price: "Rs 1040",
    status: "Completed",
    date: "2025-03-08",
  },
  {
    table: "Table no. 09",
    menu: "Beef dumpling in hot and sour soup",
    price: "Rs 1105",
    status: "Pending",
    date: "2025-03-06",
  },
  {
    table: "Table no. 05",
    menu: "Hot spicy fried rice with omelet",
    price: "Rs 435",
    status: "Completed",
    date: "2025-03-03",
  },
  {
    table: "Table no. 13",
    menu: "Chicken double patty burger",
    price: "Rs 650",
    status: "Preparing",
    date: "2021-10-10",
  },
  {
    table: "Table no. 02",
    menu: "Salted Pasta with mushroom sauce",
    price: "Rs 1040",
    status: "Completed",
    date: "2021-10-10",
  },
  {
    table: "Table no. 09",
    menu: "Beef dumpling in hot and sour soup",
    price: "Rs 1105",
    status: "Pending",
    date: "2021-10-10",
  },
  {
    table: "Table no. 05",
    menu: "Hot spicy fried rice with omelet",
    price: "Rs 435",
    status: "Completed",
    date: "2021-10-10",
  },
];

export default function OrderReport() {
const [openRange, setOpenRange] = useState<boolean>(false);
const [orderReport, setOrderReport] = useState(orderReports);
const [startDate, setStartDate] = useState<Date | null>(null);
const [endDate, setEndDate] = useState<Date | null>(null);

useEffect(() => {
  handleDateApply();
}, [startDate]);

const handleDateSelect = (start: Date, end: Date) => {
  setStartDate(start);
  setEndDate(end);
}

const handleDateApply = () => {
  if (startDate && endDate) {
    const filteredData = orderReports.filter((order) => {
      const orderDate = new Date(order.date);
      return orderDate >= startDate && orderDate <= endDate;
    });
    setOrderReport(filteredData);
  }
}
  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: 3,
        bgcolor: "#f4f4f4",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        p: 2,
        minHeight:"53vh"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // mb: 2,
        }}
      >
        <Typography variant="h6" fontSize={20} fontWeight={600}>
          Order Report
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#a67c00",
            color: "#fff",
            textTransform: "none",
            border: "1px solid rgba(0, 0, 0, 1)",
            "&:hover": { bgcolor: "#b59a4c" },
            borderRadius: 1,
            boxShadow: "none",
          }}
          onClick={() => setOpenRange(!openRange)}
          startIcon={<DashboardFilter />}
        >
          Filter Order
        </Button>
      </Box>
      {
        openRange &&
        <Box sx={{ position: 'absolute', right:10, bottom:2, zIndex: 10,}}>
          <DateRangePicker onDateSelect={handleDateSelect}  close={() => setOpenRange(!openRange)}/>
        </Box>
      }
      
      {/* Table Section */}
      <TableContainer sx={{ maxHeight: '42vh', overflow: 'auto',scrollbarWidth:"none", position:"relative" }}>
      <Table stickyHeader>
        {/* Table Head */}
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#000",
                fontSize: 14,
                p: 0,
                borderBottom: "1px solid #000",
                textAlign: "center",
              }}
            >
              Customer
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#000",
                fontSize: 14,
                p: 0,
                borderBottom: "1px solid #000",
                textAlign: "center",
              }}
            >
              Menu
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#000",
                fontSize: 14,
                p: 0,
                borderBottom: "1px solid #000",
                textAlign: "center",
              }}
            >
              Total Payment
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#000",
                fontSize: 14,
                p: 0,
                borderBottom: "1px solid #000",
                textAlign: "center",
              }}
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        {/* Table Body */}
          {orderReport?.length===0?
          <Typography variant="h6" color="text">
            No Order Found
          </Typography>
          :
        <TableBody >
          {orderReport.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                bgcolor: "#cfcfcf",
                borderRadius: 10,
              }}
            >
              <TableCell sx={{ borderBottom: "5px solid #f4f4f4" }}>
                {row.table}
              </TableCell>
              <TableCell sx={{ borderBottom: "5px solid #f4f4f4" }}>
                {row.menu}
              </TableCell>
              <TableCell sx={{ borderBottom: "5px solid #f4f4f4" }}>
                {row.price}
              </TableCell>
              <TableCell sx={{ borderBottom: "5px solid #f4f4f4" }}>
                <Box
                  sx={{
                    bgcolor: "#a67c00",
                    px: 2,
                    py: 0.5,
                    borderRadius: 3,
                    color: "#fff",
                    display: "inline-block",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  {row.status}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
}
      </Table>
      </TableContainer>
      {/* </CardContent> */}
    </Card>
  );
}
