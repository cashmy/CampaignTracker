/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-04-05 10:18:28
 * @modify date 2023-04-08 16:01:49
 * @desc [description]
 */

//#region Imports
import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
// * Mui Components
import {
  Grid,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { red, green } from "@mui/material/colors";
// * Icons
import SendIcon from "@mui/icons-material/Send";
// * Local Components
import Controls from "components/controls/Controls";
import { useForm, Form } from "lib/hooks/useForm";
//#endregion

//#region //* Styled Components
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: green[500],
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      // theme.palette.mode === "dark"
      // ? "rgba(255,255,255,.35)"
      // : "rgba(0,0,0,.25)",
      red[500],
    boxSizing: "border-box",
  },
}));
//#endregion

const SendMessageDialog = (props) => {
  //#region //* State & Local Variables
  const { record, campaign } = props;
  const [additionalTimeZones, setAdditionalTimeZones] = useState(
    "00:00pm XXX / 00:00pm XXX"
  );
  const initialFValues = {
    includeSessionName: true,
    includeSessionDescription: true,
    includeTimeZones: true,
    messageType: "discord",
    discordChannelOrPersonal: false,
    discordChannel: campaign.discordChannel,
    message: "",
  };
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleToggleChange,
    resetForm,
  } = useForm(initialFValues);
  //#endregion
  
  //#region //* Hooks
  useEffect(() => {
    values.discordChannel = campaign.discordChannel;
  }, [campaign]);
  //#endregion

  //#region //* Event Handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Sending Messages ... ");
    // Todo: Send Messages to Discord bot/API
    // Todo: Update Session record with message sent status
  };
  //#endregion

  console.log("Campaign: ", campaign);
  console.log ("Values: ", values);

  return (
    <Fragment>
      <Form>
        <Grid container spacing={2}>
          {/* //^ Message Options */}
          <Grid item xs={6}>
            {/* //& Include Session Name? */}
            <Grid
              item
              xs={12}
              sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Include Session Name? </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mr: 5 }}
              >
                <Typography>No</Typography>
                <AntSwitch
                  name="includeSessionName"
                  value={values.includeSessionName}
                  onChange={handleToggleChange}
                  defaultChecked={values.includeSessionName}
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography>Yes</Typography>
              </Stack>
            </Grid>

            {/* //& Include Session Description? */}
            <Grid
              item
              xs={12}
              sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Include Description? </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mr: 5 }}
              >
                <Typography>No</Typography>
                <AntSwitch
                  name="includeSessionDescription"
                  value={values.includeSessionDescription}
                  onChange={handleToggleChange}
                  defaultChecked={values.includeSessionDescription}
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography>Yes</Typography>
              </Stack>
            </Grid>

            {/* //& Include Time Zones? */}
            <Grid
              item
              xs={12}
              sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Include Time Zones? </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mr: 5 }}
              >
                <Typography>No</Typography>
                <AntSwitch
                  name="includeTimeZones"
                  value={values.includeTimeZones}
                  onChange={handleToggleChange}
                  defaultChecked={values.includeTimeZones}
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography>Yes</Typography>
              </Stack>
            </Grid>

            {/* // & Message Type */}
            <Grid item xs={12} sx={{ mb: 3 }}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Message Type
                </FormLabel>
                <RadioGroup
                  name="messageType"
                  value={values.messageType}
                  onChange={handleInputChange}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="discord"
                  row
                  sx={{ ml: 3 }}
                >
                  <FormControlLabel
                    value="discord"
                    control={<Radio />}
                    label="Discord only"
                    sx={{ mb: -2 }}
                  />
                  <FormControlLabel
                    value="email"
                    control={<Radio />}
                    label="Email only"
                    sx={{ mb: -2 }}
                  />
                  <FormControlLabel
                    value="both"
                    control={<Radio />}
                    label="Both"
                    sx={{ mb: -2 }}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* //& Discord Channel option */}
            {values.messageType != 'email' && (<Grid
              item
              xs={12}
              sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Discord Personal? </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mr: 5 }}
              >
                <Typography>No</Typography>
                <AntSwitch
                  name="discordChannelOrPersonal"
                  value={values.discordChannelOrPersonal}
                  onChange={handleToggleChange}
                  defaultChecked={values.discordChannelOrPersonal}
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography>Yes</Typography>
              </Stack>
            </Grid>)}
            {(values.messageType !== "email" && !values.discordChannelOrPersonal) && (
              <Grid item xs={11} sx={{ mb: 3 }}>
                <Controls.TextField
                  name="discordChannel"
                  label="Discord Channel"
                  value={values.discordChannel}
                  onChange={handleInputChange}
                  error={errors.discordChannel}
                />
                </Grid>
            )}
          </Grid>
          {/* //^ Preview Pane */}
          <Grid
            item
            xs={6}
            sx={{
              mt: 2,
              pb: 2,
              borderColor: "grey !important",
              borderRadius: 3,
              border: 1,
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Preview
            </Typography>
            <Typography variant="h6" sx={{ ml: 3 }}>
              Hey! Just a friendly reminder:
            </Typography>
            <Typography variant="h6" sx={{ ml: 3 }}>
              Our next session for "{campaign.name}" is coming up on
              {moment(record.sessionDate).format(" MMMM Do YYYY (ddd)")} for
              approximately {record.sessionLength} hours.
            </Typography>
            <Typography variant="h6" sx={{ ml: 3 }}>
              We will begin at 
              {values.includeTimeZones ? moment(record.sessionDate).utc().format(" h:mm a") + " UTC" : moment(record.sessionDate).format(" h:mm a")}.
              {/* {values.includeTimeZones && record.baseTimeZone}. */}
            </Typography>

            {values.includeTimeZones && (
              <>
                <Typography variant="h6" sx={{ ml: 3 }}>
                  Additional time zones are:
                </Typography>
                <Typography variant="h6" sx={{ ml: 3 }}>
                  {moment(record.sessionDate).format(" h:mm a")}{" "}{record.baseTimeZone}{" / "} 
                  {additionalTimeZones}
                </Typography>
              </>
            )}
            {values.includeSessionName && (
              <Typography variant="h6" sx={{ ml: 3, pt: 3 }}>
                {"> "}{record.name}
              </Typography>
            )}
            {values.includeSessionDescription && (
              <>
                <Typography variant="h6" sx={{ ml: 3 }}>
                  Where: {record.description}
                </Typography>
              </>
            )}
          </Grid>
          {/* //^ Button Row */}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
          >
            <Controls.Button
              type="submit"
              text="Send Message"
              onClick={handleSubmit}
              endIcon={<SendIcon />}
            />
          </Grid>
        </Grid>
      </Form>
    </Fragment>
  );
};

export default SendMessageDialog;

SendMessageDialog.propTypes = {
  record: PropTypes.object.isRequired,
  // handleSendMessage: PropTypes.func.isRequired,
};
