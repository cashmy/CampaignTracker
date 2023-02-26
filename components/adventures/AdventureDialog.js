import { Fragment, useEffect } from "react";
import { Grid, } from "@mui/material";
import { useForm, Form } from "@/../../lib/hooks/useForm";
import { adventureRecord as initialFValues } from "dataModels/adventure";
import Controls from "../controls/Controls";

const AdventureDialog = (props) => {
  const { addOrEdit, recordForEdit } = props;
  // Validation function (to be passed as a callback)
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
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
          <Grid item xs={12}>
            <Controls.TextField
              name="name"
              label="Name"
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
            />
          </Grid>
          <Grid item xs={6} >
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
          <Grid item xs={2} >
            <Controls.TextField
              name="sessionEstimate"
              label="Estimated Sessions"
              value={values.sessionEstimate}
              onChange={handleInputChange}
              error={errors.sessionEstimate}
            />
          </Grid>
          <Grid 
            item 
            xs={4} 
            >
            <Controls.Checkbox
              name="completed"
              label="Completed"
              value={values.completed}
              onChange={handleInputChange}
              error={errors.completed}
              style={{ paddingleft: '16px'}}
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

export default AdventureDialog;
