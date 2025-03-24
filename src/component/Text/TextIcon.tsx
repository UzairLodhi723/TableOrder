import React, { ReactNode } from 'react'
import { Box, SxProps, Typography, Theme } from '@mui/material';
import { SvgIconProps } from '@mui/material';

type TextIconProps = {
  text: string;
  fontWeight?: number;
  orientation?: string;
  children?: ReactNode;
  icon: React.ReactElement<SvgIconProps>;
  iconSize?: number;
  iconSx?: SxProps<Theme>;
  textSx?: SxProps<Theme>;
  numberOfIcons?: number
};

const TextIcon:React.FC<TextIconProps> = ({icon, iconSize=16, iconSx, text, textSx, fontWeight=500, children, orientation="row", numberOfIcons=1}) => {

  const iconCustom = React.cloneElement(icon, {sx: { fontSize: iconSize, color: 'gray', ...iconSx }});
  const textCustom = React.cloneElement(<Typography>{text}</Typography>, {sx: { fontSize: 17, fontWeight:{fontWeight},  ...textSx }});

  return (
    <Box display={'flex'} alignItems={'center'} gap={1} sx={{flexDirection: orientation}}>
      <Box display={'flex'} alignItems={'end'}>
      {[...Array(numberOfIcons)].map((item, index) => (
        <Box key={index}>{iconCustom}</Box>
      ))}
      </Box>
      <Typography variant='subtitle2' sx={{ display:'flex',wordBreak:"break-all", flexDirection: orientation, textOrientation: 'elipses'}} textAlign={orientation==='row'?'left':'center'}>
        {textCustom}{children}
      </Typography>
      
    </Box>
  )
}

export default TextIcon