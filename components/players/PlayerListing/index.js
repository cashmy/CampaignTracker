/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-19 11:56:15
 * @modify date 2023-04-02 14:33:45
 * @desc [description]
 */

//#region Imports
import { useState } from "react";
// * Mui
import { Hidden } from "@mui/material";
// * Local Components
import AppConfirmDialog from "@/../../lib/components/AppConfirmDialog";
import AppsContent from "@/../../lib/components/AppContainer/AppContent";
import AppsFooter from "@/../../lib/components/AppContainer/AppFooter";
import AppsHeader from "@/../../lib/components/AppContainer/AppHeader";
import AppsPagination from "@/../../lib/components/AppsPagination";
import Controls from "components/controls/Controls";
import PlayerDialog from "../CreatePlayer/PlayerDialog";
import PlayerDetail from "../PlayerDetail";
import PlayerHeader from "./PlayerHeader";
import PlayerView from "./PlayerView";
import PageDialog from "../../controls/PageDialog";
// * Services
import { useInfoViewActionsContext } from "lib/context/AppContextProvider/InfoViewContextProvider";
import { deleteDataApi, patchDataApi, putDataApi } from "lib/hooks/APIHooks";
import {
  usePlayersActionsContext,
  usePlayersContext,
} from "../PlayersContextProvider";
//#endregion

