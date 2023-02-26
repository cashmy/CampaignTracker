import Box from '@mui/material/Box';
import React from 'react';
import PropTypes from 'prop-types';
import AppList from '@/../../lib/components/AppList';
import AppGrid from '@/../../lib/components/AppGrid';
import ListEmptyResult from '@/../../lib/components/AppList/ListEmptyResult';
// import IntlMessages from '@/../../lib/helpers/IntlMessages';
import PlayerListSkeleton from '@/../../lib/components/AppSkeleton/PlayerListSkeleton';
import { Hidden } from '@mui/material';
import PlayerGridItem from './PlayerGridItem';
import PlayerListItem from './PlayerListItem';
import PlayerListItemMobile from './PlayerListItem/PlayerListItemMobile';
import { usePlayersContext } from '../../PlayersContextProvider';

const PlayerView = (props) => {
  const {
    list,
    handleAddPlayerOpen,
    onChangeStarred,
    onChangeCheckedPlayers,
    checkedPlayers,
    onSelectPlayersForDelete,
    onOpenEditPlayer,
    onViewPlayerDetail,
  } = props;

  const { labelList, loading, pageView } = usePlayersContext();
  return (
    <>
      {pageView === 'list' ? (
        <>
          <Hidden smDown>
            <AppList
              data={list}
              animation="transition.slideUpIn"
              sx={{
                pt: 0,
                pb: 0,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  // actionTitle={<IntlMessages id="PlayerApp.createPlayer" />}
                  actionTitle="Create Player"
                  onClick={handleAddPlayerOpen}
                  placeholder={<PlayerListSkeleton />}
                />
              }
              renderRow={(Player) => (
                <PlayerListItem
                  key={Player.id}
                  Player={Player}
                  labelList={labelList}
                  onChangeCheckedPlayers={onChangeCheckedPlayers}
                  checkedPlayers={checkedPlayers}
                  onSelectPlayersForDelete={onSelectPlayersForDelete}
                  onChangeStarred={onChangeStarred}
                  onViewPlayerDetail={onViewPlayerDetail}
                  onOpenEditPlayer={onOpenEditPlayer}
                />
              )}
            />
          </Hidden>

          <Hidden smUp>
            <AppList
              data={list}
              animation="transition.slideUpIn"
              sx={{
                pt: 0,
                pb: 0,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  // actionTitle={<IntlMessages id="PlayerApp.createPlayer" />}
                  actionTitle="Create Player"
                  onClick={handleAddPlayerOpen}
                  placeholder={<PlayerListSkeleton />}
                />
              }
              renderRow={(Player) => (
                <PlayerListItemMobile
                  key={Player.id}
                  Player={Player}
                  checkedPlayers={checkedPlayers}
                  labelList={labelList}
                  onChangeStarred={onChangeStarred}
                  onViewPlayerDetail={onViewPlayerDetail}
                  onOpenEditPlayer={onOpenEditPlayer}
                />
              )}
            />
          </Hidden>
        </>
      ) : (
        <Box
          sx={{
            px: 5,
            pt: 0.5,
            pb: 3,
          }}
        >
          <AppGrid
            responsive={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 2,
              xl: 3,
            }}
            data={list}
            renderRow={(Player) => (
              <PlayerGridItem
                key={Player.id}
                Player={Player}
                labelList={labelList}
                onChangeCheckedPlayers={onChangeCheckedPlayers}
                checkedPlayers={checkedPlayers}
                onChangeStarred={onChangeStarred}
                onSelectPlayersForDelete={onSelectPlayersForDelete}
                onViewPlayerDetail={onViewPlayerDetail}
                onOpenEditPlayer={onOpenEditPlayer}
              />
            )}
          />
        </Box>
      )}
    </>
  );
};

export default PlayerView;

PlayerView.defaultProps = {
  list: [],
  checkedPlayers: [],
};

PlayerView.propTypes = {
  list: PropTypes.array,
  pageView: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  handleAddPlayerOpen: PropTypes.func,
  checkedPlayers: PropTypes.array,
  onChangeCheckedPlayers: PropTypes.func,
  onChangeStarred: PropTypes.func,
  onSelectPlayersForDelete: PropTypes.func,
  onOpenEditPlayer: PropTypes.func,
  onViewPlayerDetail: PropTypes.func,
};
