/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-02-28 11:29:57
 * @modify date 2023-03-13 16:31:47
 * @desc [description]
 */

//#region Imports
import { useRouter } from "next/router";
import { useState, useEffect, Fragment } from "react";
// * Mui Components
import { Hidden } from "@mui/material";
// * Local Components
import CampaignViewsHeader from "./CampaignViewsHeader";
import CampaignViewList from "./CampaignViewList";
import CampaignDialog from "components/campaigns/CampaignDialog";
import AppConfirmDialog from "lib/components/AppConfirmDialog";
import AppContent from "lib/components/AppContainer/AppContent";
import AppFooter from "lib/components/AppContainer/AppFooter";
import AppHeader from "lib/components/AppContainer/AppHeader";
import AppsPagination from "lib/components/AppsPagination";
import PageDialog from "components/controls/PageDialog";
import Controls from "components/controls/Controls";
import RecordDisplay from '../../CampaignDetails/RecordDisplay';
// * Services
import { useInfoViewActionsContext } from "lib/context/AppContextProvider/InfoViewContextProvider";
import {
  useCampaignsActionsContext,
  useCampaignsContext,
} from "../../CampaignsContextProvider";
import CampaignService from "services/campaign.service";
import { CampaignRecord as emptyRecord } from "dataModels/campaign";
import { useGetDataApi, deleteDataApi, postDataApi, patchDataApiSts } from 'lib/hooks/APIHooks';
//#endregion

