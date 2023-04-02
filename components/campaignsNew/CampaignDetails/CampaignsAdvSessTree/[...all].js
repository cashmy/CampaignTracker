import CampaignAdvSessTree from "./CampaignAdvSessTree";
import AdventuresContextProvider from "components/adventures/AdventuresContextProvider";
import SessionsContextProvider from "components/sessions/SessionsContextProvider";

const CampaignsAdvSessTree = (props) => {
  const { record } = props; // Campaign record
  return (
    <AdventuresContextProvider campaign={record}>
      <SessionsContextProvider>
        <CampaignAdvSessTree record={record} />
      </SessionsContextProvider>
    </AdventuresContextProvider>
  );
};

export default CampaignsAdvSessTree;
