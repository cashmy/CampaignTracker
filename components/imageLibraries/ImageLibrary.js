/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-11 11:01:55
 * @modify date 2023-04-05 20:08:19
 * @desc [description]
 */

//#region //* Imports
import { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import ImageUploading from "react-images-uploading";
// * Mui
import {
  Button,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
// * Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ImageTwoToneIcon from "@mui/icons-material/ImageTwoTone";
import { IoImage, IoImages } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { GiToken } from "react-icons/gi";
import { RiSideBarFill } from "react-icons/ri";
// * Local Components
// import AppAnimate from '@/../../lib/components/AppAnimate';
import AppGridContainer from "lib/components/AppGridContainer";
import AppScrollbar from "lib/components/AppScrollbar";
import Controls from "/components/controls/Controls";
import ImageDialog from "./ImageDialog";
import Notification from "../../components/controls/Notification";
import PageDialog from "components/controls/PageDialog";
import TitleBar from "/components/controls/TitleBar";
import ViewImageDialog from "./ViewImageDialog";
// * Services
import {
  useImagesContext,
  useImagesActionsContext,
} from "./ImagesContextProvider";
//#endregion

const ImageLibrary = (props) => {
  // #region //* Local State
  const { imageType } = props;
  const [images, setImages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [currentItem, setCurrentItem] = useState();
  const maxNumber = 69;
  const open = Boolean(anchorEl);
  const { all, page, loading, recordsList } = useImagesContext();
  const { onPageChange, setRecordsData } = useImagesActionsContext();
  const [data, setData] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  // #endregion

  // #region //* Hooks
  useEffect(() => {
    if (recordsList instanceof Array) {
      setData(recordsList);
    }
  }, [recordsList]);
  // #endregion

  // #region //* Event Handlers
  function convertToFormData(obj, mode) {
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
  }
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
  const addOrEdit = (record, resetForm) => {
    let close = false;
    // TODO: Add endpoint to update database
    // updateImage(convertToFormData(record, "edit"));
    close = true;

    if (close) {
      resetForm();
      setRecordForEdit(null);
      setOpenPopup(false); // Close Popup modal
      handleMenuClose(); // Close Menu modal
    }

    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to delete this Image?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        onDelete(id);
      },
    });
    handleMenuClose();
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    // TODO: Add endpoint to delete record & image from database
    // deleteImage(id);
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
  };
  const handleEdit = (record) => {
    setRecordForEdit(record);
    // alert(`Editing image ${record.fileName} in database file`);
    setOpenPopup(true);
  };
  const handleClickEvent = (event, index, onImageUpdate, onImageRemove) => {
    if (event.shiftKey) onImageRemove(index);
    else onImageUpdate(index);
  };
  const handleMenuClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setCurrentItem(item);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentItem(null);
  };
  const handleSelection = (item) => {
    // selectImage(item);
    setRecordForEdit(item);
    setOpenView(true);
    // exit modal close.
  };
  const handleDialogClose = () => {
    setOpenPopup(false);
    handleMenuClose();
  };
  const selectAvatarImage = (imageType) => {
    switch (imageType) {
      case "i":
        return <IoImage />;
      case "a":
        return <RxAvatar />;
      case "t":
        return <GiToken />;
      case "s":
        return <RiSideBarFill />;
      default:
        return <IoImages />;
    }
  };
  const selectTitleText = (imageType) => {
    switch (imageType) {
      case "i":
        return "Images Library";
      case "a":
        return "Avatars Library";
      case "t":
        return "Tokens Library";
      case "s":
        return "SideBar Library";
      default:
        return "All Images";
    }
  };
  const selectDialogTitle = (imageType) => {
    switch (imageType) {
      case "i":
        return "Image";
      case "a":
        return "Avatar";
      case "t":
        return "Token";
      case "s":
        return "SideBar";
      default:
        return "Image Details";
    }
  };
  const selectImageSize = (imageType) => {
    switch (imageType) {
      case "i":
        return {
          ml: "auto",
          aspectRatio: "4/3",
          width: "140px",
          cursor: "pointer",
          borderRadius: "10px",
        };
      case "a":
        return {
          mt: 2,
          ml: "auto",
          mr: "auto",
          aspectRatio: "1/1",
          width: "100px",
          cursor: "pointer",
          borderRadius: "50px",
        };
      case "t":
        return {
          mt: 2,
          ml: "auto",
          mr: "auto",
          aspectRatio: "1/1",
          width: "100px",
          cursor: "pointer",
          borderRadius: "10px",
        };
      case "s":
        return {
          aspectRatio: "1/2.5",
          mt: 1,
          ml: "auto",
          mr: "auto",
          width: "40px",
          cursor: "pointer",
          border: "1px solid grey",
        };
      default:
        return {
          ml: "auto",
          aspectRatio: "4/3",
          width: "140px",
          cursor: "pointer",
          borderRadius: "10px",
        };
    }
  };
  const selectImageStyle = (imageType) => {
    if (imageType == "s") return "flex";
    else return null;
  };
  // #endregion

  return (
    <AppGridContainer>
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
            componentTitle={selectTitleText(imageType)}
            avatarIcon="icon"
            avatarImage={selectAvatarImage(imageType)}
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
                  // overflowY: "auto",
                  borderRadius: "10px",
                }}
              >
                <AppScrollbar>
                  <Box sx={{ m: 3 }} display="flex">
                    {/* //& Page: Card Table Body */}
                    {loading ? (
                      <Typography>Loading...</Typography>
                    ) : (
                      data.map((item, index) => (
                        <Card
                          key={index}
                          sx={{
                            m: 2,
                            p: 1,
                            width: "150px",
                            height: "175px",
                            borderRadius: "10px",
                            boxShadow: "3px 3px 3px 3px rgba(0,0,0,0.2)",
                            display: selectImageStyle(item.imageType),
                          }}
                        >
                          {/* //& Card Image */}
                          <CardMedia
                            component="img"
                            sx={selectImageSize(item.imageType)}
                            src={item.fileUrl != "" ? item.fileUrl : NoImage}
                            alt={
                              item.altText != "" && item.altText != null
                                ? item.altText
                                : item.fileName
                            }
                            onClick={() => handleSelection(item)}
                          />
                          <CardContent
                            sx={{
                              mt: "auto",
                              // flexGrow: 0,
                              // flexDirection: "row",
                              // alignItems: "end",
                              // justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                pt: 2,
                                display: "flex",
                                flex: "flex-row",
                                alignItems: "center",
                              }}
                            >
                              <Grid item xs={10}>
                                <Typography variant="body2" sx={{}}>
                                  {item.altText.length > 15 && item.id != 1
                                    ? item.altText.substring(0, 14) + "..."
                                    : item.altText}
                                </Typography>
                              </Grid>
                              <Grid item xs={2}>
                                {/* //& MoreVertical */}
                                {item.id != 1 && (
                                  <Controls.ActionButton
                                    size="small"
                                    tooltipText="More options"
                                    aria-controls={
                                      open ? "basic-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    aria-label={`more options for ${item.name}`}
                                    onClick={(e) => {
                                      handleMenuClick(e, item);
                                    }}
                                  >
                                    <MoreVertIcon
                                      sx={{ color: "grey", fontSize: 20 }}
                                    />
                                  </Controls.ActionButton>
                                )}
                              </Grid>
                            </Box>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </Box>
                </AppScrollbar>
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
                                    sx={{
                                      aspectRatio: "4/3",
                                      borderRadius: "10px",
                                    }}
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
      {/* //* Dialogs, Modals, Menus & Popups */}
      <Notification notify={notify} setNotify={setNotify} />
      <PageDialog
        openPopup={openPopup}
        setOpenPopup={handleDialogClose}
        title={selectDialogTitle(recordForEdit?.imageType) + " Details"}
        titleColor={process.env.NEXT_PUBLIC_NX_PRIMARY_COLOR}
        size={"sm"}
      >
        <ImageDialog recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </PageDialog>
      <PageDialog
        openPopup={openView}
        setOpenPopup={setOpenView}
        title={selectDialogTitle(recordForEdit?.imageType) + " View"}
        titleColor={process.env.NEXT_PUBLIC_NX_PRIMARY_COLOR}
        size={"md"}
      >
        <ViewImageDialog record={recordForEdit} />
      </PageDialog>
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        aria-labelledby="basic-menu-button"
        // placement="bottom-end"
      >
        {/* //& Edit Item */}
        <MenuItem
          onClick={() => handleEdit(currentItem)}
          variant="plain"
          color="neutral"
          aria-label="edit image"
          size="sm"
        >
          <ListItemIcon>
            <EditOutlinedIcon style={{ color: "green" }} />
          </ListItemIcon>
          <Typography level="body2">Edit</Typography>
        </MenuItem>
        {/* //& Delete Item */}
        <MenuItem
          onClick={() => handleDelete(currentItem.id)}
          variant="plain"
          color="neutral"
          aria-label="delete image"
          size="sm"
        >
          <ListItemIcon>
            <DeleteIcon style={{ color: "red" }} />
          </ListItemIcon>
          <Typography level="body2">Delete</Typography>
        </MenuItem>
      </Menu>
    </AppGridContainer>
  );
};

export default ImageLibrary;

ImageLibrary.propTypes = {
  imageType: PropTypes.string,
};

ImageLibrary.defaultProps = {
  imageType: "i",
};
