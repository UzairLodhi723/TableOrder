import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";

interface TypographyWrapperProps extends TypographyProps {
    text: string;
    color?: string; 
}


const TypographyWrapper: React.FC<TypographyWrapperProps> = ({
    text,
    color = "inherit", 
    variant = "body1", 
    ...props
}) => {
    return (
        <Typography
            variant={variant}
            color={color}
            {...props} 
        >
            {text}
        </Typography>
    );
};

export default TypographyWrapper;
