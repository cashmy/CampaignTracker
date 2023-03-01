/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-02-28 11:29:57
 * @modify date 2023-02-28 19:06:49
 * @desc [description]
 */

//#region Imports
import { useState, Fragment } from "react";
import CampaignViewsHeader from "./CampaignViewsHeader";
import AppConfirmDialog from "@/../../lib/components/AppConfirmDialog";
// import CreatePlayer from '../CreatePlayer';
import { Hidden } from "@mui/material";
import CampaignViewList from './CampaignViewList';
// import PlayerDetail from '../PlayerDetail';
import AppsPagination from "@/../../lib/components/AppsPagination";
import AppHeader from "@/../../lib/components/AppContainer/AppHeader";
import AppContent from "@/../../lib/components/AppContainer/AppContent";
import AppFooter from "@/../../lib/components/AppContainer/AppFooter";
import { useInfoViewActionsContext } from "@/../../lib/context/AppContextProvider/InfoViewContextProvider";
// import { postDataApi, putDataApi } from '@crema/hooks/APIHooks';
import {
  useCampaignsActionsContext,
  useCampaignsContext,
} from "../../CampaignsContextProvider";
//#endregion

const CampaignViews = () => {
  //#region //* State & Local variables
  const { all, page, RecordsList } = useCampaignsContext();
  const { onPageChange, setRecordsData } = useCampaignsActionsContext();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [filterText, onSetFilterText] = useState("");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [checkedRecords, setCheckedRecords] = useState([]);
  const [toDeleteRecords, setToDeleteRecords] = useState([]);
  const [isAddRecord, onSetIsAddRecord] = useState(false);
  const [isShowDetail, onShowDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  //#endregion

  //#region //* Event Handlers & Callbacks
  const handleAddRecordOpen = () => {
    onSetIsAddRecord(true);
  };
  const onChangeActive = (status, record) => {
    const selectedIdList = [record.id];
    alert('onChangeActive');
    // putDataApi('/api/PlayerApp/update/starred', infoViewActionsContext, {
    //   PlayerIds: selectedIdList,
    //   status: status,
    // })
    //   .then((data) => {
    //     onUpdateSelectedPlayer(data[0]);
    //     infoViewActionsContext.showMessage(
    //       data[0].isStarred
    //         ? 'Player Marked as Starred Successfully'
    //         : 'Player Marked as Unstarred Successfully'
    //     );
    //   })
    //   .catch((error) => {
    //     infoViewActionsContext.fetchError(error.message);
    //   });
  };
  const onOpenEditRecord = (record) => {
    setSelectedRecord(record);
    handleAddRecordOpen();
  };
  const onViewRecordDetail = (record) => {
    setSelectedRecord(record);
    onShowDetail(true);
  };
  const onDeleteSelectedRecords = () => {
    // postDataApi('http//localhost:5000/api/players/delete/player', infoViewActionsContext, {
    //   type: all[0],
    //   name: all[1],
    //   PlayerIds: toDeletePlayers,
    //   page,
    // })
    //   .then((data) => {
    //     setPlayerData(data);
    //     infoViewActionsContext.showMessage('Player Deleted Successfully');
    //   })
    //   .catch((error) => {
    //     infoViewActionsContext.fetchError(error.message);
    //   });
    setDeleteDialogOpen(false);
    setCheckedRecords([]);
  };
  const onSelectRecordsForDelete = (RecordIds) => {
    setToDeleteRecords(RecordIds);
    setDeleteDialogOpen(true);
  };
  const onSelectRecordsForStatusChg = (PlayerIds) => {
    // TODO : change status
    alert("Changing status(es)")
    // setToDeletePlayers(PlayerIds);
    // setDeleteDialogOpen(true);
  };
  const handleSchedule = (record) => {
    alert("Scheduling record " + record.id);
  }
  const onGetFilteredItems = () => {
    if (filterText === "") {
      return RecordsList;
    } else {
      return RecordsList?.filter((Player) =>
        Record.name.toUpperCase().includes(filterText.toUpperCase())
      );
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
        />
      </AppHeader>

      <AppContent>
        <CampaignViewList 
          list={list}
          checkedRecords={checkedRecords}
          onChangeCheckedRecords={setCheckedRecords}
          handleAddRecordOpen={handleAddRecordOpen}
          onChangeActive={onChangeActive}
          onSelectRecordsForDelete={onSelectRecordsForDelete}
          onOpenEditRecord={onOpenEditRecord}
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
      {/* Create Record */}

      {/* View Detail */}

      {/* Delete Record */}
      <AppConfirmDialog
        open={isDeleteDialogOpen}
        onDeny={setDeleteDialogOpen}
        onConfirm={onDeleteSelectedRecords}
        // TODO: Intl Translation here
        title="Are you sure, you want to delete the selected Record ?"
        dialogTitle="Delete Item(s)"
      />
    </Fragment>
  );
};

export default CampaignViews;