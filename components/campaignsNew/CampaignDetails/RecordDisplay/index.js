/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-02 12:05:52
 * @modify date 2023-03-07 11:24:51
 * @desc [description]
 */

//#region //* Imports
import PropTypes from "prop-types";
import { useRouter } from "next/router";
// * Mui Components
import { Avatar, Box, Grid, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// * Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PublicIcon from "@mui/icons-material/Public"; // * World
import GamesSharpIcon from "@mui/icons-material/GamesSharp"; // * Game
import EventSeatSharpIcon from "@mui/icons-material/EventSeatSharp"; // * Tabletop
import { CiWavePulse1 } from "react-icons/ci"// * Frequency
import DateRangeSharpIcon from "@mui/icons-material/DateRangeSharp"; // * Day of Week
import HourglassTopSharpIcon from "@mui/icons-material/HourglassTopSharp"; // * TimeSlot
import ConnectWithoutContactSharpIcon from "@mui/icons-material/ConnectWithoutContactSharp"; // *Nbr of PCs
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp"; // * Money
// import MonetizationOnSharpIcon from "@mui/icons-material/MonetizationOnSharp"; // * Money Alt
import { FaDiscord } from "react-icons/fa"; // * Discord
// * Local Components
import CampaignTypeIcon from "../../CampaignTypeIcon";
import AppScrollbar from "lib/components/AppScrollbar";
import ActionItems from "components/controls/ActionItems";
// * Services
//#endregion

//#region //* Styles
const BackDrop = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 15,
}));
//#endregion

