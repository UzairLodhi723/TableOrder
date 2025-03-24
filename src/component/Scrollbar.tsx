import { forwardRef } from 'react';
import type { Theme, SxProps } from '@mui/material/styles';
import type { Props as SimplebarProps } from 'simplebar-react';
import SimpleBar from 'simplebar-react';
import { Box } from '@mui/material';

export type ScrollbarProps = SimplebarProps & {
    sx?: SxProps<Theme>;
    children?: React.ReactNode;
    fillContent?: boolean;
    slotProps?: {
      wrapper?: SxProps<Theme>;
      contentWrapper?: SxProps<Theme>;
      content?: Partial<SxProps<Theme>>;
    };
  };

export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
    ({ slotProps, children, fillContent, sx, ...other }, ref) => (
        <Box
        component={SimpleBar}
        scrollableNodeProps={{ ref }}
        clickOnTrack={false}
        // className={scrollbarClasses.root}
        sx={{
          minWidth: 0,
          minHeight: 0,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          '& .simplebar-wrapper': slotProps?.wrapper as React.CSSProperties,
          '& .simplebar-content-wrapper': slotProps?.contentWrapper as React.CSSProperties,
          '& .simplebar-content': {
            ...(fillContent && {
              minHeight: 1,
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
            }),
            ...slotProps?.content,
          } as React.CSSProperties,
          ...sx,
        }}
        {...other}
      >
        {children}
      </Box>
  )
)
