/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-02-14 20:45:17
 * @modify date 2023-03-18 16:43:17
 * @desc [description]
 */
// #region Imports
import { useState, useEffect } from "react";
import moment from "moment";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { TimelineDot } from "@mui/lab";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import TableCard from "@/../../components/controls/TableCard";
// *Services
import SessionService from "@/../../services/session.service";
// * Buttons & Data Definitions
import LoopIcon from "@mui/icons-material/Loop";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckIcon from "@mui/icons-material/Check";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { sessionRecord as emptyRecord } from "dataModels/session";
import { sessionColumns as columnCells } from "dataModels/session";
import useTable from "@/../../lib/hooks/useTable";
import PageDialog from "../controls/PageDialog";
import SessionDialog from "./SessionDialog";
import SessionStatusDialog from "./SessionStatusDialog";
import Controls from "../controls/Controls";
import TextContrast from "lib/helpers/getTextContrast";

//#endregion

const SessionList = (props) => {
  //#region //* State Variables
  const { adventure } = props;
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState(emptyRecord);
  const [openAddEdit, setOpenAddEdit] = useState(false);
  const [openStsUpd, setOpenStsUpd] = useState(false);
  const [loadData, setLoadData] = useState(true);
  const [loading, setLoading] = useState(false);
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
  const detailTitle = "Add/Edit Session";
  // * Table Constants
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, columnCells, filterFn, rowsPerPageOptions);
  //#endregion

  useEffect(() => {
    if (adventure === undefined) return;
    const getTableData = async (e) => {
      try {
        setLoading(true);
        const response = await SessionService.getAllRecordsByAdventure(
          adventure.id
        ).then();
        setRecords(response.data);
        setLoading(false);
        setLoadData(false);
      } catch (e) {
        console.log("API call unsuccessful", e);
      }
    };
    getTableData();
  }, [adventure, loadData]);

  //#region //* Handler Functions
  const handleAdd = () => {
    emptyRecord.adventureId = adventure.id;
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
      SessionService.addRecord(record);
      resetForm();
      setNotify({
        isOpen: true,
        message: "Record added",
        type: "error",
      });
      setLoadData(true); // Request reload of data
    } else {
      SessionService.updateRecord(record);
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
      setOpenStsUpd(false); // Close Popup modal
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
    SessionService.deleteRecord(id);
    setLoadData(true); // Request reload of data
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
  };
  const handleStsUpd = (record) => {
    setRecord(record);
    setOpenStsUpd(true);
  };
  const statusIcons = (record) => {
    switch (record.status) {
      case "sc":
        return (
          <TimelineDot
            onClick={() => handleStsUpd(record)}
            sx={{
              margin: "0px 0px !important",
              backgroundColor: "lightslategray",
              width: "32px",
              height: "32px",
              fontSize: "20px",
            }}
          >
            <CheckIcon fontSize="20px" />
          </TimelineDot>
        );
      case "ip":
        return (
          <TimelineDot
            onClick={() => handleStsUpd(record)}
            sx={{
              margin: "0px",
              backgroundColor: "purple",
              width: "32px",
              height: "32px",
              fontSize: "20px",
            }}
          >
            <LoopIcon fontSize="20px" />
          </TimelineDot>
        );
      case "pl":
        return (
          <TimelineDot
            onClick={() => handleStsUpd(record)}
            sx={{
              margin: "0px",
              backgroundColor: "darkgoldenrod",
              width: "32px",
              height: "32px",
              fontSize: "20px",
            }}
          >
            <MailOutlineIcon fontSize="20px" />
          </TimelineDot>
        );
      default:
        return (
          <TimelineDot
            onClick={() => handleStsUpd(record)}
            sx={{
              margin: "0px",
              backgroundColor: "darkred",
              width: "32px",
              height: "32px",
              fontSize: "20px",
            }}
          >
            <HelpOutlineIcon fontSize="20px" />
          </TimelineDot>
        );
    }
  };
  const sideQuestIcon = (record) => {
    if (record.sideQuest) {
      return ( 
      "🏰 " + record.name )
    } else {
      return record.name;
    }
  };
  const tooltipText = (record) => {
    switch (record.status) {
      case "sc":
        return "Completed: " + record.activity;
      case "ip":
        return "In Progress: " + record.activity;
      case "pl":
        return "Planned: " + record.activity;
      default:
        return "Unknown: " + record.activity;
    }
  };
  //#endregion

  return (
    <>
      <TableCard
        title={
          adventure ? "Sessions for: " : "Sessions - (Adventure not selected)"
        }
        title2={adventure ? adventure.name : ""}
        chipColor={"lightyellow"}
        action={adventure ? "Add" : ""}
        onClickHandler={handleAdd}
        tooltip={addToolTip}
      >
        {adventure && (
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
                      onDoubleClick={() => handleStsUpd(record)}
                    >
                      <TableCell sx={{ width: 175 }}>{sideQuestIcon(record)}</TableCell>
                      <TableCell sx={{ width: 325 }}>
                        {record.description}
                      </TableCell>
                      <TableCell sx={{ width: 50 }}>
                        {moment(record.sessionDate).format("MM/DD/YYYY (ddd)")}
                      </TableCell>
                      <TableCell sx={{ width: 20 }}>
                        <Tooltip
                          title={tooltipText(record)}
                          arrow
                          placement="top"
                        >
                          {statusIcons(record)}
                        </Tooltip>
                      </TableCell>

                      {/* // *Actions */}
                      <TableCell sx={{ width: 5 }}>
                        <Controls.ActionItems
                          record={record}
                          handleEdit={handleEdit}
                          handleDelete={handleDelete}
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
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </TblContainer>
          </TableContainer>
        )}
        {adventure && <TblPagination />}
      </TableCard>
      {/* //* Dialogs, Modals, & Popups */}
      {/* // & Session Form */}
      <PageDialog
        openPopup={openAddEdit}
        setOpenPopup={setOpenAddEdit}
        title={detailTitle}
        titleColor={process.env.NEXT_PUBLIC_NX_PRIMARY_COLOR}
        size="sm"
      >
        <SessionDialog recordForEdit={record} addOrEdit={addOrEdit} />
      </PageDialog>
      {/* // & Status Update */}
      <PageDialog
        openPopup={openStsUpd}
        setOpenPopup={setOpenStsUpd}
        title={"Update Status"}
        titleColor={process.env.NEXT_PUBLIC_NX_SECONDARY_COLOR}
        displayWidth={false}
        maxWidthSet="xs"
      >
        <SessionStatusDialog recordForEdit={record} addOrEdit={addOrEdit} />
      </PageDialog>
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default SessionList;
