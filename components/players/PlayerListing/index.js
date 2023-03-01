import React, { useState } from 'react';
import PlayerHeader from './PlayerHeader';
import AppConfirmDialog from '@/../../lib/components/AppConfirmDialog';
// import IntlMessages from '@crema/helpers/IntlMessages';
import CreatePlayer from '../CreatePlayer';
import { Hidden } from '@mui/material';
import PlayerView from './PlayerView';
import PlayerDetail from '../PlayerDetail';
import AppsPagination from '@/../../lib/components/AppsPagination';
import AppsHeader from '@/../../lib/components/AppContainer/AppHeader';
import AppsContent from '@/../../lib/components/AppContainer/AppContent';
import AppsFooter from '@/../../lib/components/AppContainer/AppFooter';
import { useInfoViewActionsContext } from '@/../../lib/context/AppContextProvider/InfoViewContextProvider';
// import { postDataApi, putDataApi } from '@crema/hooks/APIHooks';
import {
  usePlayersActionsContext,
  usePlayersContext,
} from '../PlayersContextProvider';

const PlayerListing = () => {
  const { all, page, PlayersList } = usePlayersContext();
  const { onPageChange, setPlayerData } = usePlayersActionsContext();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [filterText, onSetFilterText] = useState('');
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [checkedPlayers, setCheckedPlayers] = useState([]);
  const [toDeletePlayers, setToDeletePlayers] = useState([]);
  const [isAddPlayer, onSetIsAddPlayer] = useState(false);
  const [isShowDetail, onShowDetail] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

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
      setCheckedPlayers(
        checkedPlayers.filter((PlayerId) => PlayerId !== id)
      );
    }
  };

  const onChangeStarred = (status, Player) => {
    const selectedIdList = [Player.id];
    alert('onChangeStarred');
    // putDataApi('/api/PlayerApp/update/starred', infoViewActionsContext, {
    //   PlayerIds: selectedIdList,
    //   status: status,
    // })
    //   .then((data) => {
    //     onUpdateSelectedPlayer(data[0]);
    //     infoViewActionsContext.showMessage(
    //       data[0].isStarred
    //         ? 'Player Marked as Starred Successfully'
    //         : 'Player Marked as Unstarred Successfully'
    //     );
    //   })
    //   .catch((error) => {
    //     infoViewActionsContext.fetchError(error.message);
    //   });
  };

  const onChangeActive = (status, Player) => {
    const selectedIdList = [Player.id];
    alert('onChangeActive');
    // putDataApi('/api/PlayerApp/update/starred', infoViewActionsContext, {
    //   PlayerIds: selectedIdList,
    //   status: status,
    // })
    //   .then((data) => {
    //     onUpdateSelectedPlayer(data[0]);
    //     infoViewActionsContext.showMessage(
    //       data[0].isStarred
    //         ? 'Player Marked as Starred Successfully'
    //         : 'Player Marked as Unstarred Successfully'
    //     );
    //   })
    //   .catch((error) => {
    //     infoViewActionsContext.fetchError(error.message);
    //   });
  };

  const onUpdateSelectedPlayer = (Player) => {
    setPlayerData({
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
    setPlayerData({
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
    handleAddPlayerClose();
  };

  const onGetFilteredItems = () => {
    if (filterText === '') {
      return PlayersList
    } else {
      return PlayersList?.filter((Player) => {

        return Player.playerName.toUpperCase().includes(filterText.toUpperCase())
        || Player.email.toUpperCase().includes(filterText.toUpperCase())
        || Player.discordId.toUpperCase().includes(filterText.toUpperCase())
      }
      );
    }
  };
  const onDeleteSelectedPlayers = () => {
    postDataApi('http//localhost:5000/api/players/delete/player', infoViewActionsContext, {
      type: all[0],
      name: all[1],
      PlayerIds: toDeletePlayers,
      page,
    })
      .then((data) => {
        setPlayerData(data);
        infoViewActionsContext.showMessage('Player Deleted Successfully');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    setDeleteDialogOpen(false);
    setCheckedPlayers([]);
  };
  const onSelectPlayersForDelete = (PlayerIds) => {
    setToDeletePlayers(PlayerIds);
    setDeleteDialogOpen(true);
  };
  const onSelectPlayersForStatusChg = (PlayerIds) => {
    // TODO : change status
    alert("Changing status(es)")
    // setToDeletePlayers(PlayerIds);
    // setDeleteDialogOpen(true);
  };

  const list = onGetFilteredItems();

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

      <CreatePlayer
        isAddPlayer={isAddPlayer}
        handleAddPlayerClose={handleAddPlayerClose}
        selectPlayer={selectedPlayer}
        onUpdatePlayer={onUpdatePlayer}
      />

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
        // title={<IntlMessages id="PlayerApp.deletePlayer" />}
        // dialogTitle={<IntlMessages id="common.deleteItem" />}
        title="Are you sure, you want to delete the selected Player ?"
        dialogTitle="Delete Item(s)"
      />
    </>
  );
};

export default PlayerListing;
