import React from 'react'
import { Facebook, Google, Linkedin } from "../../Assets/Icons/Icons";
import { Box } from '@mui/material';


const Socials = () => {
  return (
    <Box display="flex" gap={2} mt={2}>
    <Box sx={{cursor:"pointer"}}>
    <Facebook />
    </Box>
    <Box sx={{cursor:"pointer"}}>
    <Google  />
    </Box>
    <Box sx={{cursor:"pointer"}}>
    <Linkedin  />
    </Box>
  </Box>
  )
}

export default Socials