import React, { useState, useEffect } from "react";
import { Card, Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
//import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import IntlMessages from '@/../../lib/helpers/IntlMessages';
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { blue } from "@mui/material/colors";
import { Fonts } from "@/../../lib/constants/AppEnums";
import ItemMenu from "../ItemMenu";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { currDateDiffByZone } from "/helpers/TimeZones";

import { styled } from "@mui/material/styles";

//#region //* Styled Components
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

const ClockFace = styled(Clock)(({ theme }) => {
  return {
    "& .react-clock__mark__body": {
      backgroundColor: theme.palette.text.primary,
    },
    "& .react-clock__hand__body": {
      backgroundColor: theme.palette.text.primary,
    },    
    "& .react-clock__second-hand__body": {
      backgroundColor: theme.palette.error.main,
    },  
    "& .react-clock__face": {
      borderColor: theme.palette.text.primary,
    },
  }
});
//#endregion

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

  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <GridCard className="card-hover" onClick={() => onViewPlayerDetail(Player)}>
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

      {/* //& Avatar Player Name, Flag, and Email */}
      <Box
        sx={{
          mb: { xs: 3, lg: 4, xl: 5 },
          display: "flex",
          alignItems: "center",
        }}
      >
        {Player.avatarImage ? (
          <Avatar
            sx={{
              width: 46,
              height: 46,
              backgroundColor: blue[500],
            }}
            src={Player.avatarImage}
          />
        ) : (
          <Avatar
            sx={{
              width: 46,
              height: 46,
              backgroundColor: blue[500],
            }}
          >
            {Player.playerName[0].toUpperCase()}
          </Avatar>
        )}
        <Box
          sx={{
            ml: 4,
            width: "calc(100% - 65px)",
          }}
        >
          <Box
            component="p"
            sx={{
              fontWeight: Fonts.MEDIUM,
              fontSize: 14,
              "& > img": { ml: 2, flexShrink: 0 },
            }}
          >
            {Player.playerName}
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${Player.countryCode.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${Player.countryCode.toLowerCase()}.png 2x`}
              alt=""
            />
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: 14,
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {Player.discordId ? Player.discordId : Player.email ? Player.email : null}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          pt: 2,
          fontSize: 13,
          display: "flex",
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Grid container>
          <Grid item xs={8}>
            {/* //& Time Zone */}
            <Box
              sx={{
                py: 1,
                display: "flex",
                alignItems: "center",
              }}
              >
              <AccessTimeIcon
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
                {Player.timeZone
                  ? Player.timeZone
                  : // <IntlMessages id="common.na" />
                  "Unknown (GMT)"}
              </Box>
            </Box>
            {/* //& Phone */}
            <Box
              sx={{
                pt: 0,
                display: "flex",
                alignItems: "center",
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
                {Player.contact}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            {/* //& Clock */}
            <Box
              sx={{
                py: 2,
                display: "flex",
                alignItems: "center",
              }}
              >
              <ClockFace value={currDateDiffByZone(Player.timeZoneOffset)} size={75} />
            </Box>
          </Grid>
        </Grid>
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
