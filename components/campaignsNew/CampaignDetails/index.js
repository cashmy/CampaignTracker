import AppContainer from "@/../../lib/components/AppContainer";
import CampaignsContextProvider from "../CampaignsContextProvider";

const CampaignDetails = (initialProps) => {
  return (
    <CampaignsContextProvider>
      <AppContainer title="Campaign Details" fullView>
        <div>Campaign Details</div>
      </AppContainer>
    </CampaignsContextProvider>
  );
};

export default CampaignDetails;