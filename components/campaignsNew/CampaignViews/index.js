// TODO: Parent Component for the different view types
//   + Card List view
//   + Detail List view
import { Hidden } from "@mui/material";
import AppContainer from "@/../../lib/components/AppContainer";
import AppHeader from "@/../../lib/components/AppContainer/AppHeader";
import AppContent from "@/../../lib/components/AppContainer/AppContent";
import AppFooter from "@/../../lib/components/AppContainer/AppFooter";
import CampaignViewsHeader from "./CampaignViewsHeader";
// import CampaignList from "./CampaignList";
import CampaignsContextProvider from "../CampaignContextProvider";

const CampaignViews = () => {
  // const { all, page, CampaignsList } = useCampaignsContext();

  return (
    <CampaignsContextProvider>
      <AppContainer title="Work with Campaigns" fullView>
        <AppHeader>
          <CampaignViewsHeader />
        </AppHeader>

        <AppContent>
          <div> Data views go here ... </div>
        </AppContent>

        {/* <Hidden smUp>
          {CampaignsList?.length > 0 ? (
            <AppFooter>
              <AppPagination
                count={campaignList?.length}
                page={page}
                onPageChange={onPageChange}
              />
            </AppFooter>
          ) : null}
        </Hidden> */}
      </AppContainer>
    </CampaignsContextProvider>
  );
};
export default CampaignViews;
