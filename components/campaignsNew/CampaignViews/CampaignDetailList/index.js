/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-02-27 18:10:43
 * @modify date 2023-02-27 18:55:06
 * @desc [description]
 */

// #region Imports
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
// Material UI
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";
// Components
import AppsActiveIcon from "@/../../lib/components/AppsActiveIcon";
import { Fonts } from "@/../../lib/constants/AppEnums";
import ItemMenu from "../ItemMenu";
// #endregion

// #region Styles
const CampaignListItemWrapper = styled(ListItem)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 14,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    cursor: "pointer",
    overflow: "hidden",
    "&.rootCheck": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: `0 3px 5px 0 ${alpha(theme.palette.common.black, 0.08)}`,
    },
    "& .conActionHoverHideRoot": {
      transition: "all 0.4s ease",
    },
    "&:hover": {
      "& .conActionHoverRoot": {
        opacity: 1,
        visibility: "visible",
        right: 0,
      },
      "& .conActionHoverHideRoot": {
        opacity: 0,
        visibility: "hidden",
      },
      "& .PlayerViewInfo": {
        [theme.breakpoints.up("sm")]: {
          width: "calc(100% - 114px)",
        },
      },
    },
  };
});
// #endregion

const CampaignListItem = (props) => {
  const {
    record,
    onChangeCheckedRecords,
    checkedRecords,
    onChangeActive,
    onSelectRecordsForDelete,
    onViewRecordDetail,
    onOpenEditRecordDialog,
  } = props;

// #region // *Event Handlers

// #endregion

  return (
    <CampaignListItemWrapper
      dense
      button
      key={record.id}
      className={clsx("item-hover", {
        rootCheck: checkedRecords.includes(record.id),
      })}
      onClick={() => onViewRecordDetail(Player)}
    >
      <Box
        sx={{
          width: { xs: "75%", sm: "80%", md: "50%" },
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* // & Check Box */}
        <span onClick={(event) => event.stopPropagation()}>
          <Checkbox
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            checked={checkedRecords.includes(record.id)}
            onChange={(event) => onChangeCheckedRecords(event, record.id)}
            color="primary"
          />
        </span>
        
        {/* // & Active Icon Toggle */}
        <Box
          component="span"
          sx={{ mr: 2.5 }}
          onClick={(event) => event.stopPropagation()}
        >
          <AppsActiveIcon item={Player} onChange={onChangeActive} />
        </Box>

        {/* //& Avatar/Image? */}

        {/* //& Name */}
        <Box
          component="span"
          sx={{
            mr: 4,
            fontWeight: Fonts.MEDIUM,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {record.name}
        </Box>
        
        {/* //& Type Icon */}
        {/* //& Game System */}
        {/* //& Frequency */}
        {/* //& DOW */}
        {/* //& TimeSlot */}


        {/* //& Actions Items */}
        <Box
          component="span"
          sx={{ display: "flex", alignItems: "center", ml: "auto" }}
        >
          <ItemMenu
            record={record}
            onChangeActive={onChangeActive}
            onSelectRecordsForDelete={onSelectRecordsForDelete}
            onOpenEditRecordDialog={onOpenEditRecordDialog}
          />
        </Box>
        
      </Box>
    </CampaignListItemWrapper>
  );
};

CampaignListItem.defaultProps = {
  checkedRecords: [],
};

PlayerListItem.propTypes = {
  record: PropTypes.object.isRequired,
  onChangeCheckedRecords: PropTypes.func,
  checkedRecords: PropTypes.array,
  onChangeActive: PropTypes.func,
  onSelectRecordsForDelete: PropTypes.func,
  onViewRecordDetail: PropTypes.func,
  onOpenEditRecordDialog: PropTypes.func,
};