const CampaignViews = () => {
  //#region //* State & Local variables
  const router = useRouter();
  const { RecordsList } = useCampaignsContext();
  const [page, setPage] = useState(0);
  const { onPageChange, setRecordsData } = useCampaignsActionsContext();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [filterText, onSetFilterText] = useState("");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [checkedRecords, setCheckedRecords] = useState([]);
  const [toDeleteRecords, setToDeleteRecords] = useState([]);
  const [openAddEdit, SetOpenAddEdit] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loadData, setLoadData] = useState(false);
  const [detailTitle, setDetailTitle] = useState("Add/Edit Campaign");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });
  const { reCallAPI, API_URL } = useCampaignsActionsContext();
  //#endregion
  
  // const [
  //   { apiData: recordList, loading },
  //   { setQueryParams, setData: setCampaignData, reCallAPI },
  // ] = useGetDataApi('/api/campaigns', {}, {}, false);

  // useEffect(() => {
  //   setPage(0);
  // }, [all]);

  // useEffect(() => {
  //   setQueryParams({
  //     page: page,
  //   });
  // }, [all, page]);
  
  //#region //* Event Handlers & Callbacks
  const handleAddRecordOpen = () => {
    setSelectedRecord(emptyRecord);
    setDetailTitle("Add Campaign");
    SetOpenAddEdit(true);
  };
  const onOpenEditRecord = (record) => {
    setSelectedRecord(record);
    setDetailTitle("Edit Campaign");
    SetOpenAddEdit(true);
  };
  const addEditRecord = (record, resetForm) => {
    let close = false;
    if (record.id === 0) {
      CampaignService.addRecord(record);
      resetForm();
      setNotify({
        isOpen: true,
        message: "Record added",
        type: "error",
      });
      reCallAPI();
    }
    else {
      CampaignService.updateRecord(record);
      setNotify({
        isOpen: true,
        message: "Record modified",
        type: "error",
      });
      close = true;
      reCallAPI();
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
  const onChangeActive = (status, record) => {
    const selectedIdList = [record.id];
    alert("onChangeActive");
    patchDataApiSts(`/api/campaigns/`, infoViewActionsContext, {
      CampaignIds: selectedIdList,
      archived: status,
    })
      .then((data) => {
        onUpdateSelectedCampaign(data[0]);
        infoViewActionsContext.showMessage(
          data[0].archived
            ? 'Campaign Marked as Archived Successfully'
            : 'Campaign Marked as Unarchived Successfully'
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
      // reCallAPI();
  };
  const onChangeCheckedRecords = (event, id) => {
    if (event.target.checked) {
      setCheckedRecords(checkedRecords.concat(id));
    } else {
      setCheckedRecords(
        checkedRecords.filter((recordId) => recordId !== id),
      );
    }
  };
  const onOpenDetails = (record) => {
    setSelectedRecord(record);
    router.push(`/campaigns/campaignDetails`);
  };
  const onViewRecordDetail = (record) => {
    setSelectedRecord(record);
    setShowDetail(true);
    alert("Viewing record " + record.id);
  };
  const onDeleteSelectedRecords = () => {
    deleteDataApi(API_URL, infoViewActionsContext, {
      recordIds: toDeleteRecords,
      page,
    })
      .then((data) => {
        // setRecordData(data);
        infoViewActionsContext.showMessage('Record Deleted Successfully');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    setDeleteDialogOpen(false);
    setCheckedRecords([]);
    reCallAPI();
  };
  const onSelectRecordsForDelete = (recordIds) => {
    console.log("Record Ids to delete: ", recordIds);
    setToDeleteRecords(recordIds);
    setDeleteDialogOpen(true);
    // reCallAPI();
  };
  const onSelectRecordsForStatusChg = (recordIds) => {
    // TODO : change status
    alert("Changing status(es)");
    // setToDeleteRecords(recordIds);
    // setDeleteDialogOpen(true);
  };
  const handleSchedule = (record) => {
    alert("Scheduling record " + record.id);
  };
  const onGetFilteredItems = () => {
    if (filterText === "") {
      return RecordsList;
    } else {
      return RecordsList?.filter((record) => {
        return (
          record.name.toUpperCase().includes(filterText.toUpperCase()) ||
          record.gameSystem.toUpperCase().includes(filterText.toUpperCase())
        );
      });
    }
  };
  const list = onGetFilteredItems();
  //#endregion

  return (
    <Fragment>
      <AppHeader>
        <CampaignViewsHeader
          checkedRecords={checkedRecords}
          setCheckedRecords={setCheckedRecords}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          onSelectRecordsForDelete={onSelectRecordsForDelete}
          onSelectRecordsForStatusChg={onSelectRecordsForStatusChg}
          handleAddRecordOpen={handleAddRecordOpen}
        />
      </AppHeader>

      <AppContent>
        <CampaignViewList
          list={list}
          checkedRecords={checkedRecords}
          onChangeCheckedRecords={onChangeCheckedRecords}
          handleAddRecordOpen={handleAddRecordOpen}
          onChangeActive={onChangeActive}
          onSelectRecordsForDelete={onSelectRecordsForDelete}
          onOpenEditRecord={onOpenEditRecord}
          onOpenDetails={onOpenDetails}
          onViewRecordDetail={onViewRecordDetail}
          handleSchedule={handleSchedule}
        />
      </AppContent>

      <Hidden smUp>
        {RecordsList?.length > 0 ? (
          <AppFooter>
            <AppsPagination
              count={RecordsList?.length}
              page={page}
              onPageChange={onPageChange}
            />
          </AppFooter>
        ) : null}
      </Hidden>

      {/* //& Modals & Dialogs */}
      {/* Create/Edit Record */}
      <PageDialog
        openPopup={openAddEdit}
        setOpenPopup={SetOpenAddEdit}
        title={detailTitle}
        titleColor={process.env.NEXT_PUBLIC_NX_PRIMARY_COLOR}
        size="sm"
      >
        <CampaignDialog recordForEdit={selectedRecord} addOrEdit={addEditRecord} />
      </PageDialog>

      {/* View Detail */}
      <PageDialog
        openPopup={showDetail}
        setOpenPopup={setShowDetail}
        title={"Basic Campaign Information"}
        titleColor={process.env.NEXT_PUBLIC_NX_PRIMARY_COLOR}
        size="md"
      >
        <RecordDisplay record={selectedRecord} showActions={false}/>
      </PageDialog>

      {/* Delete Record */}
      <AppConfirmDialog
        open={isDeleteDialogOpen}
        onDeny={setDeleteDialogOpen}
        onConfirm={onDeleteSelectedRecords}
        // TODO: Intl Translation here
        title="Are you sure, you want to delete the selected Record ?"
        dialogTitle="Delete Item(s)"
      />
      {/* Notification */}
      <Controls.Notification notify={notify} setNotify={setNotify} />
    </Fragment>
  );
};

export default CampaignViews;
