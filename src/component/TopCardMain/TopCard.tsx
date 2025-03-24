import { Card, Typography, Box } from "@mui/material";
import React from "react";
interface CardProps {
  cardName: string;
  cardNumber: string;
  cardIcon: any;
}
const TopCard: React.FC<CardProps> = ({ cardName, cardNumber, cardIcon }) => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        paddingX: 2,
        paddingY: 3,
        backgroundColor:"background"
      }}
    >
      <Box>
        <Typography
          variant="body2"
          color="text.primary"
          paddingBottom={1}
          fontWeight={600}
        >
          {cardName}
        </Typography>
        <Typography variant="h6" color="text.disabled">
          {cardNumber}
        </Typography>
      </Box>
      <Box bgcolor={"#fff1eb"} padding={1.7} borderRadius={2}>
        {cardIcon}
      </Box>
    </Card>
  );
};

export default TopCard;
