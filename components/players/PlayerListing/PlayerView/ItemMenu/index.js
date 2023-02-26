import React from 'react';
// import IntlMessages from '@/../../lib/helpers/IntlMessages';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AppTooltip from '@/../../lib/components/AppTooltip';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';

const PlayerActionHoverWrapper = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: -30,
    top: '50%',
    zIndex: 1,
    transform: 'translateY(-50%)',
    transition: 'all 0.4s ease',
    opacity: 0,
    visibility: 'hidden',
  };
});

const ItemMenu = (props) => {
  const {
    onSelectPlayersForDelete,
    Player,
    onChangeStarred,
    onOpenEditPlayer,
  } = props;

  const onDeletePlayer = (e) => {
    onSelectPlayersForDelete([Player.id]);
    e.stopPropagation();
  };

  const onChangeStarredStatus = (e) => {
    onChangeStarred(!Player.isStarred, Player);
    e.stopPropagation();
  };

  const onClickEditOption = (e) => {
    onOpenEditPlayer(Player);
    e.stopPropagation();
  };

  return (
    <Box
      component="span"
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        position: 'relative',
      }}
    >
      <span className="conActionHoverHideRoot">
        <AppTooltip 
          // title={<IntlMessages id="common.more" />}
          title="more"
          >
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
              padding: 2,
              '& .MuiSvgIcon-root': {
                fontSize: 22,
              },
            }}
            size="large"
          >
            <MoreVertIcon />
          </IconButton>
        </AppTooltip>
      </span>

      <PlayerActionHoverWrapper className="conActionHoverRoot">
        <IconButton
          sx={{
            color: (theme) => theme.palette.warning.main,
            padding: 2,
            '& .MuiSvgIcon-root': {
              fontSize: 22,
            },
          }}
          onClick={onChangeStarredStatus}
          size="large"
        >
          {Player.isStarred ? <StarBorderIcon /> : <StarIcon />}
        </IconButton>
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
            padding: 2,
            '& .MuiSvgIcon-root': {
              fontSize: 22,
            },
          }}
          onClick={onClickEditOption}
          size="large"
        >
          <EditOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
            padding: 2,
            '& .MuiSvgIcon-root': {
              fontSize: 22,
            },
          }}
          onClick={onDeletePlayer}
          size="large"
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </PlayerActionHoverWrapper>
    </Box>
  );
};

export default ItemMenu;

ItemMenu.propTypes = {
  onSelectPlayersForDelete: PropTypes.func,
  Player: PropTypes.object.isRequired,
  onChangeStarred: PropTypes.func,
  onOpenEditPlayer: PropTypes.func,
};
