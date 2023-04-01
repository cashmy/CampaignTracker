/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-31 16:11:03
 * @modify date 2023-03-31 21:29:03
 * @desc [description]
 */

//#region //* Imports
import PropTypes from "prop-types";
import moment from "moment";
// * Mui Components
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blue, green, orange, red } from "@mui/material/colors";
// * Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
// * Local Components
import ActionIconButton from "components/controls/ActionIconButton";
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

const ScheduleCard = (props) => {
  //#region //* State & local variables
  const { record } = props;
  //#endregion

  //#region //* Event Handlers
  const handleEdit = () => {
    alert("Edit");
  };
  const handleNotify = () => {
    alert("Notify-Send Email or Discord");
  };
  const dowText = (dow) => {
    switch (dow) {
      case 1:
        return "Sunday";
      case 2:
        return "Monday";
      case 3:
        return "Tuesday";
      case 4:
        return "Wednesday";
      case 5:
        return "Thursday";
      case 6:
        return "Friday";
      case 7:
        return "Saturday";
      default:
        return "Not set";
    }
  };
  const notifiedText = (notified) => {
    if (notified) {
      return "Yes";
    } else {
      return "No";
    }
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
              Next Meeting
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
              tooltipText="Add Player"
              onClick={handleEdit}
            >
              <EditIcon sx={{ fontSize: 20 }} />
            </ActionIconButton>
          </Grid>
        </Box>

        {/* //^ Body */}
        <Grid
          container
          sx={{ ml: 3, mb: 3, display: "flex", alignItems: "center" }}
        >
          {/* //& Scheduled Date */}
          <Grid item xs={2} sx={{ textAlign: "center" }}>
            <CalendarMonthIcon
              sx={{
                fontSize: 24,
                color: blue[500],
              }}
            />
          </Grid>
          <Grid item xs={9} sx={{ ml: 3.5 }}>
            {record.sessionDate ? (
              moment(record.sessionDate).format("MM/DD/YYYY (ddd)")
            ) : (
              <Typography
                variant="h6"
                sx={{
                  color: "grey",
                  fontStyle: record.sessionDate ? "normal" : "italic",
                }}
              >
                Not scheduled
              </Typography>
            )}
          </Grid>

          {/* //& Scheduled StarTime */}
          <Grid item xs={2} sx={{ textAlign: "center" }}>
            <AccessTimeIcon
              sx={{
                fontSize: 24,
                color: (theme) => theme.palette.text.secondary,
              }}
            />
          </Grid>
          <Grid item xs={9} sx={{ ml: 3.5 }}>
            {record.scheduledStartTime ? (
              record.scheduledStartTime + " @ " + record.sessionLength + " hrs."
            ) : (
              <Typography
                variant="h6"
                sx={{
                  color: "grey",
                  fontStyle: record.scheduledStartTime ? "normal" : "italic",
                }}
              >
                Time not set
              </Typography>
            )}
          </Grid>

          {/* //& DOW */}
          <Grid item xs={2} sx={{ textAlign: "center" }}>
            <CalendarViewWeekIcon
              sx={{
                fontSize: 24,
                color: (theme) => theme.palette.text.secondary,
              }}
            />
          </Grid>
          <Grid item xs={9} sx={{ ml: 3.5 }}>
            {record.scheduledDow ? (
              dowText(record.scheduledDow)
            ) : (
              <Typography
                variant="h6"
                sx={{
                  color: "grey",
                  fontStyle: record.scheduledDow ? "normal" : "italic",
                }}
              >
                Day of the Week
              </Typography>
            )}
          </Grid>

          {/* //& Notified */}
          <Grid item xs={2} sx={{ 
            textAlign: "center",  
            color: (record.notified ? green[500] : red[500]),
            }}>
            {notifiedText(record.notified)}
          </Grid>
          <Grid item xs={5} sx={{ ml: 3.5 }}>
            <Typography
              variant="h6"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                fontStyle: "italic",
              }}
            >
              Notified
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ textAlign: "center" }}>
            <SendIcon
              sx={{
                fontSize: 24,
                color: orange[500],
              }}
              onClick={handleNotify}
            />
          </Grid>
        </Grid>
      </BackDrop>
    </>
  );
};

export default ScheduleCard;

ScheduleCard.propTypes = {
  record: PropTypes.object.isRequired,
};