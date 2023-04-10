/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-04-01 20:33:37
 * @modify date 2023-04-06 17:06:09
 * @desc [description]
 */

//#region //* Imports
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// * Mui Components
import {
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { TreeItem } from "@mui/lab";
// * Icons
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LoopIcon from "@mui/icons-material/Loop";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// * Local components
import Controls from "components/controls/Controls";
import PageDialog from "components/controls/PageDialog";
import SessionDialog from "components/sessions/SessionDialog";
import { useInfoViewActionsContext } from "lib/context/AppContextProvider/InfoViewContextProvider";
// * Services
import SessionService from "services/session.service";
import { sessionRecord as emptyRecord } from "dataModels/session";
//#endregion

const SessionNodes = (props) => {
  //#region //* State & local variables
  const { adventure, requestReload } = props;
  const [records, setRecords] = useState([]);
  const [showSessionDialog, setShowSessionDialog] = useState(false);
  const [sessionRecord, setSessionRecord] = useState(null);
  const [loadData, setLoadData] = useState(false);
  const infoViewActionsContext = useInfoViewActionsContext();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  //#endregion

  //#region //* Hooks
  useEffect(() => {
    const getTableData = async (e) => {
      try {
        const response =
          await SessionService.getAllRecordsByAdventureAndSessionDate(
            adventure.id
          ).then();
        setRecords(response.data);
        setLoadData(false);
      } catch (e) {
        console.log("API call unsuccessful", e);
      }
    };
    getTableData();
  }, [adventure, loadData]);
  //#endregion

  //#region //* Event Handlers
  const sessionIcons = (status) => {
    switch (status) {
      case "sc":
        return (
          // <Avatar size="small" sx={{ width: 20, height: 20 }}>
          <CheckIcon
            fontSize="24px"
            sx={{ backgroundColor: "lightslategray" }}
          />
          // </Avatar>
        );
      case "ip":
        return <LoopIcon fontSize="24px" sx={{ backgroundColor: "purple" }} />;
      case "pl":
        return (
          <MailOutlineIcon
            fontSize="24px"
            sx={{ backgroundColor: "darkgoldenrod" }}
          />
        );
      default:
        return (
          <HelpOutlineIcon
            fontSize="24px"
            sx={{ backgroundColor: "darkred" }}
          />
        );
    }
  };
  const sideQuestIcon = (record) => {
    if (record.sideQuest) {
      return " 🏰" + " " + record.name;
    } else {
      return record.name;
    }
  };
  const handleEdit = (session) => {
    setSessionRecord(session);
    setShowSessionDialog(true);
  };
  const handleAdd = (adventureId) => {
    emptyRecord.adventureId = adventureId;
    setSessionRecord(emptyRecord);
    setShowSessionDialog(true);
  };
  const addOrEdit = (session, resetForm) => {
    let close = false;
    if (session.id === 0) {
      SessionService.addRecord(session);
      resetForm();
      requestReload();
      setLoadData(true);
      infoViewActionsContext.showMessage("Session Added Successfully");
    } else {
      SessionService.updateRecord(session);
      requestReload();
      close = true;
      setLoadData(true);
      infoViewActionsContext.showMessage("Session Updated Successfully");
    }
    if (close) {
      resetForm();
      setSessionRecord(emptyRecord);
      setShowSessionDialog(false);
    }
  };
  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to delete this entry?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        onDelete(id);
      },
    });
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    SessionService.deleteRecord(id);
    setLoadData(true); // Request reload of data
    infoViewActionsContext.showMessage("Session Deleted Successfully");
  };
  //#endregion

  return (
    <>
      {records.length > 0
        ? records.map((session) => (
            <Tooltip title={session.description} placement="left-start" arrow>
              <TreeItem
                sx={{ mt: 2, mb: 2 }}
                key={"s-" + adventure.id + session.id}
                nodeId={"s-" + adventure.id + session.id}
                label={
                  <Typography>
                    {sessionIcons(session.status)} {sideQuestIcon(session)}
                  </Typography>
                }
                // onClick={() => handleMenuClick(e, session)}
                onClick={() => handleEdit(session)}
              />
            </Tooltip>
          ))
        : null}
      <TreeItem
        sx={{ mt: 2, mb: 2 }}
        key={"s-" + adventure.id}
        nodeId={"s-" + adventure.id}
        label={
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => handleAdd(adventure.id)}
          >
            Add a session
          </Button>
        }
      />

      {/* //* Dialogs, Modals, & Popups */}
      {/* //& Edit Session Schedule */}
      <PageDialog
        openPopup={showSessionDialog}
        setOpenPopup={setShowSessionDialog}
        title="Add/Edit Session Schedule"
        titleColor={process.env.NEXT_PUBLIC_NX_PRIMARY_COLOR}
        size="sm"
      >
        <SessionDialog recordForEdit={sessionRecord} addOrEdit={addOrEdit} />
      </PageDialog>
      {/* //& Confirm Delete */}
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      {/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        aria-labelledby="basic-menu-button"
        // placement="bottom-end"
      >
        {/* //& Edit Item */}
      {/* <MenuItem
          key="edit"
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
        </MenuItem> */}
      {/* //& Delete Item */}
      {/* <MenuItem
          key="delete"
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
        </MenuItem> */}
      {/* </Menu>  */}
    </>
  );
};

export default SessionNodes;

SessionNodes.propTypes = {
  adventure: PropTypes.object.isRequired,
  requestReload: PropTypes.func.isRequired,
};
