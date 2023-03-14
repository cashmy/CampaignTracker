/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-05 20:38:52
 * @modify date 2023-03-13 19:14:55
 * @desc [description]
 */

//#region //* Imports
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import PropTypes from "prop-types";
import AppContainer from "@/../../lib/components/AppContainer";
import DetailLayout from "./DetailLayout";
import CampaignService from "services/campaign.service";
import PlayerCampaignService from "services/playerCampaign.service";
//#endregion


const CampaignDetails = (props) => {
  //#region //* State & local variables
  const router = useRouter();
  const { campaignId } = router.query;
  const [record, setRecord] = useState({});
  const [campaignPlayers, setCampaignPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reloadCampaign, setReloadCampaign] = useState(false);
  const [reloadPlayers, setReloadPlayers] = useState(false);
  const [reloadImage, setReloadImage] = useState(false);
  //#endregion


  //#region //* Hooks
  useEffect(() => {
    const getRecordData = async (e) => {
      try {
        setLoading(true);
        const response = await CampaignService.getRecord(campaignId).then();
        setRecord(response.data);
        setLoading(false);
        setReloadCampaign(false);
      } catch (e) {
        console.log("API call unsuccessful", e);
      }
    };
    getRecordData();
  }, [campaignId, reloadCampaign]);

  useEffect(() => {
    const getTableData = async (e) => {
      try {
        setLoading(true);
        const response = await PlayerCampaignService.getAllRecordsByCampaign(
          campaignId
        ).then();
        setCampaignPlayers(response.data);
        setLoading(false);
        setReloadCampaign(false);
        setReloadPlayers(false);
      } catch (e) {
        console.log("API call unsuccessful", e);
      }
    };
    getTableData();
  }, [reloadCampaign, reloadPlayers]);
  //#endregion

  //#region //* Event Handlers
  const handleReloadCampaign = () => {
    setReloadCampaign(true);
  }
  const handleReloadPlayers = () => {
    setReloadPlayers(true);
  }
  const handleReloadImage = () => {
    setReloadImage(true);
  }
  //#endregion

  return (
    <AppContainer
      title="Campaign Details"
      cardStyle={{ background: "none", boxShadow: "none", border: "0 none" }}
      fullView
    >
      <DetailLayout 
        record={record} 
        campaignPlayers={campaignPlayers} 
        handleReloadCampaign={handleReloadCampaign}
        handleReloadPlayers={handleReloadPlayers}
      />
    </AppContainer>
  );
};

export default CampaignDetails;

CampaignDetails.defaultProps = {
  // campaignId: 1,
};

CampaignDetails.propTypes = {
  // campaignId: PropTypes.number,
};
