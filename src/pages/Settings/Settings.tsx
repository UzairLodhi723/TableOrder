import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Avatar,
  Button,
  TextField,
  Typography,
  Tab,
  Tabs,
  TextareaAutosize,
} from "@mui/material";
import UserAvatar from "../../component/UserAvatar/UserAvatar";
import { Images_URL, useGetUserQuery, useUpdateUserMutation, useUploadAvatarMutation } from "../../store/rtk";
import { errorHandler } from "../../utils/helper/errorHandler";
import { toast } from "react-toastify";
const dummy = require("../../Assets/Images/dumySettings.png");

const Settings = () => {
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState<any>({
    fullName: "",
    email: "",
    username: "",
    phone: "",
    personalInfo: "",

  });
  const [userID,setUserId] = useState<any>(null)
  const [avatar,setAvatar] = useState<any>(null)
  const [Image, setImage] = useState<any>(null);
  const [files, setFiles] = useState(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    setFiles(file)
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e:any) {
        setImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      handleAvatar(e)
  };
}
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };

 

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      username: "",
      phone: "",
      personalInfo: "",
    });
  };
  const {data} = useGetUserQuery(undefined,{"refetchOnFocus":true,"refetchOnReconnect":true,"refetchOnMountOrArgChange":true})
  const [udpateUser,{isLoading}] = useUpdateUserMutation()
  const [uploadAvatar] = useUploadAvatarMutation()
  useEffect(()=>{
    if(data && data.user){
      setUserId(data?.user?.uuid)
      setFormData({
        fullName: data.user.name || "",  
        email: data.user.email || "",
        username:data.user.usertype || "", 
        phone: data.user.phonenumber || "",
        personalInfo: data.user.personal_info || "",
      });
      setAvatar(data.user.avatar || null)
    }
  },[data])
  const handleUpdateApi=async()=>{
    try{
      const payload = {
        name:formData.name,
        personal_info:formData.personalInfo,
        phonenumber:formData.phone,
        avatar:avatar
      }
      const res = await udpateUser(payload).unwrap()
      if(res.user){

        toast("User update successfully.")
      }
    }catch(error){
      errorHandler(error)
    }
  }
  const handleAvatar=async (event:any)=>{
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      try {
        const response = await uploadAvatar(formData).unwrap() as any
        if(response && response?.status === "success"){
          setAvatar(response.image)
        }
      } catch (error) {
        errorHandler(error)
      }
  }
  const userimage = Images_URL+"avatar/"+userID+"/"+avatar
  return (
    <Box sx={{ padding: 2, bgcolor: "#fff" }}>
      <Box display={"flex"} justifyContent={"space-between"} mx={1}>
        <Typography variant="h5" color="rgba(70, 66, 85, 1)">
          Settings
        </Typography>
        <UserAvatar />
      </Box>
      <Box
        sx={{
          width: "100%",
          p: 3,
          bgcolor: "#fafafa",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        {/* Tabs */}
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
        >
          <Tab label="Account Setting" sx={{ fontWeight: "bold" }} />
        </Tabs>

        {/* Profile Picture */}
        <Box sx={{ gap: 2, mb: 4 }}>
          <Typography sx={{ color: "grey.700", fontSize:12 }}>Your Profile Picture</Typography>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <Avatar
            src={avatar?userimage:Image?Image:dummy}
            sx={{ width: 100, height: 100, bgcolor: "#e0e0e0", borderRadius: 1 }}
            onClick={handleClick}
          />
        </Box>

        {/* Form Inputs */}
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "1fr 1fr",
            mb: 3,
          }}
        >
          {/* Full Name */}
          <Box>
            <Typography color="text" variant="body2" fontSize={12} ml={0.2}>
              Full name
            </Typography>
            <TextField
              fullWidth
              sx={{ bgcolor: "#EBEBEB", borderRadius: 1 }}
              name="fullName"
              placeholder="Please enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Email */}
          <Box>
            <Typography color="text" variant="body2" fontSize={12} ml={0.2}>
              Email
            </Typography>
            <TextField
            disabled
              fullWidth
              name="email"
              sx={{ bgcolor: "#EBEBEB", borderRadius: 1 }}
              placeholder="Please enter your email"
              value={formData.email}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Username */}
          <Box>
            <Typography color="text" variant="body2" fontSize={12} ml={0.2}>
              User Type
            </Typography>
            <TextField
              disabled
              fullWidth
              name="username"
              sx={{ bgcolor: "#EBEBEB", borderRadius: 1 }}
              placeholder="Please enter your username"
              value={formData.username}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Phone Number */}
          <Box>
            <Typography color="text" variant="body2" fontSize={12} ml={0.2}>
              Phone number
            </Typography>
            <TextField
              fullWidth
              name="phone"
              sx={{ bgcolor: "#EBEBEB", borderRadius: 1 }}
              placeholder="Please enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>+1</Typography>,
              }}
            />
          </Box>
        </Box>

        {/* Personal Information */}
        <Box sx={{ mb: 4 }}>
          <Typography color="text" variant="body2" fontSize={12} ml={0.2}>
            Personal Information
          </Typography>
          <TextareaAutosize
            name="personalInfo"
            minRows={4}
            placeholder="Write if you have any medical condition.."
            value={formData.personalInfo}
            onChange={handleInputChange}
            style={{
              backgroundColor: "#EBEBEB", borderRadius: 1,
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              fontFamily: "inherit",
              fontSize: "16px",
            }}
          />
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            onClick={handleUpdateApi}
            sx={{
              bgcolor: "#946c17",
              color: "white",
              "&:hover": { bgcolor: "#7a5612" },
              padding: "10px 24px",
              borderRadius: 1,
            }}
          >
            Update Profile
          </Button>
          <Button
            onClick={handleReset}
            sx={{
              // border: "1px solid #ccc",
              color: "#333",
              padding: "10px 24px",
              borderRadius: 2,
              fontWeight:500
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
