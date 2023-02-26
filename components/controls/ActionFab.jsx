import { Fab, Tooltip } from "@mui/material";
import TextContrast from "@/../../lib/helpers/getTextContrast";

export default function ActionFab(props) {
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
        <Tooltip title={tooltipText}>
          <Fab
            sx={{ minWidth: 0, margin: 0.5, mr: 2, p:1 }}
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
          </Fab>
        </Tooltip>
      )}
      {!tooltipText && (
        <Fab
          sx={{ minWidth: 0, margin: 0.5, mr: 2, p:1 }}
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
        </Fab>
      )}
    </>
  );
}