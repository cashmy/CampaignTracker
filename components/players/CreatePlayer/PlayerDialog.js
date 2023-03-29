/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-20 11:47:39
 * @modify date 2023-03-28 19:50:24
 * @desc [description]
 */

//#region Imports
import { Fragment, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useDropzone } from "react-dropzone";
// * Mui
import { alpha, Avatar, Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { blue, green, red, orange } from "@mui/material/colors";
// * Icons
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import SocialDistanceIcon from "@mui/icons-material/SocialDistance";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { FaDiscord } from "react-icons/fa";
import { FiFacebook, FiTwitter } from "react-icons/fi";
// * Local components
import { useForm, Form } from "@/../../lib/hooks/useForm";
import Controls from "components/controls/Controls";
import SelectCountry from "admin/countries/SelectCountry";
import SelectTimeZone from "admin/timeZones/SelectTimeZone";
import { Fonts } from "lib/constants/AppEnums";
// * Services
import { playerRecord as initialFValues } from "dataModels/player";
//#endregion

//#region //* Styled Components
const HeaderWrapper = styled("div")(({ theme }) => {
  return {
    padding: 20,
    marginLeft: -24,
    marginRight: -24,
    marginTop: -20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
    "& .dropzone": {
      outline: 0,
      "&:hover .edit-icon, &:focus .edit-icon": {
        display: "flex",
      },
    },
  };
});
const AvatarViewWrapper = styled("div")(({ theme }) => {
  return {
    position: "relative",
    cursor: "pointer",
    "& .edit-icon": {
      position: "absolute",
      bottom: 0,
      right: 0,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.7),
      color: theme.palette.primary.contrastText,
      borderRadius: "50%",
      width: 26,
      height: 26,
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.4s ease",
      "& .MuiSvgIcon-root": {
        fontSize: 16,
      },
    },
  };
});
//#endregion

//#region //* Tab Panel & Supporting functions
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
//#endregion

