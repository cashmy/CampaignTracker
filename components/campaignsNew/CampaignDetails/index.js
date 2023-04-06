/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-05 20:38:52
 * @modify date 2023-04-05 08:48:14
 * @desc [description]
 */

//#region //* Imports
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AppContainer from "@/../../lib/components/AppContainer";
import DetailLayout from "./DetailLayout";
import CampaignDialog from "components/campaigns/CampaignDialog";
import PageDialog from "components/controls/PageDialog";
import Controls from "components/controls/Controls";
// * Services
import { CampaignRecord as emptyRecord } from "dataModels/campaign";
import CampaignService from "services/campaign.service";
import PlayerCampaignService from "services/playerCampaign.service";
//#endregion

const CampaignDetails = () => {
  //#region //* State & local variables
  const router = useRouter();
  const { campaignId } = router.query;
  const [record, setRecord] = useState({});
  const [campaignPlayers, setCampaignPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reloadCampaign, setReloadCampaign] = useState(false);
  const [reloadPlayers, setReloadPlayers] = useState(false);
  const [reloadImage, setReloadImage] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [openAddEdit, SetOpenAddEdit] = useState(false);
  const [detailTitle, setDetailTitle] = useState("Add/Edit Campaign");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
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
  useEffect(() => {
    //TODO - reload image
    setReloadImage(false);
  }, [reloadImage]);
  //#endregion

  //#region //* Event Handlers
  const handleEdit = (e) => {
    setSelectedRecord(record);
    setDetailTitle("Edit Campaign");
    SetOpenAddEdit(true);
  };
  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to delete this entry?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        onDelete(id);
        router.back();
        setReloadCampaign(true); // Request reload of data
      },
    });
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    CampaignService.deleteRecord(id);
    setReloadCampaign(true); // Request reload of data
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
  };
  const addEditRecord = (record, resetForm) => {
    let close = false;
    if (record.id !== 0) {
      CampaignService.updateRecord(record);
      setNotify({
        isOpen: true,
        message: "Record modified",
        type: "error",
      });
      close = true;
      // setReloadCampaign(true);
      setReloadCampaign(true);
    }
    if (close) {
      resetForm();
      setSelectedRecord(emptyRecord);
      SetOpenAddEdit(false); // Close Popup modal
    }
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };
  const handleReloadCampaign = () => {
    setReloadCampaign(true);
  };
  const handleReloadPlayers = () => {
    setReloadPlayers(true);
  };
  const handleReloadImage = () => {
    setReloadImage(true);
  };
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
        handleReloadImage={handleReloadImage}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* //& Modals & Dialogs */}
      {/* Create/Edit Record */}
      <PageDialog
        openPopup={openAddEdit}
        setOpenPopup={SetOpenAddEdit}
        title={detailTitle}
        titleColor={process.env.NEXT_PUBLIC_NX_PRIMARY_COLOR}
        size="sm"
      >
        <CampaignDialog
          recordForEdit={selectedRecord}
          addOrEdit={addEditRecord}
        />
      </PageDialog>
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      {/* Notification */}
      <Controls.Notification notify={notify} setNotify={setNotify} />
    </AppContainer>
  );
};

export default CampaignDetails;
