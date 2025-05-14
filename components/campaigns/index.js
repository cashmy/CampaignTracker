import { useState } from "react";
import AppGridContainer from "@/../../lib/components/AppGridContainer";
import { Card, Grid, Typography } from "@mui/material";

import CampaignHeader from "./CampaignHeader";
import CampaignList from "./CampaignList";
import AdventureList from "../adventures/AdventureList";
import { CampaignRecord as emptyCampaignRecord } from "dataModels/campaign";
import { AdventureRecord as emptyAdventureRecord } from "dataModels/adventure";
import SessionList from "../sessions/SessionList";
import TimeLineList from "../timelines/TimelineList";

const CampaignDashboard = () => {
  const [campaign, setCampaign] = useState(emptyCampaignRecord);
  const [adventure, setAdventure] = useState(emptyAdventureRecord);

  const handleClear = () => {
    setCampaign(emptyCampaignRecord);
    setAdventure(emptyAdventureRecord);
  };
  const selectCampaign = (record) => {
    setCampaign(record);
    setAdventure(emptyAdventureRecord);
  };
  const selectAdventure = (record) => {
    setAdventure(record);
  };

  return (
    <>
      <AppGridContainer>
        <Grid item xs={12} sx={{ paddingTop: "5px !important" }}>
          <CampaignHeader title="Campaign Tracker" handleClear={handleClear} />
        </Grid>

        <Grid item xs={9} container spacing={5}>
          <Grid item xs={7}>
            <CampaignList selectCampaign={selectCampaign} />
          </Grid>

          <Grid item xs={5}>
            <AdventureList
              campaign={campaign}
              selectAdventure={selectAdventure}
            />
          </Grid>

          <Grid item xs={12}>
            {!campaign && (
              <Card>
                <Typography sx={{ m: 2, ml: 5 }}>Sessions</Typography>
              </Card>
            )}
            {campaign && <SessionList adventure={adventure} />}
          </Grid>
        </Grid>

        <Grid item xs={3}>
          {!campaign && (
            <Card>
              <Typography sx={{ m: 2, ml: 5 }}>Timeline</Typography>
            </Card>
          )}
          {campaign && <TimeLineList adventure={adventure} />}
        </Grid>
      </AppGridContainer>
    </>
  );
};
export default CampaignDashboard;
