/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-11 17:27:37
 * @modify date 2023-03-11 19:50:51
 * @desc [description]
 */

//#region Imports
import { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Image from "mui-image";
import { Form } from "lib/hooks/useForm";
//#endregion

const ViewImageDialog = (props) => {
  //#region //* Local variables
  const { record } = props;
  const [fileObject, setFileObject] = useState("/assets/images/No_Image.png");
  //#endregion

  const selectImageSize = (imageType) => {
    switch (imageType) {
      case "i":
        return {
          // aspectRatio: "1/1",
          width: "100%",
          maxHeight: "75vh",
          borderRadius: "10px",
        };
      case "a":
        return {
          aspectRatio: "1/1",
          maxWidth: "50vh",
          borderRadius: "50px",
        };
      case "t":
        return {
          aspectRatio: "1/1",
          width: "100%",
          maxHeight: "75vh",
          borderRadius: "10px",
        };
      case "s":
        return {
          aspectRatio: "1/2",
          mt: 1,
          width: 200,
          maxHeight: "75vh",
        };
      default:
        return {
          aspectRatio: "4/3",
          borderRadius: "10px",
        };
    }
  };

  return (
    <Fragment>
      <Form>
        <Grid container>
          <Grid item xs={12}>
            <Image
              src={record.fileUrl || fileObject}
              alt={record.altText}
              sx={selectImageSize(record.imageType)}
              fit="contain"
              duration={3000}
              easing="cubic-bezier(0.7, 0, 0.6, 1)"
              shift="bottom"
              distance="100px"
              shiftDuration={1000}
              bgColor="inherit"
            />
          </Grid>
        </Grid>
      </Form>
    </Fragment>
  );
};

export default ViewImageDialog;

ViewImageDialog.propTypes = {
  record: PropTypes.object,
};
