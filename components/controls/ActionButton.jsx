import React from "react";
import { Button, Tooltip, useTheme } from "@mui/material";
import TextContrast from "@/../../lib/helpers/getTextContrast";

export default function ActionButton(props) {
  const {
    color,
    children,
    onClick,
    tooltipText,
    filled = false,
    ...other
  } = props;

  return (
    <>
      {tooltipText && (
        <Tooltip title={tooltipText} placement="top">
          <Button
            sx={{ minWidth: 0, margin: 0.5, mr: 2 }}
            style={
              filled
                ? {
                    backgroundColor: color,
                    color: TextContrast.getTextContrast(color),
                  }
                : { color: color }
            }
            onClick={onClick}
            {...other}
          >
            {children}
          </Button>
        </Tooltip>
      )}
      {!tooltipText && (
        <Button
          sx={{ minWidth: 0, margin: 0.5 }}
          // style={{ color: color }}
          style={
            filled
              ? {
                  backgroundColor: color,
                  color: TextContrast.getTextContrast(color),
                }
              : { color: color }
          }
          onClick={onClick}
          {...other}
        >
          {children}
        </Button>
      )}
    </>
  );
}