const PlayerDialog = (props) => {
  //#region //* Props & Local Variables
  const { addOrEdit, recordForEdit } = props;

  // Validation function (to be passed as a callback)
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("playerName" in fieldValues)
      temp.playerName = fieldValues.playerName ? "" : "This field is required.";
    if ("countryCode" in fieldValues)
      temp.countryCode = fieldValues.countryCode
        ? ""
        : "This field is required.";
    setErrors({
      ...temp,
    });
    // Check that every item in the array has a blank result (no errors) else return false.
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
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
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const labelList = [
    { id: 311, title: "Exp/Vet +DM", alias: "311", color: red[500] },
    { id: 312, title: "Veteran", alias: "312", color: blue[500] },
    { id: 313, title: "Experienced", alias: "313", color: orange[500] },
    { id: 314, title: "Newbie", alias: "314", color: green[500] },
  ];
  //#endregion

  //#region //* Hooks
  useEffect(() => {
    if (recordForEdit != null) "now setting values";
    setValues({
      ...recordForEdit,
    });
  }, [recordForEdit]);
  //#endregion

  //#region //* Event Handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) addOrEdit(values, resetForm);
  };
  const handleReset = () => {
    if (recordForEdit == null) resetForm();
    else setValues({ ...recordForEdit });
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setValues({
        ...values,
        avatarImage: URL.createObjectURL(acceptedFiles[0]),
      });
    },
  });
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleCountryChange = (event) => {
    console.log("Country Code: ", event.target.value);
    setValues({
      ...values,
      countryCode: event.target.value,
    });
  };
  // #endregion

  return (
    <Fragment>
      <Form>
        <Grid id="grdCont" container spacing={2} sx={{ display: "flex" }}>
          <Grid
            id="avatarImg"
            item
            xs={4}
            sx={{
              minHeight: "300px",
              alignItems: "center",
            }}
          >
            <HeaderWrapper>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <label htmlFor="icon-button-file"></label>
                <AvatarViewWrapper>
                  <Avatar
                    sx={{
                      width: "100%",
                      height: "auto",
                      ml: "auto",
                      mr: "auto",
                      mt: 10,
                      mb: 10,
                    }}
                    src={values.avatarImage ? values.avatarImage : ""}
                  />
                  <Box className="edit-icon">
                    <EditIcon />
                  </Box>
                </AvatarViewWrapper>
              </div>
              {values.playerName ? (
                <Box component="h4" fontWeight={Fonts.SEMI_BOLD} mt={1}>
                  {values.playerName}
                </Box>
              ) : null}
            </HeaderWrapper>
          </Grid>

          <Grid item xs={8}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              textColor="secondary"
              indicatorColor="secondary"
              sx={{ minWidth: "200px", mb: 4 }}
            >
              <Tab
                icon={<InfoIcon />}
                iconPosition="top"
                label="General"
                {...a11yProps(0)}
              />
              <Tab
                icon={<SocialDistanceIcon />}
                iconPosition="top"
                label="Social"
                {...a11yProps(1)}
              />
              {/* <Tab
                icon={<CampaignIcon />}
                iconPosition="top"
                label="Campaigns"
                {...a11yProps(2)}
              /> */}
              <Tab
                icon={<TextSnippetIcon />}
                iconPosition="top"
                label="Notes"
                {...a11yProps(2)}
              />
            </Tabs>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={tabValue}
              onChangeIndex={handleChangeIndex}
            >
              {/* //^ General Info */}
              <TabPanel value={tabValue} index={0} dir={theme.direction}>
                <Grid container spacing={6}>
                  <Grid item xs={6}>
                    <Controls.TextField
                      name="playerName"
                      label="Player Name"
                      value={values.playerName}
                      onChange={handleInputChange}
                      error={errors.playerName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controls.TextField
                      name="email"
                      label="Email"
                      value={values.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectCountry
                      name="countryCode"
                      label="Country"
                      value={values.countryCode}
                      onChange={handleCountryChange}
                      error={errors.countryCode}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectTimeZone
                      name="timeZone"
                      label="Time Zone"
                      value={values.timeZone}
                      onChange={handleInputChange}
                      error={errors.timeZone}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controls.TextField
                      name="contact"
                      label="Phone"
                      value={values.contact}
                      onChange={handleInputChange}
                      error={errors.contact}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controls.Select
                      name="label"
                      label="Experience Label"
                      value={values.label}
                      onChange={handleInputChange}
                      error={errors.label}
                      options={labelList}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              {/* //^ Social Connections */}
              <TabPanel value={tabValue} index={1} dir={theme.direction}>
                <Grid container spacing={6} sx={{ display: "flex" }}>
                  <Grid item xs={2} sx={{ display: "grid" }}>
                    <Box sx={{ justifySelf: "center", mt: 2 }}>
                      <FaDiscord
                        size={32}
                        style={{
                          color: "#5865F2",
                          backgroundColor: "white",
                          borderRadius: "20%",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={10}>
                    <Controls.TextField
                      name="discordId"
                      label="Discord Id"
                      value={values.discordId}
                      onChange={handleInputChange}
                      error={errors.discordId}
                    />
                  </Grid>
                  <Grid item xs={2} sx={{ display: "grid" }}>
                    <Box sx={{ justifySelf: "center", mt: 2 }}>
                      <FiFacebook
                        size={32}
                        style={{
                          color: "white",
                          backgroundColor: "#4267b2",
                          borderRadius: "20%",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={10}>
                    <Controls.TextField
                      name="fbUsername"
                      label="Facebook Username"
                      value={values.fbUsername}
                      onChange={handleInputChange}
                      error={errors.fbUsername}
                    />
                  </Grid>
                  <Grid item xs={2} sx={{ display: "grid" }}>
                    <Box sx={{ justifySelf: "center", mt: 2 }}>
                      <FiTwitter
                        size={32}
                        style={{
                          color: "#1DA1F2",
                          backgroundColor: "white",
                          borderRadius: "20%",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={10}>
                    <Controls.TextField
                      name="twitterId"
                      label="Twitter Id"
                      value={values.twitterId}
                      onChange={handleInputChange}
                      error={errors.twitterId}
                    />
                  </Grid>
                </Grid>
              </TabPanel>

              {/* //^ Campaigns
              <TabPanel value={tabValue} index={2} dir={theme.direction}>
                Assigned Campaigns are listed here
              </TabPanel> */}

              {/* //^ Notes */}
              <TabPanel value={tabValue} index={2} dir={theme.direction}>
                <Grid item xs={12} sx={{ mt: -1.5 }}>
                  <Controls.TextField
                    name="notes"
                    label="Player Notes"
                    value={values.notes}
                    onChange={handleInputChange}
                    error={errors.notes}
                    multiline
                    rows={9}
                    maxRows={9}
                  />
                </Grid>
              </TabPanel>
            </SwipeableViews>
          </Grid>
          {/* //* Buttons */}
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
          >
            <Controls.Button
              type="submit"
              text="Submit"
              onClick={handleSubmit}
            />
            <Controls.Button
              color="secondary"
              text="Reset"
              onClick={handleReset}
            />
          </Grid>
        </Grid>
      </Form>
    </Fragment>
  );
};

export default PlayerDialog;
