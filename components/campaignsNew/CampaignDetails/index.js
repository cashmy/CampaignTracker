
import { useEffect, useState } from "react";
import AppContainer from "@/../../lib/components/AppContainer";
import CampaignService from "@/../../services/campaign.service";
import CampaignsContextProvider from "../CampaignsContextProvider";
import DetailLayout from "./DetailLayout";

const CampaignDetails = (initialProps) => {
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(true);

  useEffect (() => {
    const getRecordData = async (e) => {
      try {
        setLoading(true);
        const response = await CampaignService
          .getRecord(1)
          .then();
        setRecord(response.data);
        setLoading(false);
        setLoadData(false);
      } catch (e) {
        console.log("API call unsuccessful", e);
      }
    };
    getRecordData();
  }, [initialProps]);

  return (
    <CampaignsContextProvider>
      <AppContainer title="Campaign Details" cardStyle={{ background: 'none', boxShadow: 'none', border: '0 none' }} fullView>
        <DetailLayout record={record} />
      </AppContainer>
    </CampaignsContextProvider>
  );
};

export default CampaignDetails;