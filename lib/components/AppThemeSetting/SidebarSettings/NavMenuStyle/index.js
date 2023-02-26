import React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
// import IntlMessages from '@crema/helpers/IntlMessages';
import {
  useSidebarActionsContext,
  useSidebarContext,
} from "../../../../context/AppContextProvider/SidebarContextProvider";
import AppSelectedIcon from "../../../AppSelectedIcon";
import { menuStyles } from "../../navigationStyle";

const NavMenuStyle = () => {
  const { menuStyle } = useSidebarContext();

  const { updateMenuStyle } = useSidebarActionsContext();
  const onMenuStyleChange = (menuStyle) => {
    updateMenuStyle(menuStyle);
  };
  return (
    <>
      <Box component="h4" sx={{ mb: 3 }}>
        {/* <IntlMessages id="customizer.sidebarMenuStyle" /> */}
        Sidebar Menu Styles
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          marginLeft: "-10px",
          marginRight: "-10px",
        }}
      >
        {menuStyles.map((menu) => {
          return (
            <Box
              sx={{
                paddingLeft: 1.5,
                paddingRight: 1.5,
                marginBottom: 5,
              }}
              key={menu.id}
            >
              <Tooltip title={menu.alias} arrow placement="top">
                <Box
                  sx={{
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => onMenuStyleChange(menu.alias)}
                >
                  <img src={menu.image} alt="nav" />
                  {menuStyle === menu.alias ? <AppSelectedIcon /> : null}
                </Box>
              </Tooltip>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default NavMenuStyle;
