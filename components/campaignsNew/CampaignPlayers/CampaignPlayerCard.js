/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-02 12:05:52
 * @modify date 2023-03-10 13:10:06
 * @desc [description]
 */

//#region //* Imports
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
// * Mui Components
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Tooltip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
// * Local Components
import ActionItemsVert from "components/controls/ActionItemsVert";
//#endregion

//#region //* Styles
const ButtonWrapper = styled(Box)(({ theme }) => ({
  // display: "none",
  maxWidth: 50,
  position: "relative",
  top: 0,
  right: 10,
  cursor: "pointer",
}));
//#endregion

const CampaignPlayerCard = (props) => {
  //#region //* State & local variables
  const { record, handleEdit, handleDelete } = props;
  const theme = useTheme();
  //#endregion

  //#region //* Event Handlers
  const tooltipText = (txt1, txt2) => {
    if (txt1 == "" && txt2 == "") return null;
    return txt1 + " - " + txt2;
  };
  //#endregion

  return (
    <Fragment>
      <Card
        sx={{
          m: 1,
          p: 1,
          borderRadius: "10px",
          boxShadow: "none",
          width: "255px",
          isolation: "isolate",
          border: "1px solid",
          borderColor: theme.palette.mode === "dark" ? "#1A2027" : "lightgrey",
          // TODO:
          // add backgroundColor to complement borderColor
        }}
      >
        {/* //& Card Image */}
        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* //& Player Avatar */}
          <Box sx={{ pl: 10 }}>
            <Tooltip
              arrow
              placement="top"
              title={tooltipText(
                record.player?.discordId,
                record.discordNickName
              )}
            >
              <Avatar
                sx={{
                  mx: 1,
                  width: 75,
                  height: 75,
                }}
                src={
                  record.player.avatarImage != ""
                    ? record.player?.avatarImage
                    : "/assets/images/placeholder.jpg"
                }
              />
            </Tooltip>
          </Box>

          {/* //& PC Token */}
          <Box sx={{ pl: 4 }}>
            <Tooltip
              arrow
              placement="top"
              title={tooltipText(record.pcRace, record.pcClass)}
            >
              <Avatar
                variant="square"
                sx={{
                  mx: 1,
                  width: 75,
                  height: 75,
                  borderRadius: "10px",
                  // isolation: "isolate",
                }}
                src={
                  record.tokenUrl != ""
                    ? record.tokenUrl
                    : "/assets/images/placeholder.jpg"
                }
              />
            </Tooltip>
          </Box>

          {/* //& Menu Button */}
          <ButtonWrapper>
            <ActionItemsVert
              record={record}
              handleDelete={() => handleDelete(record)}
              handleEdit={() => handleEdit(record)}
            />
          </ButtonWrapper>
        </Box>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid
            container
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* //& Player Name */}
            <Grid
              item
              xs={5}
              sx={{
                ml: 2,
                pr: 3,
                borderRight: 1,
              }}
            >
              <Typography variant="body2" noWrap>
                {record.player.playerName}
              </Typography>
            </Grid>

            {/* //& PC Name */}
            <Grid
              item
              xs={6}
              sx={{
                pl: 3,
              }}
            >
              <Typography variant="body2">"{record.pcName}"</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default CampaignPlayerCard;

CampaignPlayerCard.propTypes = {
  record: PropTypes.object,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};