const RecordDisplay = (props) => {
  //#region //* State & local variables
  const { record, handleReloadCampaign } = props;
  const router = useRouter();
  //#endregion

  //#region //* Hooks
  //#endregion

  //#region //* Event Handlers
  const onSelectRecordsForDelete = () => {};
  const onOpenEditRecord = () => {
    alert("Edit Record");
    handleReloadCampaign();
  };
  const handleStatusChange = () => {};
  const dowText = (dow) => {
    switch (dow) {
      case 1:
        return "Sunday";
      case 2:
        return "Monday";
      case 3:
        return "Tuesday";
      case 4:
        return "Wednesday";
      case 5:
        return "Thursday";
      case 6:
        return "Friday";
      case 7:
        return "Saturday";
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
  const timeSlotText = (timeSlot) => {
    switch (timeSlot) {
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
  const costText = (cost) => {
    switch (cost) {
      case 0:
        return "Free";
      default:
        return "$" + cost + " per session";
    }
  };
  //#endregion

  return (
    <>
      <BackDrop>
        <Grid container sx={{ pl: 3, pr: 3 }}>
          {/* //^ Header */}
          <Grid container sx={{ pt: 3 }}>
            {/* //& Back Button */}
            <Grid item md={2} lg={1}  sx={{ mr: 5, pt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                size="small"
                onClick={() => router.back()}
                color="secondary"
              >
                Back
              </Button>
            </Grid>

            {/* //& Type: Campaign, Adventure, One-Shot */}
            <Grid item xs={1}>
              <CampaignTypeIcon type={record.type} size="30" />
            </Grid>

            {/* //& Name/Title */}
            <Grid item md={3} lg={5} xl={6} sx={{ pt: 3 }}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                {record.name}
              </Typography>
            </Grid>

            {/* //& Action Items Menu */}
            <Grid item xs={3} sx={{ ml: 10, display: "flex" }}>
              <ActionItems
                record={record}
                handleDelete={onSelectRecordsForDelete}
                handleEdit={onOpenEditRecord}
                handleStatusChange={handleStatusChange}
              />
            </Grid>
          </Grid>

          {/* //^ Body Block 1 */}
          <Grid container sx={{ mt: 3 }}>
            {/* //& DM Avatar, Name, Country */}
            <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt={record.dm}
                src={"/assets/images/avatar/A12.jpg"}
                sx={{ width: 48, height: 48, mr: 3 }}
              />
              <Typography> DM <br/> {record.dm} </Typography>
              {/* // TODO: Optional - add country flag after doing a lookup in players by name  */}
            </Grid>
            {/* //& Record Description (scrollable) */}
            <Grid
              item
              xs={9}
              sx={{
                mb: 3,
                p: 3,
                minHeight: 85,
                maxHeight: 85,
                borderColor: "grey !important",
                borderRadius: 3,
                border: 1,
              }}
            >
              <AppScrollbar>
                <Typography gutterBottom>{record.description} </Typography>
              </AppScrollbar>
            </Grid>
          </Grid>

          {/* //^ Body Block 2 */}
          {/* //? Section 1 */}
          <Grid item xs={4} sx={{ mt: 2, mb: 3 }}>
            {/* //& World */}
            <Box
              sx={{
                mb: { xs: 2, md: 3 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <PublicIcon
                sx={{
                  fontSize: 24,
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
              <Box sx={{ ml: 3.5 }}>
                {record.world ? (
                  record.world
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "grey",
                      fontStyle: record.world ? "normal" : "italic",
                    }}
                  >
                    World
                  </Typography>
                )}
              </Box>
            </Box>

            {/* //& Game System */}
            <Box
              sx={{
                mb: { xs: 2, md: 3 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <GamesSharpIcon
                sx={{
                  fontSize: 24,
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
              <Box sx={{ ml: 3.5 }}>
                {record.gameSystem ? (
                  record.gameSystem
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "grey",
                      fontStyle: record.gameSystem ? "normal" : "italic",
                    }}
                  >
                    Game System
                  </Typography>
                )}
              </Box>
            </Box>

            {/* //& Style */}
            <Box
              sx={{
                mb: { xs: 2, md: 3 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <EventSeatSharpIcon
                sx={{
                  fontSize: 24,
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
              <Box sx={{ ml: 3.5 }}>
                {record.style ? (
                  record.style
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "grey",
                      fontStyle: record.style ? "normal" : "italic",
                    }}
                  >
                    Game Style
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>

          {/* //? Section 2 */}
          <Grid
            item
            xs={4}
            sx={{
              pt: 2,
              mb: 2,
              px: 3,
              borderLeft: 1,
              borderRight: 1,
              borderColor: "grey !important",
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

            {/* //& TimeSlot */}
            <Box
              sx={{
                mb: { xs: 2, md: 3 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <HourglassTopSharpIcon
                sx={{
                  fontSize: 24,
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
              <Box sx={{ ml: 3.5 }}>
                {record.timeSlot ? (
                  timeSlotText(record.timeSlot)
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "grey",
                      fontStyle: record.timeSlot ? "normal" : "italic",
                    }}
                  >
                    Time Slot
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>

          {/* //? Section 3 */}
          <Grid item xs={4} sx={{ mt: 2, mb: 3, pl: 3 }}>
            {/* //& PCs */}
            <Box
              sx={{
                mb: { xs: 2, md: 3 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <ConnectWithoutContactSharpIcon
                sx={{
                  fontSize: 24,
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
              <Box sx={{ ml: 3.5 }}>
                <Typography variant="h6">
                  {record.pcCount} / {record.pcIdeal}
                </Typography>
              </Box>
            </Box>

            {/* //& Cost */}
            <Box
              sx={{
                mb: { xs: 2, md: 3 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <AttachMoneySharpIcon
                sx={{
                  fontSize: 24,
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
              <Box sx={{ ml: 3.5 }}>
                <Typography variant="h6">
                  {costText(record.cost)}
                </Typography>
              </Box>
            </Box>

            {/* //& Discord */}
            <Box
              sx={{
                mb: { xs: 2, md: 3 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaDiscord
                size={24}
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
              <Box sx={{ ml: 3.5 }}>
                {record.discordServer || record.discordChannel ? (
                   record.discordServer + ": #"+ record.discordChannel
                ) : (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "grey",
                      fontStyle:
                        record.discordServer || record.discordChannel
                          ? "normal"
                          : "italic",
                    }}
                  >
                    Discord Info
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>

          {/* //^ Body Block 3 ??? */}
          {/* //& Campaign Notes */}
          {/* // TODO: Add future use of extraneous notes here */}
        </Grid>
      </BackDrop>
    </>
  );
};

export default RecordDisplay;

RecordDisplay.propTypes = {
  record: PropTypes.object.isRequired,
  handleReloadCampaign: PropTypes.func.isRequired,
};
