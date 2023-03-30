import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import AppDialog from '@/../../lib/components/AppDialog';
import AppGridContainer from '@/../../lib/components/AppGridContainer';
import Grid from '@mui/material/Grid';
import { DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import PlayerActions from './PlayerActions';
import OtherDetails from './OtherDetails';
import { PersonalDetails } from './PersonalDetails';

const PlayerDetail = (props) => {
  const {
    isShowDetail,
    selectedPlayer,
    onShowDetail,
    onChangeStarred,
    onSelectPlayersForDelete,
    onOpenEditPlayer,
  } = props;
  const [player, setPlayer] = useState(selectedPlayer);

  useEffect(() => {
    setPlayer(selectedPlayer);
  }, [selectedPlayer]);

  const onDeletePlayer = () => {
    onSelectPlayersForDelete([player.id]);
    onShowDetail(false);
  };

  return (
    <>
      <AppDialog
        sxStyle={{
          '& .MuiPaper-root:hover': {
            '& .btn-action-view': {
              opacity: 1,
              visibility: 'visible',
            },
          },
        }}
        onClose={() => onShowDetail(false)}
        hideClose
        open={isShowDetail}
        title={
          <PlayerActions
            onChangeStarred={onChangeStarred}
            onDeletePlayer={onDeletePlayer}
            onOpenEditPlayer={onOpenEditPlayer}
            Player={player}
          />
        }
      >
        {player ? (
          <div>
            <Box
              sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                ml: -6,
                mr: -6,
                pl: 5,
                pr: 5,
              }}
            >
              <Box
                sx={{
                  mb: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {player.avatarImage ? (
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2.5,
                    }}
                    src={player.avatarImage}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2.5,
                    }}
                  >
                    {player.playerName[0].toUpperCase()}
                  </Avatar>
                )}
                <Box component="h3">{player.playerName}</Box>
              </Box>
            </Box>

            <Box>
              <AppGridContainer>
                <Grid item xs={12} md={6}>
                  <PersonalDetails player={player} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <OtherDetails player={player} />
                </Grid>
              </AppGridContainer>
            </Box>
          </div>
        ) : (
          <div />
        )}
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ width: 100 }}
            onClick={() => onShowDetail(false)}
          >
            Close
          </Button>
        </DialogActions>
      </AppDialog>
    </>
  );
};

export default PlayerDetail;

PlayerDetail.propTypes = {
  isShowDetail: PropTypes.bool.isRequired,
  onShowDetail: PropTypes.func.isRequired,
  selectedPlayer: PropTypes.object,
  onSelectPlayersForDelete: PropTypes.func,
  onChangeStarred: PropTypes.func,
  onOpenEditPlayer: PropTypes.func,
};
