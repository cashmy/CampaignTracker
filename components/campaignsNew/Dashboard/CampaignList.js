/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-02-14 20:45:17
 * @modify date 2023-02-27 17:58:37
 * @desc [description]
 */
// #region Imports
import React, { useEffect, useRef, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import TableCard from "@/../../components/controls/TableCard";
import ActionIconButton from "components/controls/ActionIconButton";
import { BiTargetLock } from "react-icons/bi";
import { GiPistolGun } from "react-icons/gi";
import { MdCampaign } from "react-icons/md";
import { CampaignRecord as emptyRecord } from "dataModels/campaign";
import { campaignColumns as columnCells } from "dataModels/campaign";
import CampaignActionItems from "./CampaignActionItems";
import useTable from "@/../../lib/hooks/useTable";
import PageDialog from "../controls/PageDialog";
import CampaignDialog from "./CampaignDialog";
import Controls from "../controls/Controls";
// *Services
import CampaignService from "@/../../services/campaign.service";
//#endregion

const CampaignList = (props) => {
  //#region //* State Variables
  const { selectCampaign } = props;
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState(emptyRecord);
  const [openAddEdit, setOpenAddEdit] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [archiveStatus, setArchiveStatus] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const rowsPerPageOptions = [3, 6, 9, { value: -1, label: "All" }];
  const addToolTip = "Add a brand new item";
  const editToolTip = "Edit an item";
  const deleteToolTip = "Delete an item";
  const scheduleToolTip = "Schedule an item";
  const detailTitle = "Add/Edit Campaign";
  // * Table Constants
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, columnCells, filterFn, rowsPerPageOptions);
  //#endregion

  useEffect(() => {
    const getTableData = async (e) => {
      try {
        setLoading(true);
        const response = await CampaignService
          // .getAllRecordsBySts(archiveStatus)
          .getAllRecords()
          .then();
        setRecords(response.data);
        setLoading(false);
        setLoadData(false);
      } catch (e) {
        console.log("API call unsuccessful", e);
      }
    };
    getTableData();
  }, [archiveStatus, loadData]);

  //#region //* Handler Functions
  const handleRowClick = (record) => {
    selectCampaign(record);
  };
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
      CampaignService.addRecord(record);
      resetForm();
      setNotify({
        isOpen: true,
        message: "Record added",
        type: "error",
      });
      setLoadData(true); // Request reload of data
    } else {
      CampaignService.updateRecord(record);
      setNotify({
        isOpen: true,
        message: "Record modified",
        type: "error",
      });
      close = true;
      setLoadData(true); // Request reload of data
    }
    if (close) {
      resetForm();
      setRecord(null);
      setOpenAddEdit(false); // Close Popup modal
    }
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };
  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure you want to delete this entry?",
      subTitle: "You can't undo this action.",
      onConfirm: () => {
        onDelete(id);
      },
    });
  };
  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    CampaignService.deleteRecord(id);
    setLoadData(true); // Request reload of data
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
  };
  const dowText = (dow) => {
    switch (dow) {
      case 1:
        return "Sun";
      case 2:
        return "Mon";
      case 3:
        return "Tue";
      case 4:
        return "Wed";
      case 5:
        return "Thu";
      case 6:
        return "Fri";
      case 7:
        return "Sat";
      default:
        return "None";
    }
  };
  const frequencyText = (frequency) => {
    switch (frequency) {
      case "w":
        return "Weekly";
      case "b":
        return "Bi-Weekly";
      case "m":
        return "Monthly";
      case "v":
        return "Varies";
      case "o":
        return "Once";
      case "n":
        return "Never";
      case "t":
        return "TBD";
      default:
        return "Unknown";
    }
  };
  const typeText = (type) => {
    switch (type) {
      case "o":
        return (
          <ActionIconButton
            filled={true}
            color="darkgoldenrod"
            tooltipText="One-Shot"
          >
            <BiTargetLock />
          </ActionIconButton>
        ); // One-Shot
      case "a":
        return (
          <ActionIconButton
            filled={true}
            color="purple"
            tooltipText="Adventure: multiple sessions"
          >
            <GiPistolGun />
          </ActionIconButton>
        ); // Adv
      case "c":
        return (
          <ActionIconButton
            filled={true}
            color="darkred"
            tooltipText="Campaign: a 'Zero to Hero' approach"
          >
            <MdCampaign />
          </ActionIconButton>
        ); // Cmgn

      default:
        return "None";
    }
  };
  const handleSchedule = (record) => {
    alert("Scheduling record " + record.id);
  };
  // #endregion

  return (
    <>
      <TableCard
        title="Manage Campaigns"
        action="Add"
        onClickHandler={handleAdd}
        tooltipText={addToolTip}
      >
        {/* <> */}
        <TableContainer sx={{ maxHeight: 200 }} component={Paper}>
          <TblContainer stickyHeader={true} size="small">
            <TblHead />
            <TableBody>
              {loading ? (
                <TableRow key="999">
                  <TableCell>
                    <Typography> Loading ... </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                recordsAfterPagingAndSorting().map((record, index) => (
                  <TableRow
                    key={index}
                    onDoubleClick={() => handleRowClick(record)}
                  >
                    <TableCell sx={{ width: 150 }}>{record.name}</TableCell>
                    <TableCell sx={{ width: 75, padding: '6px 6px !important' }}>
                      {typeText(record.type)}
                    </TableCell>
                    <TableCell>{frequencyText(record.frequency)}</TableCell>
                    <TableCell sx={{ maxWidth: 50 }}>
                      {dowText(record.dow)}
                    </TableCell>

                    {/* // *Actions */}
                    <TableCell sx={{ minWidth: 140}}>
                    <CampaignActionItems
                          record={record}
                          handleEdit={handleEdit}
                          handleDelete={handleDelete}
                          handleSchedule={handleSchedule}
                        />
                      {/* //& Edit */}
                      {/* <ActionButton
                        filled={true}
                        color="darkcyan"
                        tooltipText={editToolTip}
                        size="small"
                        onClick={() => handleEdit(record)}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </ActionButton> */}

                      {/* //& Delete */}
                      {/* <ActionButton
                        filled={true}
                        color="red"
                        tooltipText={deleteToolTip}
                        size="small"
                        onClick={() => handleDelete(record.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </ActionButton> */}

                      {/* //& Schedule */}
                      {/* <ActionButton
                        filled={true}
                        color="blue"
                        tooltipText={scheduleToolTip}
                        size="small"
                        onClick={() => handleSchedule(record)}
                      >
                        <CalendarMonthIcon />
                      </ActionButton> */}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </TblContainer>
        </TableContainer>
        <TblPagination />
      </TableCard>

      {/* //* Dialogs, Modals, & Popups */}
      {/* // & Standard RH Form */}
      <PageDialog
        openPopup={openAddEdit}
        setOpenPopup={setOpenAddEdit}
        title={detailTitle}
        titleColor={process.env.NEXT_PUBLIC_NX_PRIMARY_COLOR}
        size="sm"
      >
        <CampaignDialog recordForEdit={record} addOrEdit={addOrEdit} />
      </PageDialog>
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default CampaignList;
