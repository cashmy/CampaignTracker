/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-11 17:27:37
 * @modify date 2023-03-11 18:30:13
 * @desc [description]
 */

//#region Imports
import { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import Image from "mui-image";
import Controls from "components/controls/Controls";
import { Form, useForm } from "lib/hooks/useForm";
import { imageRecord as initialFValues } from "dataModels/images";
//#endregion

// TODO: Replace defaulted user with login user

// * Main component
const ImageDialog = (props) => {
  //#region //* Local variables
  let val_image = "";
  const { addOrEdit, recordForEdit } = props;
  const [fileObject, setFileObject] = useState("/assets/images/No_Image.png");
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.altText = fieldValues.altText ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    // Check that every item in the array has a blank result (no errors) else return false.
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues);
  //#endregion

  //#region //* Hooks/Effects
  // Edit mode actions
  useEffect(() => {
    if (recordForEdit != null) {
      setFileObject(recordForEdit.file_name);
      setValues({
        ...recordForEdit,
      });
    }
    return function cleanup() {
      URL.revokeObjectURL(fileObject);
    };
  }, [recordForEdit]);
  //#endregion

  //#region //* Event handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) addOrEdit(values, resetForm);
  };
  const handleReset = () => {
    if (recordForEdit == null) resetForm();
    else setValues({ ...recordForEdit });
  };
  const selectImageSize = (imageType) => {
    switch (imageType) {
      case "i":
        return {
          aspectRatio: "4/3",
          borderRadius: "10px",
        };
      case "a":
        return {
          aspectRatio: "1/1",
          borderRadius: "10px",
        };
      case "t":
        return {
          aspectRatio: "1/1",
          borderRadius: "10px",
        };
      case "s":
        return {
          aspectRatio: "1/2.5",
          mt: 1,
          width: "40px",
          border: "1px solid grey",
        };
      default:
        return {
          aspectRatio: "4/3",
          borderRadius: "10px",
        };
    }
  };
  //#endregion

  return (
    <Fragment>
      <Form>
        <Grid container spacing={2}>
          <Grid container spacing={4} item xs={6}>
            <Grid item xs={12}>
              <Typography variant="body">
                File name: {values.fileName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controls.TextField
                name="altText"
                label="Title/Alt Text"
                color="info"
                value={values.altText}
                onChange={handleInputChange}
                error={errors.altText}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.TextField
                name="mimeType"
                label="File Mime Type"
                size="sm"
                value={values.mimeType}
                onChange={handleInputChange}
                error={errors.mimeType}
                // disabled
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.TextField
                name="file_size"
                label="File Size"
                size="sm"
                value={values.fileSize}
                onChange={handleInputChange}
                error={errors.fileSize}
                // disabled
              />
            </Grid>
          </Grid>

          <Grid container spacing={8} item xs={6}>
            <Grid item xs={12} sx={{ ml: 10, mt: 5 }}>
              <Image
                sx={selectImageSize(values.imageType)}
                src={values.fileUrl || ""}
                duration={3000}
                easing="cubic-bezier(0.7, 0, 0.6, 1)"
                shift="bottom"
                distance="100px"
                shiftDuration={1000}
                bgColor="inherit"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", mt: 8 }}>
          <Controls.Button
            color="primary"
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
      </Form>
    </Fragment>
  );
};

export default ImageDialog;

ImageDialog.propTypes = {
  addOrEdit: PropTypes.func.isRequired,
  recordForEdit: PropTypes.object,
};
