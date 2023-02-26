/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-02-16 19:54:50
 * @modify date 2023-02-16 19:54:50
 * @desc [description]
 */

// #region [General imports]
import { useEffect, useState, Fragment } from "react";
import { useTheme } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import ActionButton from "./ActionButton";
import CloseIcon from "@mui/icons-material/Close";
// #endregion

export default function PageDialog(props) {
  // #region //* [Local State]
  const theme = useTheme();
  const {
    title,
    children,
    openPopup,
    setOpenPopup,
    fullWidth,
    titleColor,
    displayWidth = true,
    maxWidthSet,
    size = "md"
  } = props;
  const [maxWidth, setMaxWidth] = useState(size);
  // #endregion

  useEffect(() => {
    if (maxWidthSet) {
      setMaxWidth(maxWidthSet);
    }
  }, [maxWidth]);

  // #region //* Event Handlers
  const handleClose = () => {
    setOpenPopup(false);
  };
  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };
  // #endregion

  return (
    <Fragment>
      <Dialog
        fullWidth={fullWidth || true}
        maxWidth={maxWidth}
        open={openPopup}
        onClose={handleClose}
      >
        <DialogTitle display={"flex"}>
          <Paper
            sx={{
              padding: theme.spacing(1),
              marginRight: theme.spacing(3),
              backgroundColor: titleColor || "rgba(0, 0, 0, 0.2)",
              color: theme.palette.getContrastText(
                titleColor || "rgba(0, 0, 0, 0.2)"
              ),
              flexGrow: 1,
              mt: theme.spacing(2),
              display: "flex",
              alignItems: "center",
              borderRadius: '12px !important'
            }}
          >
            <Typography variant="h4" sx={{ ml: 2 }}>
              {title || "Dialog Title"}
            </Typography>
          </Paper>

          {displayWidth && (
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <Select
                sx={{ marginTop: theme.spacing(1) }}
                variant="outlined"
                value={maxWidth}
                label="maxWidth"
                onChange={handleMaxWidthChange}
                inputProps={{
                  name: "max-width",
                  id: "max-width",
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
          )}

          <ActionButton color="secondary" onClick={handleClose}>
            <CloseIcon />
          </ActionButton>
        </DialogTitle>

        <DialogContent dividers>{children && children}</DialogContent>
      </Dialog>
    </Fragment>
  );
}
