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
import { layoutTypes } from "../navigationStyle";

const LayoutTypes = () => {
  const { updateLayoutType } = useLayoutActionsContext();
  const { layoutType } = useLayoutContext();

  const onLayoutChange = (layoutType) => {
    updateLayoutType(layoutType);
  };
  return (
    <CustomizerItemWrapper pb={1}>
      <Box component="h4" sx={{ mb: 3 }}>
        {/* <IntlMessages id="customizer.layoutTypes" /> */}
        Layout Types
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
        {layoutTypes.map((layout) => {
          return (
            <Box
              sx={{
                paddingLeft: 1.5,
                paddingRight: 1.5,
                minWidth: 84,
                maxHeight: 48,
              }}
              key={layout.id}
            >
              <Tooltip title={layout.alias} arrow placement="bottom">
                <Box
                  sx={{
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => onLayoutChange(layout.alias)}
                >
                  <img src={layout.image} alt="nav" />
                  {layoutType === layout.alias ? <AppSelectedIcon /> : null}
                </Box>
              </Tooltip>
            </Box>
          );
        })}
      </Box>
    </CustomizerItemWrapper>
  );
};

export default LayoutTypes;
