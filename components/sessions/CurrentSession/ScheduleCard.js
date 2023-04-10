/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-31 16:11:03
 * @modify date 2023-04-06 17:18:37
 * @desc [description]
 */

//#region //* Imports
import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
// * Mui Components
import { Box, Grid, Paper, Typography, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blue, green, orange, red } from "@mui/material/colors";
// * Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
// * Local Components
import ActionIconButton from "components/controls/ActionIconButton";
import PageDialog from "components/controls/PageDialog";
import NextMeetingDialog from "components/sessions/CurrentSession/NextMeetingDialog";
import SendMessageDialog from "./SendMessageDialog";
import { useInfoViewActionsContext } from "lib/context/AppContextProvider/InfoViewContextProvider";
// * Services/Context
import SessionService from "services/session.service";
import { putDataApi } from "lib/hooks/APIHooks";
// import {
//   useSessionsActionsContext,
// } from "components/sessions/SessionsContextProvider";
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
  const { record, campaign } = props;
  // const { reCallAPI, API_URL } = useSessionsActionsContext();
  const [sessionRecord, setSessionRecord] = useState({});
  const [showSessionSchedule, setShowSessionSchedule] = useState(false);
  const [showSendMessage, setShowSendMessage] = useState(false);
  const infoViewActionsContext = useInfoViewActionsContext();
  //#endregion

  //#region //* Event Handlers
  const scheduleEdit = (session, resetForm) => {
    console.log("scheduleEdit", record);
    let close = false;
    SessionService.updateRecord(session);
    // requestReload();
    close = true;
    // setLoadData(true);
    infoViewActionsContext.showMessage("Session Updated Successfully");
    if (close) {
      resetForm();
      setSessionRecord(null);
      setShowSessionSchedule(true);
    }
    infoViewActionsContext.showMessage("Adventure Updated Successfully");
    // reCallAPI();
  };
  const handleEditSchedule = (session,) => {
    setSessionRecord(session);
    setShowSessionSchedule(true);
  };
  const handleSendMessage = (session) => {
    setSessionRecord(session);
    setShowSendMessage(true);
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
              tooltipText="Edit Next Meeting Info"
              onClick={() => handleEditSchedule(record)}
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
            {record.sessionDate ? (
              moment(record.sessionDate).format("h:mm a") + " @ " + record.sessionLength + " hrs."
            ) : (
              <Typography
                variant="h6"
                sx={{
                  color: "grey",
                  fontStyle: record.sessionDate ? "normal" : "italic",
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
          <Grid
            item
            xs={2}
            sx={{
              textAlign: "center",
              color: record.notified ? green[500] : red[500],
            }}
          >
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
            <Tooltip title="Send Notification" placement="top">
              <SendIcon
                sx={{
                  fontSize: 24,
                  color: orange[500],
                }}
                onClick={() => handleSendMessage(record)}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </BackDrop>

      {/* //* Dialogs, Modals, & Popups */}
      {/* //& Edit Session Schedule */}
      <PageDialog
        openPopup={showSessionSchedule}
        setOpenPopup={setShowSessionSchedule}
        title="Edit Session Schedule"
        titleColor={process.env.NEXT_PUBLIC_NX_PRIMARY_COLOR}
        size="sm"
      >
        <NextMeetingDialog recordForEdit={sessionRecord} processEditRecord={scheduleEdit} />
      </PageDialog>

      {/* //& Send Message Dialog */}
      <PageDialog
        openPopup={showSendMessage}
        setOpenPopup={setShowSendMessage}
        title="Send Schedule Message"
        titleColor={process.env.NEXT_PUBLIC_NX_SECONDARY_COLOR}
        size="md"
      >
        <SendMessageDialog record={sessionRecord} campaign={campaign} />
      </PageDialog>
    </>
  );
};

export default ScheduleCard;

ScheduleCard.propTypes = {
  record: PropTypes.object.isRequired,
  campaign: PropTypes.object.isRequired,
};
