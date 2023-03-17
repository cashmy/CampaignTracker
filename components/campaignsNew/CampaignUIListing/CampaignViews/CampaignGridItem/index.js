/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-02 12:05:52
 * @modify date 2023-03-17 12:18:12
 * @desc [description]
 */

//#region //* Imports
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
// * Mui Components
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
// * Icons
import { BiTargetLock } from "react-icons/bi";
import { GiPistolGun } from "react-icons/gi";
import { MdCampaign } from "react-icons/md";
import { CiWavePulse1 } from "react-icons/ci";
import DateRangeSharpIcon from "@mui/icons-material/DateRangeSharp";
import HourglassTopSharpIcon from "@mui/icons-material/HourglassTopSharp";
// * Local Components
import AppsArchiveIcon from "@/../../lib/components/AppsArchiveIcon";
import ActionIconButton from "components/controls/ActionIconButton";
import CampaignTypeIcon from "../../../CampaignTypeIcon";
// import IntlMessages from '@/../../lib/helpers/IntlMessages';
import ItemMenu from "../ItemMenu";
import { Fonts } from "@/../../lib/constants/AppEnums";
import { currDateDiffByZone } from "/helpers/TimeZones";
// * Services
//#endregion

//#region //* Styles
const GridCard = styled(Card)(({ theme }) => {
  return {
    borderRadius: theme.cardRadius,
    border: `solid 1px ${theme.palette.grey[300]}`,
    position: "relative",
    padding: 16,
    cursor: "pointer",
    height: "100%",
    [theme.breakpoints.up("md")]: {
      padding: 20,
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
    },
  };
});
const GridCardMedia = styled(CardMedia)(({ theme }) => {
  return {
    width: "100%",
    height: 100,
    borderRadius: 3,
    [theme.breakpoints.up("xs")]: {
      height: 150,
    },
    [theme.breakpoints.up("md")]: {
      height: 100,
    },
  };
});
//#endregion

const CampaignGridItem = (props) => {
  //#region //* State & local variables
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
  //#endregion

  //#region //* Event Handlers
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
  //#endregion

  return (
    <GridCard className="card-hover" onClick={() => onViewRecordDetail(record)}>
      <Box
        sx={{
          mb: 1,
          mt: -3,
          display: "flex",
          justifyContent: "space-between",
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
            sx={{
              color: (theme) => theme.palette.text.disabled,
            }}
            checked={checkedRecords.includes(record.id)}
            onChange={(event) => onChangeCheckedRecords(event, record.id)}
            color="primary"
          />
        </Box>
        <ItemMenu
          record={record}
          onChangeActive={onChangeActive}
          onSelectRecordsForDelete={onSelectRecordsForDelete}
          onOpenEditRecord={onOpenEditRecord}
          onOpenDetails={onOpenDetails}
          handleSchedule={handleSchedule}
        />
      </Box>

      <Box
        sx={{
          display: "flexColumn",
          alignItems: "center",
        }}
      >
        <GridCardMedia
          // sx={{
          //   width: "100%",
          //   height: 100,
          //   borderRadius: 3,
          // }}
          image={record.imageUrl || "/assets/images/1444575.gif"}
          alt={record.name}
        />
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            ml: -3,
          }}
        >
          <CampaignTypeIcon type={record.type} size="24" />
          <Typography
            variant="h4"
            sx={{ ml: 1, color: record.archived ? "grey" : "primary" }}
          >
            {record.name}
          </Typography>
        </CardContent>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* //& Frequency */}
          <Box
            sx={{
              mb: { xs: 2, md: 3 },
              display: "flex",
              alignItems: "center",
            }}
          >
            <CiWavePulse1
              size={24}
              sx={{
                color: (theme) => theme.palette.text.secondary,
              }}
            />
            <Box sx={{ ml: 3.5 }}>
              {record.frequency ? (
                frequencyText(record.frequency)
              ) : (
                <Typography
                  variant="h6"
                  sx={{
                    color: "grey",
                    fontStyle: record.frequency ? "normal" : "italic",
                  }}
                >
                  Frequency
                </Typography>
              )}
            </Box>
          </Box>

          {/* //& DOW */}
          <Box
            sx={{
              mb: { xs: 2, md: 3 },
              mr: { xs: 2, md: 3 },
              display: "flex",
              alignItems: "center",
            }}
          >
            <DateRangeSharpIcon
              sx={{
                fontSize: 24,
                color: (theme) => theme.palette.text.secondary,
              }}
            />
            <Box sx={{ ml: 3.5 }}>
              {record.dow ? (
                dowText(record.dow)
              ) : (
                <Typography
                  variant="h6"
                  sx={{
                    color: "grey",
                    fontStyle: record.dow ? "normal" : "italic",
                  }}
                >
                  Day of the Week
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </GridCard>
  );
};

export default CampaignGridItem;

CampaignGridItem.defaultProps = {
  checkedRecords: [],
};

CampaignGridItem.propTypes = {
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