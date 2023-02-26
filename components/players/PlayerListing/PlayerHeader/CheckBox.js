import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { usePlayersContext } from '../../PlayersContextProvider';

const CheckBox = ({ checkedPlayers, setCheckedPlayers }) => {
  const { PlayersList } = usePlayersContext();

  const onHandleMasterCheckbox = (event) => {
    if (event.target.checked) {
      const PlayerIds = PlayersList?.data?.map((Player) => Player.id);
      setCheckedPlayers(PlayerIds);
    } else {
      setCheckedPlayers([]);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Checkbox
        sx={{
          color: (theme) => theme.palette.text.disabled,
        }}
        color="primary"
        indeterminate={
          checkedPlayers.length > 0 &&
          checkedPlayers.length < PlayerList?.data.length
        }
        checked={
          PlayersList?.data.length > 0 &&
          checkedPlayers.length === PlayersList?.data.length
        }
        onChange={onHandleMasterCheckbox}
      />
    </Box>
  );
};

export default CheckBox;

CheckBox.propTypes = {
  checkedPlayers: PropTypes.array.isRequired,
  setCheckedPlayers: PropTypes.func,
};
