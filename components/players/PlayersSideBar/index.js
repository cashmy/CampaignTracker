/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-29 17:51:58
 * @modify date 2023-04-01 19:32:23
 * @desc [description]
 */

//#region Imports
import React, { useEffect, useState } from "react";
// * Mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { Zoom } from "@mui/material";
import { blue, green, red, orange } from "@mui/material/colors";
// * Icons
import AddIcon from "@mui/icons-material/Add";
// * Local Components
import AppList from "lib/components/AppList";
import AppScrollbar from "lib/components/AppScrollbar";
import AppsSideBarFolderItem from "lib/components/AppsSideBarFolderItem";
import CampaignSideBarItem from "components/campaigns/CampaignSideBarItem";
import ListEmptyResult from "lib/components/AppList/ListEmptyResult";
import LabelItem from "./LabelItem";
import PageDialog from "../../controls/PageDialog";
import PlayerDialog from "../CreatePlayer/PlayerDialog";
import SidebarPlaceholder from "lib/components/AppSkeleton/SidebarListSkeleton";
import { Fonts } from "lib/constants/AppEnums";
// * Services
import { useInfoViewActionsContext } from "lib/context/AppContextProvider/InfoViewContextProvider";
import { postDataApi } from "lib/hooks/APIHooks";
import CampaignService from "services/campaign.service";
import {
  usePlayersActionsContext,
} from "../PlayersContextProvider";
//#endregion

const SideBarContent = () => {
  //#region //* State & Local Variables
  // TODO: get folderList and labelList from context or Datasoure
  const folderList = [
    { id: 121, name: "All", alias: "all" },
    { id: 124, name: "Starred", alias: "isStarred" },
    { id: 122, name: "Active", alias: "active" },
    { id: 125, name: "Inactive", alias: "inactive" },
  ];
  const labelList = [
    { id: 311, name: "Exp/Vet +DM", alias: "311", color: red[500] },
    { id: 312, name: "Veteran", alias: "312", color: blue[500] },
    { id: 313, name: "Experienced", alias: "313", color: orange[500] },
    { id: 314, name: "Newbie", alias: "314", color: green[500] },
  ];
  const [isAddPlayer, onSetIsAddPlayer] = useState(false);
  const [records, setRecords] = useState([]);
  const { reCallAPI, API_URL } =
  usePlayersActionsContext();
  const infoViewActionsContext = useInfoViewActionsContext();
  //#endregion

  //#region //* Hooks
  useEffect(() => {
    const getTableData = async (e) => {
      try {
        // setLoading(true);
        const response = await CampaignService
          // .getAllRecordsBySts(archiveStatus)
          .getAllRecords()
          .then();
        setRecords(response.data);
        // setLoading(false);
        // setLoadData(false);
      } catch (e) {
        console.log("API call unsuccessful", e);
      }
    };
    getTableData();
  }, []);
  //#endregion

  //#region //* Event Handlers
  const handleAddPlayerOpen = () => {
    onSetIsAddPlayer(true);
  };
  const handleAddPlayerClose = () => {
    onSetIsAddPlayer(false);
  };
  const onAddPlayer = (Player) =>{
      postDataApi(API_URL, infoViewActionsContext, Player, Player.id)
        .then((data) => {
          // onUpdateSelectedPlayer(data);
          infoViewActionsContext.showMessage("Player Added Successfully");
        })
        .catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
      reCallAPI();
      handleAddPlayerClose();
  }
  //#endregion

  return (
    <>
      <Box
        sx={{
          px: { xs: 4, md: 5 },
          pt: { xs: 4, md: 5 },
          pb: 2.5,
        }}
      >
        <Zoom in style={{ transitionDelay: "300ms" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "8px 28px",
              borderRadius: 8,
              "& .MuiSvgIcon-root": {
                fontSize: 26,
              },
            }}
            startIcon={<AddIcon />}
            onClick={handleAddPlayerOpen}
          >
            Create Player
          </Button>
        </Zoom>
      </Box>

      <AppScrollbar className="scroll-app-sidebar">
        <Box
          sx={{
            pr: 4,
            pb: { xs: 4, md: 5, lg: 6.2 },
          }}
        >
          <List
            sx={{
              mb: { xs: 2, xl: 5 },
            }}
            component="nav"
            aria-label="main task folders"
          >
            <AppList
              animation="transition.slideLeftIn"
              data={folderList}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={
                    <Box
                      sx={{
                        px: { xs: 4, md: 5, lg: 6.2 },
                      }}
                    >
                      <SidebarPlaceholder />
                    </Box>
                  }
                />
              }
              renderRow={(item) => (
                <AppsSideBarFolderItem
                  key={item.id}
                  item={item}
                  path={`/players/folder/${item.alias}`}
                />
              )}
            />
          </List>

          <Box
            component="h4"
            sx={{
              mt: { xs: 4, xl: 5 },
              px: { xs: 4, md: 5, lg: 6.2 },
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            Labels
          </Box>

          <List component="nav" aria-label="main mailbox folders">
            <AppList
              animation="transition.slideLeftIn"
              data={labelList}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={
                    <Box
                      sx={{
                        px: { xs: 4, md: 5, lg: 6.2 },
                      }}
                    >
                      <SidebarPlaceholder />
                    </Box>
                  }
                />
              }
              renderRow={(label) => <LabelItem key={label.id} label={label} />}
            />
          </List>

          <Box
            component="h4"
            sx={{
              mt: { xs: 4, xl: 5 },
              px: { xs: 4, md: 5, lg: 6.2 },
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            Campaigns
          </Box>

          <List
            sx={{
              mb: { xs: 2, xl: 5 },
            }}
            component="nav"
            aria-label="main assignment campaigns"
          >
            <AppList
              animation="transition.slideLeftIn"
              data={records}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={
                    <Box
                      sx={{
                        px: { xs: 4, md: 5, lg: 6.2 },
                      }}
                    >
                      <SidebarPlaceholder />
                    </Box>
                  }
                />
              }
              renderRow={(item) => (
                <CampaignSideBarItem
                  key={item.id}
                  item={item}
                  path={`/players/campaign/${item.id}`}
                />
              )}
            />
          </List>

          <PageDialog
            openPopup={isAddPlayer}
            setOpenPopup={handleAddPlayerClose}
            title={"Edit a Player"}
            titleColor={process.env.NEXT_PUBLIC_NX_PRIMARY_COLOR}
            size="md"
          >
            <PlayerDialog
              recordForEdit={null}
              addOrEdit={onAddPlayer}
            />
          </PageDialog>
        </Box>
      </AppScrollbar>
    </>
  );
};

export default SideBarContent;
