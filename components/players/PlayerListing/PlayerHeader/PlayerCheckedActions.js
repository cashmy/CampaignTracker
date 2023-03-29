import React from "react";
import PropTypes from "prop-types";
// * Mui
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Hidden } from "@mui/material";
import { blue, green, red, orange } from '@mui/material/colors';
// * Icons
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { HiOutlineBolt } from "react-icons/hi2";
// * Local Components
import AppTooltip from "@/../../lib/components/AppTooltip";
import { useInfoViewActionsContext } from "lib/context/AppContextProvider/InfoViewContextProvider";
// * Services
import { patchDataApi } from "lib/hooks/APIHooks";
// import IntlMessages from '@crema/helpers/IntlMessages';
import {
  usePlayersActionsContext,
  usePlayersContext,
} from "../../PlayersContextProvider";

const PlayerCheckedActions = (props) => {
  const {
    checkedPlayers,
    setCheckedPlayers,
    onSelectPlayersForDelete,
    onSelectPlayersForStatusChg,
    onUpdatePlayers,
  } = props;
  const { reCallAPI, API_URL } = usePlayersActionsContext();
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
    patchDataApi(API_URL, infoViewActionsContext, {
      ids: checkedPlayers,
      value: labelType,
      path: "labelId",
      op: "replace",
    })
      .then((data) => {
        // onUpdatePlayer(data);
        setCheckedPlayers([]);
        onLabelClose();
        infoViewActionsContext.showMessage("Player Updated Successfully");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    reCallAPI();
  };

  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        alignItems: "center",
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
              cursor: "pointer",
              display: "block",
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
              cursor: "pointer",
              display: "block",
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
                cursor: "pointer",
                display: "block",
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
        <MenuItem value={311} onClick={onSelectLabel} sx={{color: red[500]}}>
          {/* <IntlMessages id="common.crema" /> */}
          Exp/Vet +DM
        </MenuItem>
        <MenuItem value={312} onClick={onSelectLabel} sx={{color: blue[500]}}>
          {/* <IntlMessages id="common.personal" /> */}
          Veteran
        </MenuItem>
        <MenuItem value={313} onClick={onSelectLabel} sx={{color: orange[500]}}>
          {/* <IntlMessages id="common.work" /> */}
          Experienced
        </MenuItem>
        <MenuItem value={314} onClick={onSelectLabel} sx={{color: green[500]}}>
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
