/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-02-27 18:10:43
 * @modify date 2023-03-17 09:19:09
 * @desc [description]
 */

// #region //* Imports
import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
// Material UI
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";
import ActionIconButton from "components/controls/ActionIconButton";
import { BiTargetLock } from "react-icons/bi";
import { GiPistolGun } from "react-icons/gi";
import { MdCampaign } from "react-icons/md";
// Components
import AppsArchiveIcon from "@/../../lib/components/AppsArchiveIcon";
import { Fonts } from "@/../../lib/constants/AppEnums";
import ItemMenu from "../ItemMenu";
// #endregion

// #region //* Styles
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
      "& .recordViewInfo": {
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
    onOpenEditRecord,
    onOpenDetails,
    handleSchedule,
  } = props;

  // #region // *Event Handlers
  const dowText = (dow) => {
    switch (dow) {
      case 1:
        return "Sun";
      case 2:
        return "Mon";
      case 3:
        return "Tue";
      case 4:
        return "Wed";
      case 5:
        return "Thu";
      case 6:
        return "Fri";
      case 7:
        return "Sat";
      default:
        return "Not set";
    }
  };
  const frequencyText = (frequency) => {
    switch (frequency) {
      case "w":
        return "Weekly";
      case "b":
        return "Bi-Weekly";
      case "m":
        return "Monthly";
      case "v":
        return "Varies";
      case "o":
        return "Once";
      case "n":
        return "Never";
      case "t":
        return "TBD";
      default:
        return "Unknown";
    }
  };
  const typeText = (type) => {
    switch (type) {
      case "o":
        return (
          <ActionIconButton
            filled={true}
            color="darkgoldenrod"
            tooltipText="One-Shot"
          >
            <BiTargetLock />
          </ActionIconButton>
        ); // One-Shot
      case "a":
        return (
          <ActionIconButton
            filled={true}
            color="purple"
            tooltipText="Adventure: multiple sessions"
          >
            <GiPistolGun />
          </ActionIconButton>
        ); // Adv
      case "c":
        return (
          <ActionIconButton
            filled={true}
            color="darkred"
            tooltipText="Campaign: a 'Zero to Hero' approach"
          >
            <MdCampaign />
          </ActionIconButton>
        ); // Cmgn

      default:
        return "None";
    }
  };
  const timeSlotText = (frequency) => {
    switch (frequency) {
      case 1:
        return "Morning";
      case 2:
        return "Noon";
      case 3:
        return "Afternoon";
      case 4:
        return "Evening";
      case 5:
        return "Late Night";
      default:
        return "Not set";
    }
  };
  // #endregion

  return (
    <CampaignListItemWrapper
      dense
      button
      key={record.id}
      className={clsx(
        "item-hover"
        //  {rootCheck: checkedRecords.includes(record.id),}
      )}
      onClick={() => onViewRecordDetail(record)}
    >
      <Box
        sx={{
          width: { xs: "75%", sm: "80%", md: "100%" },
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
          <AppsArchiveIcon record={record} onChange={onChangeActive} />
        </Box>

        {/* //& Image */}
        <Box
          component="span"
          sx={{
            maxWidth: 50,
            // mr: 4,
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Image
            src={record.imageUrl || "/assets/images/1444575.gif"}
            alt={record.name}
            width={30}
            height={30}
          />
        </Box>

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
            fontStyle: record.archived ? "italic" : "normal",
            color: record.archived ? "grey" : "primary",
          }}
        >
          {record.name}
        </Box>

        {/* //& Type Icon */}
        <Box
          component="span"
          sx={{
            maxWidth: 75,
            mr: 4,
            fontWeight: Fonts.MEDIUM,
            flex: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {typeText(record.type)}
        </Box>

        {/* //& Game System */}
        <Box
          component="span"
          sx={{
            maxWidth: 200,
            mr: 4,
            fontWeight: Fonts.MEDIUM,
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontStyle: record.archived ? "italic" : "normal",
            color: record.archived ? "grey" : "primary",
          }}
        >
          {record.gameSystem}
        </Box>

        {/* //^ Action Items & "Shift left" */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: { xs: "25%", sm: "20%", md: "50%" },
          }}
        >
          {/* //^ Frequence, DOW, TimeSlot */}
          <Box
            sx={{
              transition: "all 0.4s ease",
              display: "flex",
              alignItems: "center",
              width: { sm: "calc(100% - 70px)" },
            }}
            className="recordViewInfo"
          >
            {/* //& Frequency */}
            <Box
              component="span"
              sx={{
                maxWidth: 200,
                mr: 4,
                fontWeight: Fonts.MEDIUM,
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontStyle: record.archived ? "italic" : "normal",
                color: record.archived ? "grey" : "primary",
              }}
            >
              {frequencyText(record.frequency)}
            </Box>

            {/* //& DOW */}
            <Box
              component="span"
              sx={{
                maxWidth: 150,
                mr: 4,
                fontWeight: Fonts.MEDIUM,
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontStyle: record.archived ? "italic" : "normal",
                color: record.archived ? "grey" : "primary",
              }}
            >
              {dowText(record.dow)}
            </Box>

            {/* //& TimeSlot */}
            <Box
              component="span"
              sx={{
                mr: 4,
                fontWeight: Fonts.MEDIUM,
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontStyle: record.archived ? "italic" : "normal",
                color: record.archived ? "grey" : "primary",
              }}
            >
              {timeSlotText(record.timeSlot)}
            </Box>
          </Box>
          {/* //& Actions Items */}
          <Box
            component="span"
            sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
          >
            <ItemMenu
              record={record}
              onChangeActive={onChangeActive}
              onSelectRecordsForDelete={onSelectRecordsForDelete}
              onOpenEditRecord={onOpenEditRecord}
              onOpenDetails={onOpenDetails}
              handleSchedule={handleSchedule}
            />
          </Box>
        </Box>
      </Box>
    </CampaignListItemWrapper>
  );
};

export default CampaignListItem;

CampaignListItem.defaultProps = {
  checkedRecords: [],
};

CampaignListItem.propTypes = {
  record: PropTypes.object.isRequired,
  onChangeCheckedRecords: PropTypes.func,
  checkedRecords: PropTypes.array,
  onChangeActive: PropTypes.func,
  onSelectRecordsForDelete: PropTypes.func,
  onViewRecordDetail: PropTypes.func,
  onOpenEditRecord: PropTypes.func,
  onOpenDetails: PropTypes.func,
  handleSchedule: PropTypes.func,
};
