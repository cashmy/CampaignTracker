/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-01 10:17:40
 * @modify date 2023-03-17 11:07:32
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
// import CampaignNotes from './CampaignNotes';  ???????????
import CampaignAdvSessTree from './CampaignAdvSessTree';
// import SessionDetail from '/components/sessions/SessionDetail';
// * Services
//#endregion

//#region //* Styles
// const CampaignDetailWrapper = styled(Grid)(({ theme }) => ({
//   border: `5px solid ${theme.palette.grey[300]}`,
//   background: theme.palette.background.paper,
// }));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
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

  return (
    <AppGridContainer>
      <Grid item xs={9} container spacing={5}>
        <Grid item xs={3}>
          <CampaignImage
            record={record}
            handleReloadImage={handleReloadImage}
          />
        </Grid>

        <Grid item xs={9}>
          <RecordDisplay
            record={record}
            handleReloadCampaign={handleReloadCampaign}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </Grid>
        <Grid item xs={12}>
          <CampaignPlayers
            campaign={record}
            campaignPlayers={campaignPlayers}
            handleReloadPlayers={handleReloadPlayers}
          />
        </Grid>
      </Grid>

      <Grid item xs={3} sx={{height: "auto"}}>
        <Item>
          <CampaignAdvSessTree />
        </Item>
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
