import { Fragment, useEffect } from "react";
import { Grid } from "@mui/material";
import { useForm, Form } from "@/../../lib/hooks/useForm";
import { campaignRecord as initialFValues } from "dataModels/campaign";
import Controls from "../controls/Controls";

const CampaignDialog = (props) => {
  const { addOrEdit, recordForEdit } = props;
  // Validation function (to be passed as a callback)
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    if ("dm" in fieldValues)
      temp.dm = fieldValues.dm ? "" : "This field is required.";
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

  // SaveSubmit Callback handler - event driven
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) addOrEdit(values, resetForm);
  };
  const handleReset = () => {
    if (recordForEdit == null) resetForm();
    else setValues({ ...recordForEdit });
  };
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Fragment>
      <Form>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Controls.TextField
              name="name"
              label="Name"
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.TextField
              name="dm"
              label="DM/GM"
              value={values.dm}
              onChange={handleInputChange}
              error={errors.dm}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.TextField
              multiline
              minRows={2}
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

          <Grid item xs={4}>
            <Controls.TextField
              name="world"
              label="World"
              value={values.world}
              onChange={handleInputChange}
              error={errors.world}
            />
          </Grid>
          <Grid item xs={4}>
            <Controls.TextField
              name="gameSystem"
              label="Game System"
              value={values.gameSystem}
              onChange={handleInputChange}
              error={errors.gameSystem}
            />
          </Grid>
          <Grid item xs={4}>
            <Controls.TextField
              name="style"
              label="Style"
              placeholder="e.g. Tabletop, VT, Roll20, etc."
              value={values.style}
              onChange={handleInputChange}
              error={errors.style}
            />
          </Grid>

          <Grid item xs={4}>
            <Controls.Select
              name="type"
              label="Game Type"
              value={values.type}
              onChange={handleInputChange}
              error={errors.type}
              options={[
                { id: "c", title: "Campaign" },
                { id: "a", title: "Adventure" },
                { id: "o", title: "One-Shot" },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <Controls.Select
              name="frequency"
              label="Frequency"
              value={values.frequency}
              onChange={handleInputChange}
              error={errors.frequency}
              options={[
                { id: "w", title: "Weekly" },
                { id: "b", title: "Bi-Weekly" },
                { id: "m", title: "Monthly" },
                { id: "v", title: "Varies" },
                { id: "o", title: "Once" },
                { id: "n", title: "Never" },
                { id: "t", title: "TBD" },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <Controls.Select
              name="dow"
              label="Day of Week"
              value={values.dow}
              onChange={handleInputChange}
              error={errors.dow}
              options={[
                { id: 0, title: "None" },
                { id: 1, title: "Sun" },
                { id: 2, title: "Mon" },
                { id: 3, title: "Tue" },
                { id: 4, title: "Wed" },
                { id: 5, title: "Thu" },
                { id: 6, title: "Fri" },
                { id: 7, title: "Sat" },
                { id: 8, title: "Varies" },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <Controls.Select
              name="timeSlot"
              label="Relative Time Slot"
              value={values.timeSlot}
              onChange={handleInputChange}
              error={errors.timeSlot}
              options={[
                { id: 0, title: "None" },
                { id: 1, title: "Morning" },
                { id: 2, title: "Noon" },
                { id: 3, title: "Afternoon" },
                { id: 4, title: "Evening" },
                { id: 5, title: "Late Night" },
              ]}
            />
          </Grid>

          <Grid item xs={2}>
            <Controls.TextField
              name="pcIdeal"
              label="Ideal # of PCs"
              value={values.pcIdeal}
              onChange={handleInputChange}
              error={errors.pcIdeal}
            />
          </Grid>
          <Grid item xs={2}>
            <Controls.TextField
              name="pcCount"
              label="Registered # of PCs"
              value={values.pcCount}
              onChange={handleInputChange}
              error={errors.pcCount}
            />
          </Grid>
          <Grid item xs={2}>
            <Controls.TextField
              name="cost"
              label="Cost $"
              value={values.cost}
              onChange={handleInputChange}
              error={errors.cost}
            />
          </Grid>
          <Grid item xs={2}>
            <Controls.Checkbox
              name="archived"
              label="Archived"
              labelPlacement="top"
              value={values.archived}
              onChange={handleInputChange}
              error={errors.archived}
              style={{ paddingleft: "0px !important", marginLeft: "0" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.TextField
              name="discordServer"
              label="Discord Server"
              value={values.discordServer}
              onChange={handleInputChange}
              error={errors.discordServer}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.TextField
              name="discordChannel"
              label="Discord General Chat Channel"
              value={values.discordChannel}
              onChange={handleInputChange}
              error={errors.discordChannel}
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

export default CampaignDialog;
