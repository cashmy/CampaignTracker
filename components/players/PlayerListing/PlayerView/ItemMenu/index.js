//#region Imports
import React from "react";
import PropTypes from "prop-types";
// * Mui
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
// * Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {HiBolt, HiOutlineBolt} from 'react-icons/hi2';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// * Local Components
import AppTooltip from "@/../../lib/components/AppTooltip";
import Controls from "/components/controls/Controls";
//#endregion

//#region //* Styled Components
const PlayerActionHoverWrapper = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: -30,
    top: "50%",
    zIndex: 1,
    transform: "translateY(-50%)",
    transition: "all 0.4s ease",
    opacity: 0,
    visibility: "hidden",
  };
});
//#endregion

const ItemMenu = (props) => {
  const {
    onSelectPlayersForDelete,
    Player,
    onChangeStarred,
    onChangeActive,
    onOpenEditPlayer,
  } = props;

  //#region // * Event Handlers
  const onDeletePlayer = (e) => {
    onSelectPlayersForDelete([Player.id]);
    e.stopPropagation();
  };
  const onChangeStarredStatus = (e) => {
    onChangeStarred(!Player.isStarred, Player);
    e.stopPropagation();
  };
  const onChangeActiveStatus = (e) => {
    onChangeActive(!Player.active, Player);
    e.stopPropagation();
  };
  const onClickEditOption = (e) => {
    onOpenEditPlayer(Player);
    e.stopPropagation();
  };
  //#endregion

  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        position: "relative",
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
              "& .MuiSvgIcon-root": {
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
        {/* //& Toggle Active Status */}
        <Controls.ActionButton
          filled={false}
          color="darkgoldenrod"
          tooltipText={"Change active status"}
          size="small"
          onClick={onChangeActiveStatus}
        >
          {Player.active ? <HiOutlineBolt fontSize='large' /> : <HiBolt fontSize='large' />}
        </Controls.ActionButton>
        {/* //& Toggle Starred Status */}
        <Controls.ActionButton
          filled={false}
          color="dodgerblue"
          tooltipText={"Change starred status"}
          size="small"
          onClick={onChangeStarredStatus}
        >
          {Player.isStarred ? <StarBorderIcon /> : <StarIcon  />}
        </Controls.ActionButton>

        {/* //& Delete Item */}
        <Controls.ActionButton
          filled={true}
          color="red"
          tooltipText={"Delete an item"}
          size="small"
          onClick={onDeletePlayer}
        >
          <DeleteOutlinedIcon fontSize="small" />
        </Controls.ActionButton>

        {/* //& Edit Item */}
        <Controls.ActionButton
          filled={true}
          color="darkcyan"
          tooltipText={"Edit an item"}
          size="small"
          onClick={onClickEditOption}
        >
          <EditOutlinedIcon fontSize="small" />
        </Controls.ActionButton>
      </PlayerActionHoverWrapper>
    </Box>
  );
};

export default ItemMenu;

ItemMenu.propTypes = {
  onSelectPlayersForDelete: PropTypes.func,
  Player: PropTypes.object.isRequired,
  onChangeStarred: PropTypes.func,
  onChangeActive: PropTypes.func,
  onOpenEditPlayer: PropTypes.func,
};
