/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-09 11:54:27
 * @modify date 2023-03-09 11:56:34
 * @desc [description]
 */

//#region Imports
import React from "react";
import PropTypes from "prop-types";
// import IntlMessages from '@/../../lib/helpers/IntlMessages';
// * Mui
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
// * Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { HiBolt, HiOutlineBolt } from "react-icons/hi2";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DetailsIcon from "@mui/icons-material/Details";
// * Local Components
import AppTooltip from "@/../../lib/components/AppTooltip";
import Controls from "/components/controls/Controls";
//#endregion

//#region // * Styles
const RecordActionHoverWrapper = styled("div")(() => {
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
// #endregion

const ItemMenu = (props) => {
  const {
    onSelectRecordsForDelete,
    record,
    onChangeActive,
    onOpenEditRecord,
    onOpenDetails,
    handleSchedule,
  } = props;

  //#region // * Handlers
  const onDeleteRecord = (e) => {
    onSelectRecordsForDelete([record.id]);
    e.stopPropagation();
  };
  const onChangeActiveStatus = (e) => {
    onChangeActive(!record.active, record);
    e.stopPropagation();
  };
  const onClickEditOption = (e) => {
    onOpenEditRecord(record);
    e.stopPropagation();
  };
  const onClickDetailsOption = (e) => {
    onOpenDetails(record);
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

      <RecordActionHoverWrapper className="conActionHoverRoot">
        {/* //& Toggle Archive Status */}
        <Controls.ActionButton
          filled={false}
          color="darkgoldenrod"
          tooltipText={"Change active status"}
          size="small"
          onClick={onChangeActiveStatus}
        >
          {!record.archived ? (
            <HiOutlineBolt fontSize="large" />
          ) : (
            <HiBolt fontSize="large" />
          )}
        </Controls.ActionButton>

        {/* //& Delete Item */}
        <Controls.ActionButton
          filled={true}
          color="red"
          tooltipText={"Delete an item"}
          size="small"
          onClick={onDeleteRecord}
        >
          <DeleteOutlinedIcon fontSize="small" />
        </Controls.ActionButton>

        {/* //& Calendar Item */}
        <Controls.ActionButton
          filled={true}
          color="darkblue"
          tooltipText={"Schedule an item"}
          size="small"
          onClick={() => handleSchedule(record)}
        >
          <CalendarMonthIcon fontSize="small" />
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

        {/* //& Details Item */}
        <Controls.ActionButton
          filled={true}
          color="orange"
          tooltipText={"Work with details"}
          size="small"
          onClick={onClickDetailsOption}
        >
          <DetailsIcon fontSize="small" />
        </Controls.ActionButton>
        
      </RecordActionHoverWrapper>
    </Box>
  );
};

export default ItemMenu;

ItemMenu.propTypes = {
  onSelectRecordsForDelete: PropTypes.func,
  record: PropTypes.object.isRequired,
  onChangeActive: PropTypes.func,
  onOpenEditRecord: PropTypes.func,
  onOpenDetails: PropTypes.func,
  handleSchedule: PropTypes.func,
};
