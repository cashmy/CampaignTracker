/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-01 10:17:40
 * @modify date 2023-03-31 19:59:20
 * @desc [description]
 */

//#region Imports
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppGridContainer from "@/../../lib/components/AppGridContainer";
import { Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
// * Components
import CampaignImage from "./CampaignImage";
import RecordDisplay from "./RecordDisplay";
import CampaignPlayers from "../CampaignPlayers";
import CampaignAdvSessTree from "./CampaignAdvSessTree";
import CampaignBilling from "../CampaignBilling";
import CampaignNotes from '/components/notes/CampaignNotes';
import CurrentSessionCard from '/components/sessions/CurrentSession/CurrentSessionCard';
import ScheduleCard from '/components/sessions/CurrentSession/ScheduleCard';
// * Services
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
    status: "Scheduled",
    scheduledStartTime: "4:00 pm",
    scheduledDow: 3,
    baseTimeZone: "CDT",
    notified: false,
  }

  return (
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
          <CampaignAdvSessTree />
        </Item>
      </Grid>
      {/* //^ Curr Sess, Schedule, Notes, Billing? */}
      <Grid item xs={12} container spacing={5}
        sx={{ mt: -10 }}
      >
        {/* //& Current Session */}
        <Grid item xs={4}>
          <CurrentSessionCard record={tempSessRecord} />
        </Grid>
        {/* //& Schedule */}
        <Grid item xs={2}>
          <ScheduleCard record={tempSessRecord} />
        </Grid>
        {/* //& Notes */}
        <Grid item xs={4}>
          <CampaignNotes />
        </Grid>
        {/* //& Billing */}
        <Grid item xs={2}>
          <CampaignBilling record={record}/>
        </Grid>
      </Grid>
    </AppGridContainer>
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
