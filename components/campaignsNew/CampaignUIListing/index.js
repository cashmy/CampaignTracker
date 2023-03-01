import AppContainer from "@/../../lib/components/AppContainer";
import CampaignViews from "./CampaignViews";
import CampaignsContextProvider from "../CampaignsContextProvider";

const CampaignUIListing = () => {
  return (
    <CampaignsContextProvider>
      <AppContainer title="Work with Campaigns" fullView>
        <CampaignViews />
      </AppContainer>
    </CampaignsContextProvider>
  );
};

export default CampaignUIListing;
