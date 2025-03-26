import {
  Box,
  Button,
  IconButton,
  Popover,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../component/Scrollbar";
import React, { Fragment, useCallback, useState } from "react";
import { DashboardFilter } from "../../Assets/Icons/DashboardIcons";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import { Check, Delete, Edit } from "@mui/icons-material";
import { useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../store/rtk";
import { errorHandler } from "../../utils/helper/errorHandler";
import { ShowToast } from "../../component/ShowToast";
interface propsCategory {
  categorie: any[]|[];
  setCategorie: (category: string[]) => void;
}
const AddCategory: React.FC<propsCategory> = ({ categorie, setCategorie }) => {
  const [addCategory] = useAddCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );
  const [showButtons, setShowButtons] = useState({ show: false, index: 0 });
  const [updatedCategories, setupdatedCategories] = useState(
    categorie ? categorie[showButtons?.index] : ""
  );
  const [newCategory, setNewCategory] = useState("");
  const handleAddCategory = async() => {
        try {
          const response = await addCategory({categoryname:newCategory}).unwrap() as any
          if(response && response?.status === "success"){
            ShowToast("Category add sucessfully")
            setNewCategory("");
            handleClosePopover()
          }
        } catch (error) {
          console.error("Upload Failed", error);
          errorHandler(error)
        }
    setNewCategory("");
  };
  const handleDeleteCategory = async(index: number) => {
    console.log(categorie[index]?.uuid,"categorie[index]")
    try{
      const response = await deleteCategory({id:categorie[index]?.uuid}).unwrap() as any
      if(response && response?.status === "success"){
        ShowToast("Category delete sucessfully")
        handleClosePopover()
        // setCategorie(categorie.filter((_, i) => i !== index))
        }
    }catch (error) {
      console.error("Upload Failed", error);
      errorHandler(error)
    }
  };

  const handleEditCategory = async(index: number) => {
    try{
      const response = await updateCategory({id:categorie[index]?.uuid, categoryname:updatedCategories}).unwrap() as any
      if(response && response?.status === "success"){
        ShowToast("Category Updated sucessfully")
        setupdatedCategories("");
        setShowButtons({ show: false, index: 0 });
        handleClosePopover()
        }
    }catch (error) {
      console.error("Upload Failed", error);
      errorHandler(error)
    }
  };

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);
  return (
    <>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#a67c00",
          color: "#fff",
          fontSize: 10,
          py: 1,
          textTransform: "none",
          border: "1px solid rgba(0, 0, 0, 1)",
          "&:hover": { bgcolor: "#b59a4c" },
          borderRadius: 1,
        }}
        startIcon={<DashboardFilter />}
        onClick={handleOpenPopover}
      >
        Manage Categories
      </Button>
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 360,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#FFF",
              padding: 2,
              mt: 2,
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            },
          },
        }}
      >
        <Scrollbar fillContent sx={{ maxHeight: "50vh" }}>
          <Typography variant="body1" color="#000">
            Manage Categories
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <TextField
              type="text"
              placeholder={"Enter New Menu"}
              variant="outlined"
              size="small"
              onChange={(e) => setNewCategory(e.target.value)}
              sx={{
                bgcolor: "white",
                borderRadius: 1,
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#a67c00",
                color: "#fff",
                fontSize: 10,
                py: 1,
                textTransform: "none",
                border: "1px solid rgba(0, 0, 0, 1)",
                "&:hover": { bgcolor: "#b59a4c" },
                borderRadius: 1,
              }}
              onClick={handleAddCategory}
            >
              Add category
            </Button>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            px={1}
            py={2}
            borderBottom={"1px solid #000"}
          >
            <Typography variant="body2" fontWeight={"bold"} color="#000">
              Category
            </Typography>
            <Typography variant="body2" fontWeight={"bold"} color="#000">
              Action
            </Typography>
          </Box>
          {categorie?.length>0 && categorie?.map((category:any, index) => (
            <Box display={"flex"} justifyContent={"space-between"} key={index}>
              {showButtons.show && showButtons.index == index ? (
                <TextField
                  type="text"
                  value={updatedCategories}
                  placeholder={"Enter New Menu"}
                  variant="outlined"
                  size="small"
                  onChange={(e) => setupdatedCategories(e.target.value)}
                  sx={{
                    bgcolor: "white",
                    borderRadius: 1,
                  }}
                />
              ) : (
                <Typography>{category?.name}</Typography>
              )}
              <Box>
                {showButtons.show && showButtons.index == index ? (
                  <IconButton
                    onClick={() => handleEditCategory(index)}
                    size="small"
                  >
                    <Check sx={{ color: "green" }} />
                  </IconButton>
                ) : (
                  <Fragment>
                    <IconButton
                      onClick={() =>{
                        setShowButtons({ show: true, index: index })
                        setupdatedCategories(category?.name)
                      }
                      }
                      size="small"
                    >
                      <Edit sx={{ color: "#000" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteCategory(index)}
                      size="small"
                    >
                      <Delete sx={{ color: "red" }} />
                    </IconButton>
                  </Fragment>
                )}
              </Box>
            </Box>
          ))}
        </Scrollbar>
      </Popover>
    </>
  );
};

export default AddCategory;
