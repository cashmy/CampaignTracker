/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-02 12:05:52
 * @modify date 2023-04-02 10:29:29
 * @desc [description]
 */

//#region //* Imports
import { useState } from "react";
import PropTypes from "prop-types";
// * Mui Components
import { Box, Button, IconButton, ListItem, ListItemText } from "@mui/material";
import { TreeView, TreeItem, treeItemClasses } from "@mui/lab";
import { alpha, styled } from "@mui/material/styles";
// * Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MoreVert } from "@mui/icons-material";
// * Local Components
import AppScrollbar from "lib/components/AppScrollbar";
import SessionNodes from "./SessionNodes";
import ActionIconButton from "components/controls/ActionIconButton";
// * Services/Contexts
import {
  useAdventuresContext,
  useAdventuresActionsContext,
} from "components/adventures/AdventuresContextProvider";
// import { useSessionsContext, useSessionsActionsContext } from "components/sessions/SessionsContextProvider";
//#endregion

//#region //* Styles
const StyledTreeItem = styled((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));
//#endregion

const CampaignAdvSessTree = (props) => {
  //#region //* State & local variables
  const { record } = props; // Campaign record
  const { adventuresList } = useAdventuresContext();
  const { reCallAPI, API_URL } = useAdventuresActionsContext();
  const [expanded, setExpanded] = useState([]);
  // const [selected, setSelected] = useState([]);
  var expandArray = ["999"];
  //#endregion

  const handleExpandClick = () => {
    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? expandArray : []));
  };
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };
  // const handleSelect = (event, nodeIds) => {
  //   setSelected(nodeIds);
  // };
  const handleMenu = (adventure) => {
    alert("Menu for " + adventure.name)
  }

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
            {adventuresList.length > 0 ? (
              adventuresList.map((adventure) => {
                expandArray.push("a-" + adventure.id);
                return (
                  <>
                    <ListItem
                      sx={{ p: 0 }}
                      secondaryAction={
                        <IconButton
                          // edge="end"
                          sx={{ width: 24, height: 24, fontSize: "20px" }}
                          onClick={() => handleMenu(adventure)}
                        >
                          <MoreVert fontSize="12px" />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={
                          <TreeItem
                            nodeId={"a-" + adventure.id}
                            label={adventure.name}
                          >
                            {/* //& Loop through Sessions */}
                            <SessionNodes adventure={adventure} />
                          </TreeItem>
                        }
                      />
                    </ListItem>
                  </>
                );
              })
            ) : (
              <TreeItem
                sx={{ mt: 5, mb: 2, textAlign: "center" }}
                key={"s-0"}
                nodeId={"s-0"}
                label={
                  <Button color="primary" variant="contained" size="small">
                    Add an Adventure
                  </Button>
                }
              />
            )}
          </TreeItem>
        </AppScrollbar>
      </TreeView>
    </>
  );
};

export default CampaignAdvSessTree;

CampaignAdvSessTree.propTypes = {
  record: PropTypes.object.isRequired,
};
