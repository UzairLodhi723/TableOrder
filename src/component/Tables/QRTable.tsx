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
  Avatar,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import ViewQRDetails from "../../pages/QRManagement/ViewQRDetails";
import CreateQR from "../../pages/QRManagement/CreateQR";
import {
  useDeleteQRCodeMutation,
  useGetAllQRCodeQuery,
  useUpdateQRCodeMutation,
} from "../../store/rtk";
import { ShowToast } from "../ShowToast";
import { errorHandler } from "../../utils/helper/errorHandler";
const QRImage = require("../../Assets/Images/QRImage.jpeg");
interface QRProps {
  orderhead?: string[];
}
const QRTable: React.FC<QRProps> = ({ orderhead }) => {
  const { data: AllQR } = useGetAllQRCodeQuery(undefined, {
    refetchOnFocus: true,
  });
  console.log(AllQR,"allQR")
  const [deleteQRCode] = useDeleteQRCodeMutation();
  const [updateQRCode] = useUpdateQRCodeMutation();
  const [data, setdata] = useState<any[] | []>([]);
  console.log(data);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [rowPerPage, setRowPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [filterData, setFilterData] = useState<any | []>([]);
  const [ViewDetails, setViewDetails] = useState<boolean>(false);
  const [ShowCreateQR, setShowCreateQR] = useState<boolean>(false);

  useEffect(() => {
    if (AllQR) {
      setdata(AllQR?.qrcode);
    }
    if (data) {
      const filtereddata =
        data?.length > 0 &&
        data?.filter((order: any) => order?.table_no.includes(search));
      setFilterData(filtereddata);
    }
    setRowPerPage(5);
  }, [search, data, AllQR]);

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
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  const handleStatus = async () => {
    console.log({
      id: selectedOrder?.uuid,
      status: selectedOrder?.status =="active"?"inactive":"active",
    })
    try {
      const response = await updateQRCode({
        id: selectedOrder?.uuid,
        status: selectedOrder?.status =="active"?"inactive":"active",
      }).unwrap() as any;
      if (response && response?.status === "success") {
        ShowToast(`QRCode ${selectedOrder?.status =="active"?"Deactivated":"Activated"} Sucessfully`);
        handleCloseMenu();
      }
    } catch (error) {
      console.error("Upload Failed", error);
      errorHandler(error);
    }
  };
  const handleDelete = async () => {
    console.log({
      id: selectedOrder?.uuid,
      status: selectedOrder?.status =="active"?"inactive":"active",
    })
    try {
      const response = await deleteQRCode({
        id: selectedOrder?.uuid
      }).unwrap() as any;
      if (response && response?.status === "success") {
        ShowToast(`QRCode Deleted Sucessfully`);
        handleCloseMenu();
      }
    } catch (error) {
      console.error("Upload Failed", error);
      errorHandler(error);
    }
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            type="number"
            placeholder="Search by table number"
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
            onClick={() => setShowCreateQR(!ShowCreateQR)}
          >
            Create QR
          </Button>
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
                .map((item: any) => (
                  <TableRow
                    key={item?.id}
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
                      <Avatar
                        src={QRImage}
                        alt="QR Image"
                        sx={{ borderRadius: 1 }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 0.8, color: "grey" }}>
                      {`#${item?.uuid.slice(0, 4)}`}
                    </TableCell>
                    <TableCell sx={{ py: 0.8, color: "grey" }}>
                      Table No {item?.table_no}
                    </TableCell>
                    <TableCell sx={{ py: 0.8, color: "grey" }}>
                      {item?.created_At
                        ? new Date(item.created_At).toLocaleDateString("en-GB")
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ py: 0.8, color: "grey" }}>
                      <Chip
                        label={item?.status}
                        sx={{
                          backgroundColor:
                            item?.status !== "inactive" ? "#a67c00" : "#DDCD9F",
                          color: item?.status !== "inactive" ? "#fff" : "#000",
                          fontWeight: 400,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 0.8 }}>
                      <IconButton onClick={(e) => handleOpenMenu(e, item)}>
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
        <MenuItem
          onClick={() => {
            setViewDetails(true);
            handleCloseMenu();
          }}
          sx={{
            color: "#000",
            "&:hover": { backgroundColor: "#c3ae70" },
          }}
        >
          View Details
        </MenuItem>
        <MenuItem
          onClick={handleStatus}
          sx={{
            color: "#000",
            "&:hover": { backgroundColor: "#c3ae70" },
          }}
        >
          Deactivate
        </MenuItem>
        <MenuItem
          onClick={() => {
            setTimeout(() => {
              ShowToast("QRCode Regenerated Scuessfully");
              handleCloseMenu();
            }, 1000);
          }}
          sx={{
            color: "#000",
            "&:hover": { backgroundColor: "#c3ae70" },
          }}
        >
          Regenerate QR
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={{
            color: "#000",
            "&:hover": { backgroundColor: "#c3ae70" },
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      {ViewDetails && (
        <ViewQRDetails
          data={selectedOrder}
          setOpen={() => setViewDetails(!ViewDetails)}
        />
      )}
      {ShowCreateQR && (
        <CreateQR setOpen={() => setShowCreateQR(!ShowCreateQR)} />
      )}
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
          count={data && Math.ceil(data?.length / rowPerPage)}
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
            data && Math.ceil(data.length / rowPerPage) === currentPage
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

export default QRTable;
