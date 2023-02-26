import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ColorLensIcon from "@mui/icons-material/ColorLens";

// import IntlMessages from '@/../../lib/helpers/IntlMessages';
import { LayoutType } from "@/../../lib/constants/AppEnums";
import { useLayoutContext } from '@/../../lib/context/AppContextProvider/LayoutContextProvider';
import AppScrollbar from "../AppScrollbar";
// import { orange } from "@mui/material/colors";
import ThemeColors from './ThemeColors';
import ThemeFooter from './ThemeFooter';
import ThemeModes from './ThemeModes';
// import ThemeDirection from './ThemeDirection';
import SidebarSettings from './SidebarSettings';
import NavStyles from './NavStyles';
import LayoutTypes from './LayoutTypes';
import ThemeHeader from './ThemeHeader';

const orange = {
  50: '#fff3e0',
  100: '#ffe0b2',
  200: '#ffcc80',
  300: '#ffb74d',
  400: '#ffa726',
  500: '#ff9800',
  600: '#fb8c00',
  700: '#f57c00',
  800: '#ef6c00',
  900: '#e65100',
  A100: '#ffd180',
  A200: '#ffab40',
  A400: '#ff9100',
  A700: '#ff6d00'
};

const AppThemeSetting = () => {
  const [isSettingOpen, setSettingOpen] = useState(false);
  const [isColorSettingOpen, setColorSettingOpen] = useState(false);
  const { layoutType } = useLayoutContext();
  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        top: { xs: 85, xl: 125 },
        zIndex: 1110,
      }}
      className="customizerOption"
    >
      <Box
        sx={{
          borderRadius: "30px 0 0 30px",
          mb: 1,
          backgroundColor: orange[500],
          "&:hover": {
            backgroundColor: orange[700],
          },
          "& button": {
            borderRadius: "30px 0 0 30px",

            "&:focus": {
              borderRadius: "30px 0 0 30px",
            },
          },
        }}
      >
        <IconButton onClick={() => setSettingOpen(!isSettingOpen)}>
          <SettingsOutlinedIcon
            sx={{
              animation: "rotation 2s infinite linear",
              color: "white",
            }}
          />
        </IconButton>
      </Box>

      <Box
        sx={{
          borderRadius: "30px 0 0 30px",
          backgroundColor: orange[500],
          "&:hover": {
            backgroundColor: orange[700],
          },
          "& button": {
            borderRadius: "30px 0 0 30px",

            "&:focus": {
              borderRadius: "30px 0 0 30px",
            },
          },
        }}
      >
        <IconButton onClick={() => setColorSettingOpen(!isSettingOpen)}>
          <ColorLensIcon
            sx={{
              color: "white",
            }}
          />
        </IconButton>
      </Box>
      <Drawer
        anchor="right"
        sx={{
          "& .MuiBackdrop-root": {
            background: "transparent",
          },
        }}
        className={layoutType === LayoutType.BOXED ? 'boxed-drawer' : ''}
        open={isSettingOpen}
        onClose={() => setSettingOpen(false)}
      >
        <AppScrollbar
          sx={{
            width: { xs: 300, md: 360, xl: 400 },
          }}
        >
          <Box
            sx={{
              padding: { xs: "20px", xl: "28px 22px" },
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box component="h3" mb={0.5} fontSize={18}>
              {/* <IntlMessages id="customizer.customiseSidebar" /> */}
              Customize the sidebar
            </Box>
            <Box component="p" mb={0} color="text.secondary">
              {/* <IntlMessages id="customizer.customiseSidebarText" /> */}
              Customize your sidebar with these options.
            </Box>
          </Box>
          <Box
            sx={{
              padding: { xs: "20px", xl: "28px 22px" },
            }}
          >
            <NavStyles />
            <LayoutTypes />
            {/* <ThemeDirection /> */}
            <ThemeHeader />
            <ThemeFooter />
            <SidebarSettings />
            <br/>
            Items yet to add ... <br/><br/>
            Theme Direction (RTL) <br/><br/>
          </Box>
        </AppScrollbar>
      </Drawer>
      <Drawer
        anchor="right"
        open={isColorSettingOpen}
        onClose={() => setColorSettingOpen(false)}
        sx={{
          "& .MuiBackdrop-root": {
            background: "transparent",
          },
        }}
        className={layoutType === LayoutType.BOXED ? "boxed-drawer" : ""}
      >
        <AppScrollbar
          sx={{
            width: { xs: 300, md: 360, xl: 400 },
          }}
        >
          <Box
            sx={{
              padding: { xs: "20px", xl: "28px 22px" },
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box component="h3" mb={0.5} fontSize={18}>
              {/* <IntlMessages id="customizer.customiseTheme" /> */}
              Customize the theme
            </Box>
            <Box component="p" mb={0} color="text.secondary">
              {/* <IntlMessages id="customizer.customiseText" /> */}
              Customize your theme with these options.
            </Box>
          </Box>
          <Box
            sx={{
              padding: { xs: "20px", xl: "28px 22px" },
            }}
          >
            <ThemeModes />
            <ThemeColors />
          </Box>
        </AppScrollbar>
      </Drawer>
    </Box>
  );
};

export default AppThemeSetting;