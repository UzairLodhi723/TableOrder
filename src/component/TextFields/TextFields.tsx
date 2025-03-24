import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { SxProps, Theme } from "@mui/material";

interface InputFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  type?: string;
  icon?:React.ReactNode;
  sx?: SxProps<Theme>;
  error:any;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder,
  name,
  type,
  icon,
  sx={},
  error,
}) => {
  return (
    <TextField
      fullWidth
      required
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
      sx={{
        bgcolor: "#e3d6b0",
        borderRadius: 1,
        mt: 2,
        "& fieldset": { border: "none" },
        "&:hover fieldset": { border: "none" },
        "&.Mui-focused fieldset": { border: "none" },
        "& input::placeholder": { color: "black", opacity: 1 },
        ...sx
      }}
      InputProps={{
        sx: {
          "& input": {
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 100px #e3d6b0 inset",
              WebkitTextFillColor: "black",
            },
            "&:-webkit-autofill:hover": {
              WebkitBoxShadow: "0 0 0 100px #e3d6b0 inset",
            },
            "&:-webkit-autofill:focus": {
              WebkitBoxShadow: "0 0 0 100px #e3d6b0 inset",
            },
          },
        },
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
    />
  );
};

export default InputField;
