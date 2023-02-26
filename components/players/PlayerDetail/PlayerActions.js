import React from 'react';
import Box from '@mui/material/Box';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PropTypes from 'prop-types';
import AppsStarredIcon from '@/../../lib/components/AppsStarredIcon';
import { IconButton } from '@mui/material';

const PlayerActions = (props) => {
  const { onDeletePlayer, onChangeStarred, onOpenEditPlayer, Player } =
    props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.5s ease',
          opacity: 0,
          visibility: 'hidden',
        }}
        className="btn-action-view"
      >
        <IconButton
          onClick={onDeletePlayer}
          sx={{
            color: (theme) => theme.palette.text.secondary,
            '& svg': {
              fontSize: 20,
            },
          }}
        >
          <DeleteOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={() => onOpenEditPlayer(Player)}
          sx={{
            color: (theme) => theme.palette.text.secondary,
            '& svg': {
              fontSize: 20,
            },
          }}
        >
          <EditOutlinedIcon />
        </IconButton>
      </Box>
      <AppsStarredIcon item={Player} onChange={onChangeStarred} />
    </Box>
  );
};

export default PlayerActions;

PlayerActions.propTypes = {
  onDeletePlayer: PropTypes.func,
  Player: PropTypes.object,
  onChangeStarred: PropTypes.func,
  onOpenEditPlayer: PropTypes.func,
};
