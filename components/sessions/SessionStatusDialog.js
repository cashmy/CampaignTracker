import { Fragment, useEffect } from "react";
import { Grid, } from "@mui/material";
import { useForm, Form } from "@/../../lib/hooks/useForm";
import { sessionRecord as initialFValues } from "dataModels/session";
import Controls from "../controls/Controls";

const SessionStatusDialog = (props) => {
  const { addOrEdit, recordForEdit } = props;
  // Validation function (to be passed as a callback)
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
      if ("status" in fieldValues)
      temp.status = fieldValues.status ? "" : "This field is required.";
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
    // event.preventDefault();
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
          <Grid item xs={6} >
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
          <Grid item xs={12} >
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

export default SessionStatusDialog;