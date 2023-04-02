/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-02 12:05:52
 * @modify date 2023-04-02 14:41:11
 * @desc [description]
 */

//#region //* Imports
import { useState } from "react";
import PropTypes from "prop-types";
// * Mui Components
import { Box, Button, IconButton, ListItem, ListItemText } from "@mui/material";
import { TreeView, TreeItem, treeItemClasses } from "@mui/lab";
import { alpha, styled, useTheme } from "@mui/material/styles";
// * Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// * Local Components
import AppScrollbar from "lib/components/AppScrollbar";
import AdventureDialog from "components/adventures/AdventureDialog"
import AdventureActionItemMenu from "./AdventureActionItems";
import Controls from "components/controls/Controls";
import PageDialog from "components/controls/PageDialog";
import SessionNodes from "./SessionNodes";
import { useInfoViewActionsContext } from "lib/context/AppContextProvider/InfoViewContextProvider";
// * Services/Contexts
import { AdventureRecord as emptyAdvRecord } from "dataModels/adventure";
import { deleteDataApi, postDataApi, putDataApi } from "lib/hooks/APIHooks";
import {
  useAdventuresContext,
  useAdventuresActionsContext,
} from "components/adventures/AdventuresContextProvider";
//#endregion

//#region //* Styles
const LabelItemWrapper = styled(ListItem)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 14,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingLeft: 14,
    paddingRight: 10,
    cursor: "pointer",
    overflow: "hidden",
    "&.rootCheck": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: `0 3px 5px 0 ${alpha(theme.palette.common.black, 0.08)}`,
    },
    "& .conActionHoverHideRoot": {
      transition: "all 0.4s ease",
    },
    "&:hover": {
      "& .conActionHoverRoot": {
        opacity: 1,
        visibility: "visible",
        right: 0,
      },
      "& .conActionHoverHideRoot": {
        opacity: 0,
        visibility: "hidden",
      },
      "& .CampaignAdvSessTree": {
        [theme.breakpoints.up("sm")]: {
          width: "calc(100% - 114px)",
        },
      },
    },
  };
});
//#endregion

const CampaignAdvSessTree = (props) => {
  //#region //* State & local variables
  const { record } = props; // Campaign record
  const { adventuresList } = useAdventuresContext();
  const { reCallAPI, API_URL_BASE } = useAdventuresActionsContext();
  const [expanded, setExpanded] = useState([]);
  const [adventureRecord, setAdventureRecord] = useState([]);
  const [showAdventure,setShowAdventure] = useState(false);
  const theme = useTheme();
  var expandArray = ["999"];
  const infoViewActionsContext = useInfoViewActionsContext();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  //#endregion

  //#region //* Event Handlers
  const adventureAddEdit = (adventure, resetForm) => {
    let close = false;
    if (adventure.id === 0) {
      postDataApi(API_URL_BASE, infoViewActionsContext, adventure, adventure.id)
      .then((data) => {
        infoViewActionsContext.showMessage("Adventure Added Successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    } else {
      putDataApi(API_URL_BASE, infoViewActionsContext, adventure, adventure.id)
      .then((data) => {
        infoViewActionsContext.showMessage("Adventure Updated Successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
      close = true;
    }
    if (close) {
      resetForm();
      setAdventureRecord(null);
      setShowAdventure(false); 
    }
    reCallAPI();
    // TODO Add notification message
  }
  const handleExpandClick = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? expandArray : []));
  };
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };
  const handleAdventureAdd = (adventure) => {
    setAdventureRecord(emptyAdvRecord);
    setShowAdventure(true);
  };
  const handleAdventureEdit = (adventure) => {
    setAdventureRecord(adventure);
    setShowAdventure(true);
  };
  const handleAdventureView = (adventure) => {
    alert("View " + adventure.name);
  };
  const handleAdventureDelete = (adventure) => {
    // alert("Delete " + adventure.name);
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to delete this entry?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        onDelete(adventure.id);
      },
    });
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deleteDataApi(API_URL_BASE,
      infoViewActionsContext,
      {recordIds: [id] }
    )
      .then((data) => {
        infoViewActionsContext.showMessage("Player Deleted Successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
      reCallAPI();
  };
  const generateLabel = (adventure) => {
    return (
      <LabelItemWrapper dense button className="item-hover">
        {/* //^ All items */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            // width: { xs: "25%", sm: "20%", md: "50%" },
            width: "100%",
          }}
        >
          {/* //& Actions Text */}
          <Box
            sx={{
              transition: "all 0.4s ease",
              display: "flex",
              alignItems: "center",
              width: "100%",
              // width: { xs: "25%", sm: "20%", md: "50%" },
            }}
            className="CampaignAdvSessTree"
          >
            {/* //& Action Text */}
            <Box
              component="span"
              sx={{
                mr: 4,
                flex: 1,
                display: { xs: "none", md: "block" },
                // overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Actions
            </Box>
          </Box>

          {/* //& Action Menu */}
          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            <AdventureActionItemMenu
              record={adventure}
              handleEdit={handleAdventureEdit}
              // handleView={handleAdventureView}
              handleDelete={handleAdventureDelete}
            />
          </Box>
        </Box>
      </LabelItemWrapper>
    );
  };
  //#endregion

  return (
    <>
      <Box sx={{ mb: 1, textAlign: "center" }}>
        <Button onClick={handleExpandClick}>
          {expanded.length === 0 ? "Expand all" : "Collapse all"}
        </Button>
      </Box>
      <TreeView
        aria-label="customized"
        defaultExpanded={["1"]}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        // selected={selected}
        onNodeToggle={handleToggle}
        sx={{ height: 550, flexGrow: 1, maxWidth: 400, overflow: "auto" }}
      >
        <AppScrollbar>
          <TreeItem nodeId="999" label="Adventures & Sessions">
            {/* //& Loop through Adventures */}
            {adventuresList.length > 0
              ? adventuresList.map((adventure) => {
                  expandArray.push("a-" + adventure.id);
                  return (
                    <>
                      <TreeItem
                        nodeId={"a-" + adventure.id}
                        label={adventure.name}
                      >
                        {generateLabel(adventure)}
                        {/* //& Loop through Sessions */}
                        <SessionNodes adventure={adventure} />
                      </TreeItem>
                    </>
                  );
                })
              : null}
            <TreeItem
              sx={{mt:1, mb: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}
              key={"s-0"}
              nodeId={"s-0"}
              label={
                
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={handleAdventureAdd}
                >
                  Add an Adventure
                </Button>
              }
            />
          </TreeItem>
        </AppScrollbar>
      </TreeView>
      {/* //* Dialogs, Modals, & Popups */}
      {/* //& Edit Adventure */}
      <PageDialog
        openPopup={showAdventure}
        setOpenPopup={setShowAdventure}
        title="Add/Edit an Adventure"
        titleColor={process.env.NEXT_PUBLIC_NX_PRIMARY_COLOR}
        size="md"
      >
        <AdventureDialog recordForEdit={adventureRecord} addOrEdit={adventureAddEdit} />
      </PageDialog>
      {/* //& Delete Confirmation */}
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default CampaignAdvSessTree;

CampaignAdvSessTree.propTypes = {
  record: PropTypes.object.isRequired,
};
