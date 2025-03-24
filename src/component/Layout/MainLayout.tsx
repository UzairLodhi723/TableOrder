import type { Theme, SxProps, CSSObject } from "@mui/material/styles";
import { Box } from "@mui/material";
import { layoutClasses } from "../../utils/exportes";
import { useTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { baseVars } from '../../utils/Config/LayoutConfig';

interface LayoutSectionProps {
  sx?: SxProps<Theme>;
  cssVars?: CSSObject;
  children?: React.ReactNode;
  footerSection?: React.ReactNode;
  headerSection?: React.ReactNode;
  sidebarSection?: React.ReactNode;
}

export const LayoutSection: React.FC<LayoutSectionProps> = ({
  sx,
  cssVars,
  children,
  footerSection,
  headerSection,
  sidebarSection,
}) => {
    const theme = useTheme();

    const inputGlobalStyles = (
      <GlobalStyles
        styles={{
          body: {
            ...baseVars(theme),
            ...cssVars,
          },
        }}
      />
    );
  return (
    <>
    {inputGlobalStyles}
    <Box id="root__layout" className={layoutClasses.root} sx={sx }>
      {sidebarSection}
      <Box
        display="flex"
        flex="1 1 auto"
        flexDirection="column"
        className={layoutClasses.hasSidebar}
      >
        {headerSection}
        {children}
        {footerSection}
      </Box>
    </Box>
    </>
  );
};
