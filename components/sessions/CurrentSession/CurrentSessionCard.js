/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-31 16:11:03
 * @modify date 2023-04-02 16:51:52
 * @desc [description]
 */

//#region //* Imports
import PropTypes from "prop-types";
// * Mui Components
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { blue, green } from "@mui/material/colors";
// * Icons
import BadgeIcon from "@mui/icons-material/Badge"; // * For the name
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
// * Local Components
import ActionIconButton from "components/controls/ActionIconButton";
import AppScrollbar from "lib/components/AppScrollbar";
// * Services
//#endregion

//#region //* Styles
const BackDrop = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 10,
}));
//#endregion

const CurrentSessionCard = (props) => {
  //#region //* State & local variables
  const { record } = props;
  //#endregion

  //#region //* Event Handlers
  const handleEdit = () => {
    alert("Edit");
  };
  //#endregion

  return (
    <>
      <BackDrop>
        {/* //^ Header */}
        <Box
          sx={{
            mt: 1,
            mb: 3,
            px: 3,
            pb: 2,
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          {/* //& Title */}
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Current Session
            </Typography>
          </Grid>

          {/* //& Edit Button */}
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            <ActionIconButton
              filled={true}
              color={green[500]}
              tooltipText="Edit Current Session"
              onClick={handleEdit}
            >
              <EditIcon sx={{ fontSize: 20 }} />
            </ActionIconButton>
          </Grid>
        </Box>

        {/* //^ Body */}
        <Grid
          container 
          sx={{ mb: 3, display: "flex", alignItems: "center" }}
        >
          {/* //& Session Name*/}
          <Grid item xs={2} sx={{ textAlign: "center" }}>
            <BadgeIcon
              sx={{
                fontSize: 24,
                color: blue[500],
              }}
            />
          </Grid>
          <Grid item xs={9} sx={{ ml: 3.5, mb: 1 }}>
            {record.name ? (
              record.name
            ) : (
              <Typography
                variant="h6"
                sx={{
                  color: "grey",
                  fontStyle: record.name ? "normal" : "italic",
                }}
              >
                Session Name
              </Typography>
            )}
          </Grid>

          {/* //& Record Description (scrollable) */}
          <Grid item xs={2} sx={{ textAlign: "center" }}>
            <DescriptionIcon
              sx={{
                fontSize: 24,
                color: (theme) => theme.palette.text.secondary,
              }}
            />

          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              mt: 2, mb: 3,
              p: 3,
              minHeight: 85,
              maxHeight: 85,
              borderColor: "grey !important",
              borderRadius: 3,
              border: 1,
            }}
          >
            <AppScrollbar>
              <Typography gutterBottom>{record.description} </Typography>
            </AppScrollbar>
          </Grid>
        </Grid>
      </BackDrop>
    </>
  );
};

export default CurrentSessionCard;

CurrentSessionCard.propTypes = {
  record: PropTypes.object.isRequired,
};
