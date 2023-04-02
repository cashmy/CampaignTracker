/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-04-01 20:33:37
 * @modify date 2023-04-02 10:03:16
 * @desc [description]
 */

//#region //* Imports
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// * Mui Components
import { Avatar, Button, Tooltip, Typography } from "@mui/material";
import { TreeItem } from "@mui/lab";
// * Icons
import LoopIcon from "@mui/icons-material/Loop";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckIcon from "@mui/icons-material/Check";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// * Services
import SessionService from "services/session.service";
//#endregion

const SessionNodes = (props) => {
  //#region //* State & local variables
  const { adventure } = props;
  const [records, setRecords] = useState([]);
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
      } catch (e) {
        console.log("API call unsuccessful", e);
      }
    };
    getTableData();
  }, [adventure]);
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
  const handleMenu = (session) => {
    alert("You clicked on " + session.name);
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
                onClick={() => handleMenu(session)}
              />
            </Tooltip>
          ))
        : null}
      <TreeItem
        sx={{ mt: 2, mb: 2 }}
        key={"s-" + adventure.id}
        nodeId={"s-" + adventure.id}
        label={
          <Button variant="contained" size="small" color="secondary">
            Add a session
          </Button>
        }
      />
    </>
  );
};

export default SessionNodes;

SessionNodes.propTypes = {
  adventure: PropTypes.object.isRequired,
};
