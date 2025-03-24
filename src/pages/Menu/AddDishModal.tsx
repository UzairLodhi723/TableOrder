import { useEffect, useRef, useState } from "react";
import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  Avatar,
} from "@mui/material";
// import { categories } from "../../utils/_mock";
import { Images_URL, useAddDishMutation, useUpdateDishMutation, useUploadDishImageMutation } from "../../store/rtk";
import { errorHandler } from "../../utils/helper/errorHandler";
import { ShowToast } from "../../component/ShowToast";

interface AddDishModalProps {
  open: boolean;
  onClose: () => void;
  data?:any
  categories?:any
}

const AddDishModal: React.FC<AddDishModalProps> = ({ open, onClose, data, categories }) => {
  console.log(data,"dish data")
  const [uploadImage, { isLoading:isUploading, error:imageError }] = useUploadDishImageMutation();
  const [uploadDish] = useAddDishMutation();
  const [updateDish] = useUpdateDishMutation();
  const initalstate = {
    dishname: "",
    price: "",
    availabilitytime: "",
    category: "",
    tagline: "",
    description: "",
    dishimage: null,
  };
  const [formData, setFormData] = useState(initalstate);

  const [imageUrl, setImageUrl] = useState(data?data?.dishimage:"");
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() =>{
    if(data){
      setFormData(data)
    }else{
      setFormData(initalstate)
      }
  },[data])
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const name = "dishimage";
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e: any) {
        setFormData({ ...formData, [name]: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    handleChangeImage(e)
  };
  const handleChangeImage=async (event:any)=>{
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    try {
      const response = await uploadImage(formData).unwrap() as any
      if(response && response?.status === "success"){
        console.log(response,"resImage")
        setImageUrl(response?.image);
      }
    } catch (error) {
      console.error("Upload Failed", error);
      errorHandler(error)
    }
}

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async() => {
    if(imageUrl == ""){
      ShowToast("Please Add Dish Image")
      return
    }
    if (!formData.dishname) {
      ShowToast("Please enter Dish Name");
      return;
    }
    if (!formData.price) {
      ShowToast("Please enter Price");
      return;
    }
    if (!formData.availabilitytime) {
      ShowToast("Please enter Availability Time");
      return;
    }
    if (!formData.category) {
      ShowToast("Please select a Category");
      return;
    }
    if (!formData.tagline) {
      ShowToast("Please enter a Tagline");
      return;
    }
    if (!formData.description) {
      ShowToast("Please enter a Description");
      return;
    }
    const payload = {
      dishimage:imageUrl?imageUrl:data?.dishimage,
      dishname:formData.dishname,
      price:formData.price,
      availabilitytime:formData.availabilitytime,
      category:formData.category,
      tagline:formData.tagline,
      description:formData.description,
      id:data?data?.uuid:""
    }
    try {
      if(data){
        const response = await updateDish(payload).unwrap() as any
        if(response && response?.status === "success"){
          setFormData(initalstate)
          setImageUrl("")
          onClose()
          ShowToast("Dish add Sucessfully")
          console.log(response,"resImage")
        }
      }else{

        const response = await uploadDish(payload).unwrap() as any
        if(response && response?.status === "success"){
          setFormData(initalstate)
          setImageUrl("")
          onClose()
          ShowToast("Dish add Sucessfully")
          console.log(response,"resImage")
        }
      }
    } catch (error) {
      console.error("Upload Failed", error);
      errorHandler(error)
    }
  };
 const imageShowUrl = `${Images_URL}menu/dish/${data?.dishimage}`
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "100%", md: "50%" },
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 3,
          p: 3,
        }}
      >
        {/* Add Image */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          {formData.dishimage ? (
            <Avatar
              src={data?imageShowUrl:formData.dishimage}
              sx={{
                width: 80,
                height: 80,
                bgcolor: "#e0e0e0",
              }}
              onClick={handleClick}
            />
          ) : (
            <Avatar
              sx={{ width: 80, height: 80, bgcolor: "#e0e0e0" }}
              onClick={handleClick}
            />
          )}
          <Typography sx={{ color: "grey.900", fontWeight: "bold" }}>
            Add Dish Image
          </Typography>
        </Box>

        {/* Form Inputs */}
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr 1fr" }}>
          {/* Dish Name */}
          <Box>
            <Typography sx={{ fontWeight: 500, mb: 1 }}>Dish Name</Typography>
            <TextField
              fullWidth
              placeholder="Enter dish name"
              name="dishname"
              value={formData.dishname}
              onChange={handleInputChange}
            />
          </Box>

          {/* Price */}
          <Box>
            <Typography sx={{ fontWeight: 500, mb: 1 }}>Price</Typography>
            <TextField
              fullWidth
              placeholder="Enter dish price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </Box>

          {/* Availability Time */}
          <Box>
            <Typography sx={{ fontWeight: 500, mb: 1 }}>
              Availability Time
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter dish availability time"
              name="availabilitytime"
              value={formData.availabilitytime}
              onChange={handleInputChange}
            />
          </Box>

          {/* Category */}
          <Box>
            <Typography sx={{ fontWeight: 500, mb: 1 }}>Category</Typography>
            <FormControl fullWidth>
              <Select
                value={formData.category}
                name="category"
                onChange={(e: any) => handleInputChange(e)}
              >
                {categories &&
                  categories?.map((item:any, index:number) => {
                    return (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Box>
          {/* Tagline */}
          <Box>
            <Typography sx={{ fontWeight: 500, mb: 1 }}>Tagline</Typography>
            <TextField
              fullWidth
              placeholder="Enter dish Tagline"
              name="tagline"
              value={formData.tagline}
              onChange={handleInputChange}
            />
          </Box>
          {/* Description */}
          <Box>
            <Typography sx={{ fontWeight: 500, mb: 1 }}>Description</Typography>
            <TextField
              multiline
              maxRows={5}
              fullWidth
              placeholder="Enter dish Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Box>
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 3,
          }}
        >
          <Button
            onClick={onClose}
            sx={{ border: "1px solid #ccc", px: 5, py: 1 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{
              px: 5,
              py: 1,
              bgcolor: "#946c17",
              color: "white",
              "&:hover": { bgcolor: "#7a5612" },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddDishModal;
