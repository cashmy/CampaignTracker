import React from 'react';
import { Card } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import BusinessIcon from '@mui/icons-material/Business';
// import IntlMessages from '@/../../lib/helpers/IntlMessages';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { blue } from '@mui/material/colors';
import { Fonts } from '@/../../lib/constants/AppEnums';
import ItemMenu from '../ItemMenu';

import { styled } from '@mui/material/styles';

const GridCard = styled(Card)(({ theme }) => {
  return {
    borderRadius: theme.cardRadius,
    border: `solid 1px ${theme.palette.grey[300]}`,
    position: 'relative',
    padding: 16,
    cursor: 'pointer',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      padding: 20,
    },
    '&:hover': {
      '& .conActionHoverRoot': {
        opacity: 1,
        visibility: 'visible',
        right: 0,
      },
      '& .conActionHoverHideRoot': {
        opacity: 0,
        visibility: 'hidden',
      },
    },
  };
});

const PlayerGridItem = (props) => {
  const {
    Player,
    onChangeCheckedPlayers,
    checkedPlayers,
    onChangeStarred,
    onSelectPlayersForDelete,
    onOpenEditPlayer,
    onViewPlayerDetail,
  } = props;

  return (
    <GridCard
      className="card-hover"
      onClick={() => onViewPlayerDetail(Player)}
    >
      <Box
        sx={{
          mb: 1,
          mt: -3,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            ml: -2,
          }}
          component="span"
          onClick={(event) => event.stopPropagation()}
        >
          <Checkbox
            checked={checkedPlayers.includes(Player.id)}
            onChange={(event) => onChangeCheckedPlayers(event, Player.id)}
            color="primary"
          />
        </Box>

        <ItemMenu
          Player={Player}
          onChangeStarred={onChangeStarred}
          onOpenEditPlayer={onOpenEditPlayer}
          onSelectPlayersForDelete={onSelectPlayersForDelete}
        />
      </Box>

      <Box
        sx={{
          mb: { xs: 3, lg: 4, xl: 5 },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {Player.image ? (
          <Avatar
            sx={{
              width: 46,
              height: 46,
              backgroundColor: blue[500],
            }}
            src={Player.image}
          />
        ) : (
          <Avatar
            sx={{
              width: 46,
              height: 46,
              backgroundColor: blue[500],
            }}
          >
            {Player.name[0].toUpperCase()}
          </Avatar>
        )}
        <Box
          sx={{
            ml: 4,
            width: 'calc(100% - 65px)',
          }}
        >
          <Box
            component="p"
            sx={{
              fontWeight: Fonts.MEDIUM,
              fontSize: 14,
            }}
          >
            {Player.name}
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: 14,
              color: 'text.secondary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {Player.email ? Player.email : null}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          pt: 2,
          fontSize: 13,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            py: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <BusinessIcon
            sx={{
              fontSize: 20,
            }}
          />
          <Box
            sx={{
              ml: 3.5,
            }}
            component="p"
          >
            {Player.company ? (
              Player.company
            ) : (
              // <IntlMessages id="common.na" />
              NA
            )}
          </Box>
        </Box>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <PhoneOutlinedIcon
            sx={{
              fontSize: 20,
            }}
          />
          <Box
            sx={{
              ml: 3.5,
            }}
            component="p"
          >
            {Player.Player}
          </Box>
        </Box>
      </Box>
    </GridCard>
  );
};

export default PlayerGridItem;

PlayerGridItem.defaultProps = {
  checkedPlayers: [],
};

PlayerGridItem.propTypes = {
  Player: PropTypes.object.isRequired,
  onChangeCheckedPlayers: PropTypes.func,
  checkedPlayers: PropTypes.array,
  onChangeStarred: PropTypes.func,
  onSelectPlayersForDelete: PropTypes.func,
  onOpenEditPlayer: PropTypes.func,
  onViewPlayerDetail: PropTypes.func,
};
