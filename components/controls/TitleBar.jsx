/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2022-06-09 23:36:38
 * @modify date 2022-06-09 23:36:38
 * @desc Title bar for a table like page.
 */

//#region [General imports]
import * as React from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Fab,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Inventory2TwoToneIcon from "@mui/icons-material/Inventory2TwoTone";
import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import FormatListNumberedRoundedIcon from "@mui/icons-material/FormatListNumberedRounded";

// * Helper functions
import { stringAvatar } from "lib/helpers/avatarFn";

//#endregion

export default function TitleBar(props) {
  const {
    avatarIcon = "none",
    avatarImage = "",
    componentTitle,
    toolTipText,

    addFab,
    primaryColor,
    addToolTip,
    handleAdd,

    returnFab,
    secondaryColor,

    archiveFab,
    archiveStatus = false,
    handleArchive,
    archiveColor,

    toggleFab,
    toggleStatus = false,
    handleDisplay,
    toggleColor,

    searchBar,
  } = props;

  const router = useRouter();
  const returnSpace = 2 + (addFab ? 7 : 0);
  const archiveSpace = 2 + (addFab ? 7 : 0) + (returnFab ? 7 : 0);

  const returnToParent = () => {
    router.back();
  };

  const defaultHandleAdd = () => {
    alert("Adding a new item... \nNot yet implemented");
  };

  return (
    <Paper
      elevation={10}
      sx={{
        height: "100%",
        // display: "flex",
        flexDirection: "flex-row",
        alignItems: "center",
        borderRadius: "10px",
        gridColumn: "1/-1",
        // bgcolor: 'grey',
        display: { xs: "none", sm: "grid" },
        gridTemplateColumns: ".1fr 1fr 1fr .5fr .1fr .1fr .1fr",
        "& > *": {
          p: 2,
          "&:nth-of-type(n):not(:nth-last-of-type(-n+4))": {
            borderBottom: "1px solid",
            borderColor: "divider",
          },
        },
      }}
    >
      {/* //& Avatar/Icon/None */}
      {avatarIcon == "image" && (
        <Box sx={{ width: "85px" }}>
          <Card>
            <CardMedia>
              <img
                src={`${avatarImage}`}
                // width="200px"
              />
            </CardMedia>
          </Card>
        </Box>
      )}
      {avatarIcon == "icon" && (
        <IconButton size="lg" variant="plain" sx={{ ml: 1 }}>
          {avatarImage}
        </IconButton>
      )}
      {avatarIcon == "none" && <Typography />}
      {/* //& Component Title */}
      <Typography variant="h4" sx={{ marginLeft: 1.5, marginTop: 0.25 }}>
        {toolTipText && <Tooltip>toolTipText</Tooltip>}
        {componentTitle || "Component Title Goes Here"}
      </Typography>
      {/* //& Search Bar */}
      {!searchBar && <Typography />}
      {searchBar && (
        <TextField
          size="sm"
          placeholder="Search projects by name"
          startDecorator={<SearchRoundedIcon color="primary" />}
          endDecorator={
            <IconButton
              variant="outlined"
              size="sm"
              color="neutral"
              onClick={() => alert("/ clicked")}
            >
              <Typography fontWeight="lg" fontSize="sm">
                /
              </Typography>
            </IconButton>
          }
          sx={{
            flexBasis: "500px",
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        />
      )}
      <Typography /> {/* //& Spacer */}
      {/* //& Optional Toggle Button */}
      {toggleFab && (
        <Tooltip
          title={"Switch to " + (!toggleStatus ? "Grid" : "List") + " view"}
        >
          <Button
            sx={{ m: 1.5 }}
            variant="outlined"
            color={toggleColor || "primary"}
            aria-label="switch display view"
            size="sm"
            onClick={handleDisplay}
          >
            {!toggleStatus ? (
              <GridViewRoundedIcon />
            ) : (
              <FormatListNumberedRoundedIcon />
            )}
            {/* <Inventory2TwoToneIcon /> */}
          </Button>
        </Tooltip>
      )}
      {/* //& Optional Archive Button */}
      {archiveFab && (
        <Tooltip title={"Switch to " + (!archiveStatus ? "Archive" : "Active")}>
          <Button
            sx={{
              m: 1.5,
              // position: "absolute",
              // right: theme.spacing(archiveSpace)
            }}
            color={archiveColor || "info"}
            aria-label="return to previous display"
            size="sm"
            onClick={handleArchive}
          >
            {!archiveStatus ? (
              <Inventory2TwoToneIcon />
            ) : (
              <InventoryTwoToneIcon />
            )}
            {/* <Inventory2TwoToneIcon /> */}
          </Button>
        </Tooltip>
      )}
      {/* //& Optional Return Button */}
      {returnFab && (
        <Tooltip title="Return to previous display">
          <Button
            sx={{
              m: 1,
              // position: "absolute",
              // right: theme.spacing(returnSpace)
            }}
            color={secondaryColor || "secondary"}
            aria-label="return to previous display"
            size="sm"
            onClick={returnToParent}
          >
            <ArrowBackIcon />
          </Button>
        </Tooltip>
      )}
      {/* //& Optional Add Button */}
      {addFab && (
        <Tooltip title={addToolTip || "Add a new item"}>
          <Button
            sx={{
              m: 1.5,
              // position: "absolute",
              // right: theme.spacing(1)
            }}
            color={primaryColor || "primary"}
            aria-label={addToolTip || "Add a new item"}
            size="sm"
            onClick={handleAdd || defaultHandleAdd}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      )}
    </Paper>
  );
}
