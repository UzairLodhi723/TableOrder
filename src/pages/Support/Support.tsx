import {
  Box,
  Button,
  Card,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UserAvatar from "../../component/UserAvatar/UserAvatar";
import { CardContent } from "@mui/material";

const Support = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    restaurantName: "",
    branchName: "",
    city: "",
    issueDescription: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
    // Add submit logic here
  };
  return (
    <Box sx={{ padding: 2, bgcolor: "#fff" }}>
      <Box display={"flex"} justifyContent={"space-between"} mx={1}>
        <Typography variant="h5" color="rgba(70, 66, 85, 1)">
          Support
        </Typography>
        <UserAvatar />
      </Box>
      <Typography
        variant="body1"
        fontWeight={500}
        fontStyle="italic"
        color="#000"
      >
        To address any technical issues, kindly complete the form provided
        below.
      </Typography>
      <Card
        sx={{ bgcolor: "#F3F3F3", border: " 1px solid #7F7F7F", p: 3, mt: 3 }}
      >
        <CardContent>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "1fr 1fr",
              mb: 2,
            }}
          >
            {/* Full Name */}
            <Box>
              <Typography color="text" variant="body2" fontSize={12} ml={0.2}>
                Full name
              </Typography>
              <TextField
                name="fullName"
                sx={{ bgcolor: "white", borderRadius: 1 }}
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            {/* Email */}
            <Box>
              <Typography color="text" variant="body2" fontSize={12} ml={0.2}>
                Email
              </Typography>
              <TextField
                name="email"
                sx={{ bgcolor: "white", borderRadius: 1 }}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            </Box>
          {/* Description of Issue */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 500, mb: 1 }}>
              Description of issue
            </Typography>
            <Typography variant="caption" sx={{ mb: 1, color: "#fff" }}>
              Write your issue here..
            </Typography>
            <TextareaAutosize
              name="issueDescription"
              minRows={4}
              placeholder="Write your issue here.."
              value={formData.issueDescription}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontFamily: "inherit",
                fontSize: "16px",
                backgroundColor: "#e0e0e0",
                resize: "none",
              }}
            />
          </Box>

          {/* Submit Button */}
          <Box sx={{ textAlign: "center" }}>
            <Button
              onClick={handleSubmit}
              sx={{
                bgcolor: "#946c17",
                color: "white",
                fontSize:16,
                fontWeight:400,
                px: 7,
                py: 1,
                borderRadius: 0.5,
              }}
            >
              Submit
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Support;
