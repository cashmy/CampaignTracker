import React from 'react';
import Box from '@mui/material/Box';
// import IntlMessages from '@crema/helpers/IntlMessages';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { HiOutlineBolt } from 'react-icons/hi2';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import { Hidden } from '@mui/material';
import AppTooltip from '@/../../lib/components/AppTooltip';
// import { putDataApi } from '@crema/hooks/APIHooks';
import { useInfoViewActionsContext } from '@/../../lib/context/AppContextProvider/InfoViewContextProvider';

const PlayerCheckedActions = (props) => {
  const {
    checkedPlayers,
    setCheckedPlayers,
    onSelectPlayersForDelete,
    onSelectPlayersForStatusChg,
    onUpdatePlayers,
  } = props;

  const infoViewActionsContext = useInfoViewActionsContext();

  const [isLabelOpen, onOpenLabel] = React.useState(null);

  const onLabelOpen = (event) => {
    onOpenLabel(event.currentTarget);
  };

  const onLabelClose = () => {
    onOpenLabel(null);
  };

  const onSelectLabel = (event) => {
    const labelType = event.target.value;
    // TODO: Update the label for the selected Players
    alert('onSelectLabel: ' + labelType);
    // putDataApi('/api/contactApp/update/label', infoViewActionsContext, {
    //   contactIds: checkedPlayers,
    //   type: +labelType,
    // })
    //   .then((data) => {
    //     onUpdatePlayers(data);
    //     setCheckedPlayers([]);
    //     onLabelClose();
    //     infoViewActionsContext.showMessage('Contact Updated Successfully');
    //   })
    //   .catch((error) => {
    //     infoViewActionsContext.fetchError(error.message);
    //   });
  };

  return (
    <Box
      component="span"
      sx={{
        display: 'flex',
        alignItems: 'center',
        mr: { xs: 2, xl: 3 },
      }}
    >
      <AppTooltip 
        // title={<IntlMessages id="common.delete" />}
        title="Delete Item(s)"
      >
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
          }}
          size="large"
        >
          <DeleteOutlinedIcon
            sx={{
              cursor: 'pointer',
              display: 'block',
            }}
            onClick={() => onSelectPlayersForDelete(checkedPlayers)}
          />
        </IconButton>
      </AppTooltip>

      <AppTooltip 
        // title={<IntlMessages id="common.delete" />}
        title="Change Status for Item(s)"
      >
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
          }}
        >
          <HiOutlineBolt
            sx={{
              cursor: 'pointer',
              display: 'block',
            }}
            onClick={() => onSelectPlayersForStatusChg(checkedPlayers)}
          />
        </IconButton>
      </AppTooltip>

      <Hidden smDown>
        <AppTooltip 
          // title={<IntlMessages id="common.label" />}
          title="Label"
        >
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            size="large"
          >
            <LabelOutlinedIcon
              sx={{
                cursor: 'pointer',
                display: 'block',
              }}
              value={1}
              onClick={onLabelOpen}
            />
          </IconButton>
        </AppTooltip>
      </Hidden>

      <Menu
        anchorEl={isLabelOpen}
        keepMounted
        elevation={0}
        open={Boolean(isLabelOpen)}
        onClose={onLabelClose}
      >
        <MenuItem value={311} onClick={onSelectLabel}>
          {/* <IntlMessages id="common.crema" /> */}
          Exp/Vet +DM
        </MenuItem>
        <MenuItem value={312} onClick={onSelectLabel}>
          {/* <IntlMessages id="common.personal" /> */}
          Veteran
        </MenuItem>
        <MenuItem value={313} onClick={onSelectLabel}>
          {/* <IntlMessages id="common.work" /> */}
          Experienced
        </MenuItem>
        <MenuItem value={313} onClick={onSelectLabel}>
          {/* <IntlMessages id="common.work" /> */}
          Newbie
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PlayerCheckedActions;

PlayerCheckedActions.propTypes = {
  checkedPlayers: PropTypes.array.isRequired,
  setCheckedPlayers: PropTypes.func,
  onSelectPlayersForDelete: PropTypes.func,
  onSelectPlayersForStatusChg: PropTypes.func,
  onUpdatePlayers: PropTypes.func,
};