const PlayerListing = () => {
  //#region //* State & Local Variables
  const { all, page, PlayersList } = usePlayersContext();
  const { onPageChange, setPlayersData, reCallAPI, API_URL } =
    usePlayersActionsContext();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [filterText, onSetFilterText] = useState("");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [checkedPlayers, setCheckedPlayers] = useState([]);
  const [toDeletePlayers, setToDeletePlayers] = useState([]);
  const [isAddPlayer, onSetIsAddPlayer] = useState(false);
  const [isShowDetail, onShowDetail] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });
  //#endregion

  //#region //* Event Handlers
  const handleAddPlayerOpen = () => {
    onSetIsAddPlayer(true);
  };
  const handleAddPlayerClose = () => {
    onSetIsAddPlayer(false);
  };
  const onViewPlayerDetail = (Player) => {
    setSelectedPlayer(Player);
    onShowDetail(true);
  };
  const onOpenEditPlayer = (Player) => {
    setSelectedPlayer(Player);
    handleAddPlayerOpen();
  };
  const onChangeCheckedPlayers = (event, id) => {
    if (event.target.checked) {
      setCheckedPlayers(checkedPlayers.concat(id));
    } else {
      setCheckedPlayers(checkedPlayers.filter((PlayerId) => PlayerId !== id));
    }
  };
  const onChangeActive = (status, record) => {
    const selectedIdList = [record.id];
    onChangeStatuses(status, "active", selectedIdList);
  };
  const onChangeStarred = (status, record) => {
    const selectedIdList = [record.id];
    onChangeStatuses(status, "isStarred", selectedIdList);
  };
  const onChangeStatuses = (status, field, selectedIdList) => {
    patchDataApi(API_URL, infoViewActionsContext, {
      ids: selectedIdList,
      value: status,
      path: field,
      op: "replace",
    })
      .then((data) => {
        // onUpdateSelectedPlayer(data);
        infoViewActionsContext.showMessage(
          field === "isStarred"
            ? data.isStarred
              ? "Player Marked as Starred Successfully"
              : "Player Marked as Unstarred Successfully"
            : data.active
            ? "Player Marked as Active Successfully"
            : "Player Marked as Inactive Successfully"
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    reCallAPI();
  };
  const onUpdateSelectedPlayer = (Player) => {
    setPlayersData({
      data: PlayersList?.map((item) => {
        if (item.id === Player.id) {
          return Player;
        }
        return item;
      }),
      count: PlayersList?.length,
    });
  };
  const onUpdatePlayers = (Players) => {
    setPlayersData({
      data: PlayersList?.map((item) => {
        const Player = Players.find((Player) => Player.id === item.id);
        if (Player) {
          return Player;
        }
        return item;
      }),
      count: PlayersList?.length,
    });
  };
  const onUpdatePlayer = (Player) => {
    setSelectedPlayer(Player);
    putDataApi(API_URL, infoViewActionsContext, Player, Player.id)
      .then((data) => {
        onUpdateSelectedPlayer(data);
        infoViewActionsContext.showMessage("Player Updated Successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    reCallAPI();
    handleAddPlayerClose();
  };
  const onGetFilteredItems = () => {
    if (filterText === "") {
      return PlayersList;
    } else {
      return PlayersList?.filter((Player) => {
        return (
          Player.playerName.toUpperCase().includes(filterText.toUpperCase()) ||
          Player.email.toUpperCase().includes(filterText.toUpperCase()) ||
          Player.discordId.toUpperCase().includes(filterText.toUpperCase()) ||
          Player.timeZone.toUpperCase().includes(filterText.toUpperCase())
        );
      });
    }
  };
  const list = onGetFilteredItems();
  const onDeleteSelectedPlayers = () => {
    console.log("onDeleteSelectedPlayers: ", toDeletePlayers)
    deleteDataApi(API_URL,
      infoViewActionsContext,
      {recordIds: toDeletePlayers }
    )
      .then((data) => {
        // setPlayersData(data);
        infoViewActionsContext.showMessage("Player Deleted Successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    setDeleteDialogOpen(false);
    setCheckedPlayers([]);
    reCallAPI();
  };
  const onSelectPlayersForDelete = (PlayerIds) => {
    setToDeletePlayers(PlayerIds);
    setDeleteDialogOpen(true);
  };
  const onSelectPlayersForStatusChg = (PlayerIds) => {
    setCheckedPlayers(PlayerIds);
    onChangeStatuses(false, "active", checkedPlayers);
    setCheckedPlayers([]);
  };
  const handleReload = () => {
    setNotify({
      isOpen: true,
      message: "Data reload requested",
      type: "info",
    });
    reCallAPI();
  };
  //#endregion

  return (
    <>
      <AppsHeader>
        <PlayerHeader
          checkedPlayers={checkedPlayers}
          setCheckedPlayers={setCheckedPlayers}
          filterText={filterText}
          onUpdatePlayers={onUpdatePlayers}
          onSelectPlayersForDelete={onSelectPlayersForDelete}
          onSelectPlayersForStatusChg={onSelectPlayersForStatusChg}
          onSetFilterText={onSetFilterText}
          handleReload={handleReload}
        />
      </AppsHeader>
      <AppsContent>
        <PlayerView
          list={list}
          handleAddPlayerOpen={handleAddPlayerOpen}
          onChangeCheckedPlayers={onChangeCheckedPlayers}
          onChangeStarred={onChangeStarred}
          onChangeActive={onChangeActive}
          checkedPlayers={checkedPlayers}
          onSelectPlayersForDelete={onSelectPlayersForDelete}
          onViewPlayerDetail={onViewPlayerDetail}
          onOpenEditPlayer={onOpenEditPlayer}
        />
      </AppsContent>

      <Hidden smUp>
        {PlayersList?.length > 0 ? (
          <AppsFooter>
            <AppsPagination
              count={PlayersList?.length}
              page={page}
              onPageChange={onPageChange}
            />
          </AppsFooter>
        ) : null}
      </Hidden>

      <PageDialog
        openPopup={isAddPlayer}
        setOpenPopup={handleAddPlayerClose}
        title={"Edit a Player"}
        titleColor={process.env.NEXT_PUBLIC_NX_PRIMARY_COLOR}
        size="md"
      >
        <PlayerDialog recordForEdit={selectedPlayer} addOrEdit={onUpdatePlayer} />
      </PageDialog>

      <PlayerDetail
        selectedPlayer={selectedPlayer}
        isShowDetail={isShowDetail}
        onShowDetail={onShowDetail}
        onChangeStarred={onChangeStarred}
        onSelectPlayersForDelete={onSelectPlayersForDelete}
        onOpenEditPlayer={onOpenEditPlayer}
      />

      <AppConfirmDialog
        open={isDeleteDialogOpen}
        onDeny={setDeleteDialogOpen}
        onConfirm={onDeleteSelectedPlayers}
        title="Are you sure, you want to delete the selected Player ?"
        dialogTitle="Delete Item(s)"
      />
      {/* Notification */}
      <Controls.Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default PlayerListing;
