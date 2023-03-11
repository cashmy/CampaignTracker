//#region //* Imports
import { useState, Fragment } from "react";
import ImageUploading from "react-images-uploading";
// * Mui
import {
  Button,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
// * Icons
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ImageTwoToneIcon from "@mui/icons-material/ImageTwoTone";
import { IoImage, IoImages } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { GiToken } from "react-icons/gi";
import { RiSideBarFill } from "react-icons/ri";

// * Local Components
import AppGridContainer from "lib/components/AppGridContainer";
// import AppAnimate from '@/../../lib/components/AppAnimate';
// import AppLoader from "@/../../lib/components/AppLoader";
import AppScrollbar from "lib/components/AppScrollbar";
import TitleBar from "/components/controls/TitleBar";
// * Services
// import { useGetDataApi } from '@/../../lib/hooks/APIHooks';
//#endregion

const Default = () => {
  // #region //* Local State
  // const { selectImage } = props;
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  // #endregion

  // #region //* Event Handlers
  const convertToFormData = (obj, mode) => {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => {
      if (key == "file_name") {
        if (mode !== "add") {
          //skip the file_name field
        } else {
          formData.append(key, obj[key]);
        }
      } else {
        if ((key == "user" || key == "user_id") && obj[key] == null) {
          formData.append(key, 2);
        } else {
          formData.append(key, obj[key]);
        }
      }
      // formData.append('user', 2);
      // formData.append('user_id', 2);
    });
    const body = {
      id: obj.id,
      formData,
    };
    return body;
  };
  const handleImageAddAll = (imageList, onImageRemoveAll) => {
    let imageURL = {};

    imageList.forEach((image) => {
      let formData = new FormData();
      formData.append("file_name", image.file);
      formData.append("alt_text", image.file.name);
      // formData.append("user", 2);
      formData.append("user_id", 1);
      formData.append("file_size", image.file.size);
      formData.append("mime_type", image.file.type);

      alert(`Adding image ${image.file.name} to database file`);
    });
    onImageRemoveAll();
  };
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  const handleClickEvent = (event, index, onImageUpdate, onImageRemove) => {
    if (event.shiftKey) onImageRemove(index);
    else onImageUpdate(index);
  };
  // #endregion

  // const [{ apiData: defaultData, loading }] = useGetDataApi('/dashboard/default');
  return (
    <AppGridContainer>
      {/* {loading ? (
        <AppLoader />
      ) : ( */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240, 1fr))",
          gap: 2,
        }}
      >
        {/* //* Page: Component Header */}
        <Box
          sx={{
            ml: 3,
            width: "calc(100vw - 400px)",
            height: 75,
          }}
        >
          <TitleBar
            componentTitle="Images Library"
            avatarIcon="icon"
            avatarImage={<IoImage />}
          />
        </Box>
        {/* //* Component Pannel */}
        <Box
          id="componentPannel"
          sx={{
            width: "calc(100vw - 375px)",
            height: "calc(100vh - 200px)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "6fr 3fr",
            }}
          >
            {/* //* Display Pane of existing Images */}
            <Box
              sx={{
                height: "calc(100vh - 220px)",
                m: 3,
                borderRadius: "10px",
              }}
            >
              <Paper
                elevation={10}
                sx={{
                  width: "100%",
                  height: "100%",
                  overflowY: "auto",
                  borderRadius: "10px",
                }}
              >
                <Box
                  sx={{
                    m: 3,
                  }}
                  display="grid"
                  gridTemplateColumns="repeat(auto-fit, minmax(150, 1fr))"
                ></Box>
              </Paper>
            </Box>

            {/* //* Right Hand Column */}
            <Box
              sx={{
                m: 2,
                borderRadius: "10px",
                display: "grid",
                gridTemplateRows: "2fr 6fr",
              }}
            >
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={["jpg", "png", "jpeg"]}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <Fragment>
                    {/* //& Click - Drag/Drop Button */}
                    <Box
                      sx={{
                        mb: 2,
                        borderRadius: "10px",
                        display: "flex-column",
                      }}
                    >
                      <Button
                        onClick={onImageUpload}
                        variant="contained"
                        size="large"
                        startIcon={<ImageTwoToneIcon />}
                        sx={{
                          mt: 2,
                          width: "100%",
                          height: "100%",
                          color: "white",
                        }}
                        style={
                          isDragging ? { backgroundColor: "blue" } : undefined
                        }
                        {...dragProps}
                      >
                        Click or Drag/Drop here
                      </Button>
                    </Box>
                    {/* //& Image List to Add to database */}
                    <Box
                      sx={{
                        borderRadius: "10px",
                        display: "flex-column",
                        bgcolor: "background.componentBg",
                        maxHeight: "calc(100vh - 410px)",
                      }}
                    >
                      {/* //^ Buttons Box */}
                      <Box
                        sx={{ m: 2 }}
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-around"
                      >
                        <Button
                          variant="contained"
                          startIcon={<KeyboardDoubleArrowLeftIcon />}
                          onClick={() =>
                            handleImageAddAll(imageList, onImageRemoveAll)
                          }
                          disabled={imageList.length <= 0}
                          color="secondary"
                        >
                          Add All{" "}
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          onClick={onImageRemoveAll}
                          disabled={imageList.length <= 0}
                          color="secondary"
                        >
                          Remove All{" "}
                        </Button>
                      </Box>
                      <Paper
                        elevation={10}
                        sx={{
                          width: "100%",
                          height: "90%",
                          maxHeight: "100%",
                          bgcolor: "background.componentBg",
                          overflowY: "auto",
                          borderRadius: "10px",
                        }}
                      >
                        {/* //^ Image List */}
                        <AppScrollbar>
                          <Box
                            sx={{ m: 2, ml: 8 }}
                            display="grid"
                            gridTemplateColumns="1fr 1fr"
                          >
                            {imageList.map((image, index) => (
                              <Card
                                key={index}
                                sx={{
                                  m: 2,
                                  flexGrow: 1,
                                  minWidth: "100px",
                                  minHeight: "100px",
                                  maxWidth: "200px",
                                  maxHeight: "200px",
                                  backgroundColor: "grey.300",
                                }}
                              >
                                <CardActionArea
                                  onClick={(e) =>
                                    handleClickEvent(
                                      e,
                                      index,
                                      onImageUpdate,
                                      onImageRemove
                                    )
                                  }
                                  sx={{ cursor: "pointer" }}
                                >
                                  <CardMedia
                                    component="img"
                                    src={image.data_url}
                                    alt=""
                                    style={{ borderRadius: "10px" }}
                                  />
                                </CardActionArea>
                              </Card>
                            ))}
                          </Box>
                        </AppScrollbar>
                      </Paper>
                    </Box>
                  </Fragment>
                )}
              </ImageUploading>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* )} */}
    </AppGridContainer>
  );
};

export default Default;
