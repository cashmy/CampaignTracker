import React from "react";
import { CustomizerItemWrapper } from "../index.style";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
// import IntlMessages from '@crema/helpers/IntlMessages';
import {
  useLayoutActionsContext,
  useLayoutContext,
} from "../../../context/AppContextProvider/LayoutContextProvider";
import AppSelectedIcon from "../../AppSelectedIcon";
import { navStyles } from "../navigationStyle";

const NavStyles = () => {
  const { updateNavStyle } = useLayoutActionsContext();
  const { navStyle } = useLayoutContext();

  const onNavStyleChange = (navStyle) => {
    updateNavStyle(navStyle);
  };

  return (
    <CustomizerItemWrapper
      sx={{
        pb: 1,
      }}
    >
      <Box component="h4" sx={{ mb: 3 }}>
        {/* <IntlMessages id="customizer.navigationStyles" /> */}
        Navigation Styles
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          mx: -1.25,
        }}
      >
        {navStyles.map((navLayout) => {
          return (
            <Box
              sx={{
                px: 1.25,
                mb: 1.25,
              }}
              key={navLayout.id}
            >
              <Tooltip title={navLayout.alias} arrow placement="top">
                <Box
                  sx={{
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => onNavStyleChange(navLayout.alias)}
                >
                  <img src={navLayout.image} alt="nav" />
                  {navStyle === navLayout.alias ? <AppSelectedIcon /> : null}
                </Box>
              </Tooltip>
            </Box>
          );
        })}
      </Box>
    </CustomizerItemWrapper>
  );
};

export default NavStyles;
