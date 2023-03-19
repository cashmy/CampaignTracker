import React from 'react';
import Box from '@mui/material/Box';
import AppSearchBar from '@/../../lib/components/AppSearchBar';
import { Hidden } from '@mui/material';
import PropTypes from 'prop-types';
// import { useIntl } from 'react-intl';
import CheckBox from './CheckBox';
import PlayerCheckedActions from './PlayerCheckedActions';
import AppsPagination from '@/../../lib/components/AppsPagination';
import CachedIcon from "@mui/icons-material/Cached";
import ActionIconButton from "components/controls/ActionIconButton";
import ViewSelectButtons from './ViewSelectButtons';
import {
  usePlayersActionsContext,
  usePlayersContext,
} from '../../PlayersContextProvider';

const PlayerHeader = (props) => {
  const {
    checkedPlayers,
    setCheckedPlayers,
    filterText,
    onSetFilterText,
    onUpdatePlayers,
    onSelectPlayersForDelete,
    onSelectPlayersForStatusChg,
    handleReload,
  } = props;
  const { page, pageView, PlayersList } = usePlayersContext();
  const { onPageChange, onChangePageView } = usePlayersActionsContext();

  // const { messages } = useIntl();

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <CheckBox
          checkedPlayers={checkedPlayers}
          setCheckedPlayers={setCheckedPlayers}
        />

        <AppSearchBar
          iconPosition="right"
          overlap={false}
          value={filterText}
          onChange={(event) => onSetFilterText(event.target.value)}
          // placeholder={messages['common.searchHere']}
          placeholder="search here"
        />
        {checkedPlayers.length > 0 ? (
          <PlayerCheckedActions
            onSelectPlayersForDelete={onSelectPlayersForDelete}
            onSelectPlayersForStatusChg={onSelectPlayersForStatusChg}
            checkedPlayers={checkedPlayers}
            setCheckedPlayers={setCheckedPlayers}
            onUpdatePlayers={onUpdatePlayers}
          />
        ) : null}

        <ViewSelectButtons
          pageView={pageView}
          onChangePageView={onChangePageView}
        />
      </Box>
      <Box sx={{ ml: 3 }}>
        <ActionIconButton onClick={handleReload} tooltip="Reload table">
          <CachedIcon />
        </ActionIconButton>
      </Box>
      <Hidden smDown>
        {PlayersList?.length > 0 ? (
          <AppsPagination
            sx={{ ml: 2 }}
            count={PlayersList?.length}
            page={page}
            onPageChange={onPageChange}
          />
        ) : null}
      </Hidden>
    </>
  );
};

export default PlayerHeader;

PlayerHeader.defaultProps = {
  checkedPlayers: [],
  filterText: '',
  page: 0,
};

PlayerHeader.propTypes = {
  checkedPlayers: PropTypes.array,
  setCheckedPlayers: PropTypes.func,
  filterText: PropTypes.string,
  onSetFilterText: PropTypes.func,
  onUpdatePlayers: PropTypes.func,
  onSelectPlayersForDelete: PropTypes.func,
  onSelectPlayersForStatusChg: PropTypes.func,
  handleReload: PropTypes.func,
};
