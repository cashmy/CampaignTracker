/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-04-04 15:36:04
 * @modify date 2023-04-05 12:11:44
 * @desc [description]
 */

//#region Imports
import { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
// * Mui Components
import { Grid, Typography } from "@mui/material";
// * Icons
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
// * Local Components
import Controls from "components/controls/Controls";
import { useForm, Form } from "lib/hooks/useForm";
import { sessionRecord as initialFValues } from "dataModels/session";
//#endregion

const NextMeetingDialog = (props) => {
  //#region //* Variables
  const { recordForEdit, processEditRecord } = props;
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleToggleChange,
    resetForm,
  } = useForm(initialFValues);
  //#

  //#region //* Hooks
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);
  //#endregion

  //#region //* Event Handlers
  const handleDateChange = (event) => {
    let tempDate = new Date(event.target.value);
    setValues({
      ...values,
      "sessionDate": event.target.value,
      "scheduledDow": tempDate.getDay()+1,
    });
  }
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    if ("status" in fieldValues)
      temp.status = fieldValues.status ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) processEditRecord(values, resetForm);
  };
  const handleReset = () => {
    if (recordForEdit == null) resetForm();
    else setValues({ ...recordForEdit });
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
  //#endregion

  // console.log("NextMeetingDialog: values", recordForEdit);
  return (
    <Fragment>
      <Form>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Controls.DatePicker
              name="sessionDate"
              label="Session Date"
              value={values.sessionDate}
              onChange={handleDateChange}
              error={errors.sessionDate}
            />
          </Grid>
          <Grid item xs={6} sx={{display: "flex", mt: 4}}>
            <Grid item xs={2} sx={{ textAlign: "center" }}>
              <CalendarViewWeekIcon
                sx={{
                  fontSize: 24,
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
            </Grid>
            <Grid item xs={9} sx={{ ml: 3.5 }}>
              {values.scheduledDow ? (
                dowText(values.scheduledDow)
              ) : (
                <Typography
                  variant="h6"
                  sx={{
                    color: "grey",
                    fontStyle: values.scheduledDow ? "normal" : "italic",
                  }}
                >
                  Day of the Week
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Controls.TextField
              name="scheduledStartTm"
              label="Start Time"
              value={values.scheduledStartTime}
              onChange={handleInputChange}
              error={errors.scheduledStartTime}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.TextField
              name="sessionLength"
              label="Session Length (hours)"
              value={values.sessionLength}
              onChange={handleInputChange}
              error={errors.sessionLength}
            />
          </Grid>

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

export default NextMeetingDialog;

NextMeetingDialog.propTypes = {
  recordForEdit: PropTypes.object.isRequired,
  processEditRecord: PropTypes.func.isRequired,
};
