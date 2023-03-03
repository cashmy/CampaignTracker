/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-01 10:17:40
 * @modify date 2023-03-03 10:29:52
 * @desc [description]
 */
//#region Imports
import PropTypes from "prop-types";
import AppGridContainer from "@/../../lib/components/AppGridContainer";
import AppGrid from "@/../../lib/components/AppGrid";
import { Box, Grid, Paper } from "@mui/material";
import AppContainer from "@/../../lib/components/AppContainer";
import AppScrollbar from "@/../../lib/components/AppScrollbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
// * Components
import CampaignImage from "./CampaignImage";
import RecordDisplay from './RecordDisplay';
import CampaignPlayers from '../CampaignPlayers';
// import CampaignNotes from './CampaignNotes';  ???????????
// import CampaignAdvSessTree from './CampaignAdvSessTree';
// import SessionDetail from '/components/sessions/SessionDetail';
// * Services
//#endregion

//#region //* Styles
const CampaignDetailWrapper = styled(Grid)(({ theme }) => ({
  border: `5px solid ${theme.palette.grey[300]}`,
  background: theme.palette.background.paper,
}));

const Item = styled(Paper)(({ theme }) => ({
  height: 40,
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
//#endregion

const DetailLayout = (props) => {
  const { record } = props;
  return (
    <AppGridContainer>
      <Grid item xs={9} container spacing={5} >
        <Grid item xs={3}>
          <CampaignImage record={record} />
        </Grid>

        <Grid item xs={9}>
          <RecordDisplay record={record} />
        </Grid>
        <Grid item xs={12} >
            <CampaignPlayers record={record} />
        </Grid>
      </Grid>

      <Grid item xs={3}>
        <Item>
          <Typography>Tree view</Typography>
        </Item>
      </Grid>
    </AppGridContainer>
  );
};

export default DetailLayout;

DetailLayout.propTypes = {
  record: PropTypes.object.isRequired,
};
