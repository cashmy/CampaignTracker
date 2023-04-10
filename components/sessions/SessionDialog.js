/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-04-06 09:40:44
 * @modify date 2023-04-10 14:38:28
 * @desc [description]
 */

//#region Imports
import { Fragment, useEffect, useState } from "react";
// * Mui
import { Grid } from "@mui/material";
// * Icons
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
// * Local Components
import Controls from "../controls/Controls";
import { useForm, Form } from "@/../../lib/hooks/useForm";
// * Services/Context
import { sessionRecord as initialFValues } from "dataModels/session";
//#endregion

const SessionDialog = (props) => {
  //#region // * State & Local Variables
  const { addOrEdit, recordForEdit } = props;
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
    if (recordForEdit != null)
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
    console.log("Reset Form");
    if (recordForEdit == null) resetForm();
    else setValues({ ...recordForEdit });
  };
  //#endregion

  return (
    <Fragment>
      <Form>
        <Grid container spacing={4}>
          {/* //& Name */}
          <Grid item xs={12}>
            <Controls.TextField
              name="name"
              label="Name"
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
            />
          </Grid>

          {/* //& Description */}
          <Grid item xs={6}>
            <Controls.TextField
              multiline
              minRows={5}
              maxRows={5}
              style={{ flexGrow: 1 }}
              aria-label="description"
              placeholder="Description"
              name="description"
              label="Description"
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
            />
          </Grid>

          {/* //& Activity */}
          <Grid item xs={6}>
            <Controls.TextField
              multiline
              minRows={5}
              maxRows={5}
              style={{ flexGrow: 1 }}
              aria-label="activity"
              placeholder="Activity"
              name="activity"
              label="Activity"
              value={values.activity}
              onChange={handleInputChange}
              error={errors.activity}
            />
          </Grid>

          {/* //& Session Date */}
          <Grid item xs={3}>
            <Controls.DatePicker
              name="sessionDate"
              label="Session Date"
              value={values.sessionDate}
              onChange={handleInputChange}
              error={errors.sessionDate}
            />
          </Grid>

          {/* //& Session StartTime */}
          <Grid item xs={3}>
            <Controls.TimePicker
              name="sessionDate"
              label="Scheduled Start Time"
              value={values.sessionDate}
              onChange={handleInputChange}
              error={errors.sessionDate}
              minutesStep={5}
            />
            {/* <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-start-time">Start Time</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-start-time"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle timepicker visibility"
                        onClick={() => setOpenTime(true)}
                        edge="end"
                        >
                          <QueryBuilderIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  name="scheduledStartTm"
                  label="Start Time"
                  value={values.scheduledStartTm}
                />
              </FormControl> */}
          </Grid>

          {/* //& Session Length */}
          <Grid item xs={3}>
            <Controls.TextField
              name="sessionLength"
              label="Session Length (hours)"
              value={values.sessionLength}
              onChange={handleInputChange}
              error={errors.sessionLength}
            />
          </Grid>

          {/* //& Status */}
          <Grid item xs={3}>
            <Controls.Select
              name="status"
              label="Status"
              value={values.status}
              onChange={handleInputChange}
              error={errors.status}
              options={[
                { id: "pl", title: "Planned" },
                { id: "ip", title: "In Progress" },
                { id: "sc", title: "Completed" },
              ]}
            />
          </Grid>

          {/* //& Side Quest */}
          <Grid item xs={6}>
            <Controls.Checkbox
              name="sideQuest"
              label="Side Quest"
              value={values.sideQuest}
              onChange={handleInputChange}
              error={errors.sideQuest}
              style={{ paddingleft: "16px" }}
            />
          </Grid>
          {/* //^ Button Row */}
          <Grid
            item
            xs={6}
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

export default SessionDialog;
