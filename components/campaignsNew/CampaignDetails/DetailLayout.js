/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-01 10:17:40
 * @modify date 2023-04-05 19:12:01
 * @desc [description]
 */

//#region Imports
import PropTypes from "prop-types";
// * Mui
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
// * Local Components
import AppGridContainer from "lib/components/AppGridContainer";
import AppScrollbar from "lib/components/AppScrollbar";
import CampaignImage from "./CampaignImage";
import RecordDisplay from "./RecordDisplay";
import CampaignPlayers from "../CampaignPlayers";
import CampaignsAdvSessTree from "./CampaignsAdvSessTree/[...all]";
import CampaignBilling from "../CampaignBilling";
import CampaignNotes from "/components/notes/CampaignNotes";
import CurrentSessionCard from "/components/sessions/CurrentSession/CurrentSessionCard";
import ScheduleCard from "/components/sessions/CurrentSession/ScheduleCard";
//#endregion

//#region //* Styles
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
//#endregion

const DetailLayout = (props) => {
  const {
    record,
    campaignPlayers,
    handleReloadCampaign,
    handleReloadPlayers,
    handleReloadImage,
    handleEdit,
    handleDelete,
  } = props;

  // ! For Testing purposes only - Remove when done
  const tempSessRecord = {
    name: "Part3: Obtaining the Scarf of Resolve",
    description: "The party must find the scarf of resolve.",
    activity: "Working on it ...",
    sessionDate: new Date(),
    sessionLength: 3,
    sideQuest: true,
    status: "ip",
    scheduledStartTime: "4:00 pm",
    scheduledDow: 3,
    baseTimeZone: "CDT",
    notified: false,
  };

  return (
    <AppScrollbar>
      <AppGridContainer>
        {/* //^ Image, Dtls, & Players */}
        <Grid item xs={9} container spacing={5}>
          {/* //& Image */}
          <Grid item xs={3}>
            <CampaignImage
              record={record}
              handleReloadImage={handleReloadImage}
            />
          </Grid>
          {/* //& Detais */}
          <Grid item xs={9}>
            <RecordDisplay
              record={record}
              handleReloadCampaign={handleReloadCampaign}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </Grid>
          {/* //& Players */}
          <Grid item xs={12}>
            <CampaignPlayers
              campaign={record}
              campaignPlayers={campaignPlayers}
              handleReloadPlayers={handleReloadPlayers}
            />
          </Grid>
        </Grid>
        {/* //^ Tree */}
        <Grid item xs={3} sx={{ height: "auto" }}>
          <Item>
            {record.id > 0 && <CampaignsAdvSessTree record={record} />}
          </Item>
        </Grid>
        {/* //^ Curr Sess, Schedule, Notes, Billing? */}
        <Grid item xs={12} container spacing={5} sx={{ mt: -10 }}>
          {/* //& Current Session */}
          <Grid item xs={4}>
            <CurrentSessionCard record={tempSessRecord} />
          </Grid>
          {/* //& Schedule */}
          <Grid item xs={2}>
            <ScheduleCard record={tempSessRecord} campaign={record} />
          </Grid>
          {/* //& Notes */}
          <Grid item xs={4}>
            <CampaignNotes record={record} />
          </Grid>
          {/* //& Billing */}
          <Grid item xs={2}>
            <CampaignBilling record={record} />
          </Grid>
        </Grid>
      </AppGridContainer>
    </AppScrollbar>
  );
};

export default DetailLayout;

DetailLayout.propTypes = {
  record: PropTypes.object,
  campaignPlayers: PropTypes.array,
  handleReloadCampaign: PropTypes.func,
  handleReloadPlayers: PropTypes.func,
  handleReloadImage: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};
