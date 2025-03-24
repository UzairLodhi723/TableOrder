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
} from "@mui/material";
import { ViewBack } from "../../Assets/Icons/DashboardIcons";
import {QRCodeSVG} from 'qrcode.react';
import { useRef } from "react";

interface ORprops {
  setOpen: () => void;
  data?: any;
}

const ViewQRDetails: React.FC<ORprops> = ({ data, setOpen }) => {
  const handleClose = () => setOpen();
  const qrRef = useRef<SVGSVGElement>(null);
  const handleDownload = () => {
    if (qrRef.current) {
      // Create a new canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      const svg = new XMLSerializer().serializeToString(qrRef.current);
      const img = new Image();

      img.onload = () => {
        canvas.width = qrRef.current?.clientWidth || 256;
        canvas.height = qrRef.current?.clientHeight || 256;

        context?.clearRect(0, 0, canvas.width, canvas.height);
        context?.drawImage(img, 0, 0, canvas.width, canvas.height);

        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qrcode.png';
        link.click();
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(svg);
    }
  };
   const userId = `http://192.168.18.203:3000/splash/${data.table_no}`

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
      {/* Header */}
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

      {/* Table */}
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
                <strong>QR Code ID</strong>
              </TableCell>
              <TableCell>
                <strong>Table No</strong>
              </TableCell>
              <TableCell>
                <strong>Date Created</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{`#${data.uuid.slice(0,4)}`}</TableCell>
              <TableCell>Table No {data.table_no}</TableCell>
              <TableCell>  {data?.created_At ? new Date(data.created_At).toLocaleDateString('en-GB'): '-'}</TableCell>

              <TableCell sx={{ py: 0.8, color: "grey" }}>
                <Chip
                  label={data?.status}
                  sx={{
                    backgroundColor:
                      data?.status !== "Inactive" ? "#a67c00" : "#DDCD9F",
                    color: data?.status !== "Inactive" ? "#fff" : "#000",
                    fontWeight: 400,
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* QR Code */}
      <Box display="flex" justifyContent="center" mb={3}>

        {/* <Avatar src={data.QR} alt="QR" sx={{width:250, height:250, borderRadius:1}}/> */}
        <QRCodeSVG value={userId}  style={{height:250, width:250}} ref={qrRef}/>
      </Box>

      {/* Download Button */}
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          sx={{
            bgcolor: "#a67c00",
            color: "#fff",
            borderRadius: 1,
            px: 6,
            py: 1.5,
            "&:hover": { bgcolor: "#D4AF37 " },
          }}
          onClick={handleDownload}
        >
          Download
        </Button>
      </Box>
    </Box>
  );
};

export default ViewQRDetails;
