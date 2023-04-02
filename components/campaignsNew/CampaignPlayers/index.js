/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-02 12:05:52
 * @modify date 2023-04-01 16:08:36
 * @desc [description]
 */

//#region //* Imports
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// * Mui Components
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
// * Icons
import AddIcon from "@mui/icons-material/Add";
// * Local Components
import AppGrid from "lib/components/AppGrid";
import AppScrollbar from "lib/components/AppScrollbar";
import ActionIconButton from "components/controls/ActionIconButton";
import PlayerListSkeleton from "lib/components/AppSkeleton/PlayerListSkeleton";
import ListEmptyResult from "lib/components/AppList/ListEmptyResult";
import { playerCampaignRecord as emptyRecord } from "dataModels/playerCampaign";
import CampaignPlayerCard from "./CampaignPlayerCard";
import CampaignPlayerDialog from "./CampaignPlayerDialog";
import Controls from "components/controls/Controls";
import PageDialog from "components/controls/PageDialog";
// * Services
import PlayerCampaignService from "services/playerCampaign.service";
//#endregion

//#region //* Styles
const BackDrop = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "95%",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 10,
}));
//#endregion

const CampaignPlayersList = (props) => {
  //#region //* State & local variables
  const { campaign, campaignPlayers, handleReloadPlayers } = props;
  emptyRecord.campaignId = campaign.id;
  const [record, setRecord] = useState({});
  const [openAddEdit, setOpenAddEdit] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const theme = useTheme();
  //#endregion

  //#region //* Event Handlers
  const handleAdd = () => {
    setRecord(emptyRecord);
    setOpenAddEdit(true);
  };
  const handleEdit = (record) => {
    setRecord(record);
    setOpenAddEdit(true);
  };
  const addOrEdit = (record, resetForm) => {
    let close = false;
    if (record.id === 0) {
      record.player = null;
      PlayerCampaignService.addRecord(record);
      resetForm();
      setNotify({
        isOpen: true,
        message: "Record added",
        type: "error",
      });
      handleReloadPlayers();
    } else {
      PlayerCampaignService.updateRecord(record);
      setNotify({
        isOpen: true,
        message: "Record modified",
        type: "error",
      });
      close = true;
      handleReloadPlayers();
    }
    if (close) {
      resetForm();
      setRecord(emptyRecord);
      setOpenAddEdit(false); // Close Popup modal
    }
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };
  const handleDelete = (record) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to delete this entry?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        onDelete(record.id);
      },
    });
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    PlayerCampaignService.deleteRecord(id);
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
    handleReloadPlayers();
  };
  //#endregion

  return (
    <>
      <BackDrop>
        {/* //^ Header */}
        <Box
          sx={{
            mt: 1,
            mb: 3,
            px: 3,
            pb: 2,
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          {/* //& Title */}
          <Grid item xs={11}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Players ({campaignPlayers.length})
            </Typography>
          </Grid>

          {/* //& Add Button */}
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              justifyContent: "right",
            }}
          >
            <ActionIconButton
              filled={true}
              color={theme.palette.secondary.main}
              tooltipText="Add Player"
              onClick={handleAdd}
            >
              <AddIcon sx={{ fontSize: 20 }} />
            </ActionIconButton>
          </Grid>
        </Box>

        {/* //^ Body */}
        <Box sx={{ mb: 3 }}>
          <AppScrollbar sx={{ overflowY: 'hidden'}} >
            <AppGrid
              responsive={{
                xs: 1,
                sm: 2,
                md: 3,
                lg: 2,
                xl: 3,
              }}
              data={campaignPlayers}
              horizontal={true}
              sx={{
                pt: 0,
                pb: 0,
                flex: 1,
                display: "flex",
                flexDirection: "row",
              }}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle="Add Player to Campaign"
                  onClick={handleAdd}
                  placeholder={<PlayerListSkeleton />}
                  minHeight="20"
                />
              }
              renderRow={(record) => (
                // <div> {record.player.playerName} </div>
                <CampaignPlayerCard
                  key={record.id}
                  record={record}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            />
          </AppScrollbar>
        </Box>
      </BackDrop>

      {/* //* Dialogs, Modals, & Popups */}
      {/* // & Standard RH Form */}
      <PageDialog
        openPopup={openAddEdit}
        setOpenPopup={setOpenAddEdit}
        title="Add/Edit Players in a Campaign"
        titleColor={process.env.NEXT_PUBLIC_NX_PRIMARY_COLOR}
        size="sm"
      >
        <CampaignPlayerDialog recordForEdit={record} addOrEdit={addOrEdit} />
      </PageDialog>
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default CampaignPlayersList;

CampaignPlayersList.propTypes = {
  campaign: PropTypes.object,
  campaignPlayers: PropTypes.array,
  handleReloadPlayers: PropTypes.func,
};
