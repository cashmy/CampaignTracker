/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-02-14 20:45:17
 * @modify date 2023-02-23 14:36:57
 * @desc [description]
 */
// #region Imports
import { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCard from "@/../../components/controls/TableCard";
import { Collapse, Typography } from "@mui/material";
// *Services
import AdventureService from "@/../../services/adventure.service";
// * Buttons & Data Definitions
// import ActionButton from "components/controls/ActionButton";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { adventureRecord as emptyRecord } from "dataModels/adventure";
import { adventureColumns as columnCells } from "dataModels/adventure";
import useTable from "@/../../lib/hooks/useTable";
import PageDialog from "../controls/PageDialog";
import TextContrast from "lib/helpers/getTextContrast";
import AdventureDialog from "./AdventureDialog";
import Controls from "../controls/Controls";
import ActionItems from "../controls/ActionItems";
//#endregion


const AdventureList = (props) => {
  //#region //* State Variables
  const { campaign, selectAdventure } = props;
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState(emptyRecord);
  const [openAddEdit, setOpenAddEdit] = useState(false);
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
  const detailTitle = "Add/Edit Adventure";
  const collapsible = true;
  // * Table Constants
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, columnCells, filterFn, rowsPerPageOptions, collapsible);
  //#endregion

  useEffect(() => {
    if (campaign === undefined) return;
    const getTableData = async (e) => {
      try {
        setLoading(true);
        const response = await AdventureService.getAllRecordsByCampaign(
          campaign.id
        ).then();
        setRecords(response.data);
        setLoading(false);
        setLoadData(false);
      } catch (e) {
        console.log("API call unsuccessful", e);
      }
    };
    getTableData();
  }, [campaign, loadData]);

  //#region //* Handler Functions
  const handleAdd = () => {
    emptyRecord.campaignId = campaign.id;
    setRecord(emptyRecord);
    setOpenAddEdit(true);
  };
  const handleEdit = (record) => {
    setRecord(record);
    setOpenAddEdit(true);
  };
  const addOrEdit = (record, resetForm) => {
    console.log("addOrEdit", record);
    let close = false;
    if (record.id === 0) {
      AdventureService.addRecord(record);
      resetForm();
      setNotify({
        isOpen: true,
        message: "Record added",
        type: "error",
      });
      setLoadData(true); // Request reload of data
    } else {
      AdventureService.updateRecord(record);
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
    AdventureService.deleteRecord(id);
    setLoadData(true); // Request reload of data
    setNotify({
      isOpen: true,
      message: "Record deleted",
      type: "error",
    });
  };
  const typeColor = (type) => {
    switch (type) {
      case "o":
        return "darkgoldenrod";
      case "a":
        return "purple";
      case "c":
        return "darkred";

      default:
        return "lightgray";
    }
  };
  const formatSessions = (sessionCount, sessionEstimate, completed) => {
    const sessionText = `${sessionCount}/${sessionEstimate}`;

    if (completed) {
      var chipColor = "lightgreen";
    } else {
      var chipColor = "lightyellow";
    }

    if (sessionCount > 0 || completed) {
      return (
        <Chip
          label={sessionText}
          sx={{
            backgroundColor: `${chipColor}`,
            color: TextContrast.getTextContrast(chipColor),
          }}
        />
      );
    } else {
      return sessionText;
    }
  };
  function Row(props) {
    const { row, selectAdventure } = props;
    const [open, setOpen] = useState(false);
    const editToolTip = "Edit an item";
    const deleteToolTip = "Delete an item";

    const completedDisplay = (completed) => {
      if (completed) {
        return "Yes";
      } else {
        return "No";
      }
    };
    const handleDoubleClick = (record) => {
      selectAdventure(record);
    };

    return (
      <Fragment>
        <TableRow
          sx={{ "& > *": { borderBottom: "unset" } }}
          onDoubleClick={() => handleDoubleClick(row)}
        >
          <TableCell sx={{ width: 50 }}>
            <IconButton
              sx={{ minWidth: 0, margin: 0.5, mr: 2, p: 1 }}
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" sx={{ width: 125 }}>
            {row.name}
          </TableCell>
          <TableCell sx={{ width: 50 }}>
            {formatSessions(
              row.sessionCount,
              row.sessionEstimate,
              row.completed
            )}
            {/* {row.sessionCount}/{row.sessionEstimate} */}
          </TableCell>
          {/* // *Actions */}
          <TableCell sx={{ minWidth: 140}}>
              <ActionItems
                record={row}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                displayStatusChange={true}
              />
            {/* //& Edit */}
            {/* <ActionButton
              filled={true}
              color="darkcyan"
              tooltipText={editToolTip}
              size="small"
              onClick={() => handleEdit(row)}
            >
              <EditOutlinedIcon fontSize="small" />
            </ActionButton> */}

            {/* //& Delete */}
            {/* <ActionButton
              filled={true}
              color="red"
              tooltipText={deleteToolTip}
              size="small"
              onClick={() => handleDelete(row.id)}
            >
              <DeleteIcon fontSize="small" />
            </ActionButton> */}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell sx={{ pb: 0, pt: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small" aria-label="description">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: 200 }}>
                      <b>Desc:</b> {row.description}
                    </TableCell>
                    <TableCell sx={{ width: 50 }}>
                      <b>Cmplt?</b> {completedDisplay(row.completed)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }
  Row.propTypes = {
    row: PropTypes.shape({
      name: PropTypes.string.isRequired,
      sessionEstimate: PropTypes.number.isRequired,
      sessionCount: PropTypes.number.isRequired,
      description: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string.isRequired,
          completed: PropTypes.bool.isRequired,
        })
      ).isRequired,
    }).isRequired,
  };
  // #endregion

  return (
    <>
      <TableCard
        title={
          campaign ? "Adventures for: " : "Adventures - (Campaign not selected)"
        }
        title2={campaign ? campaign.name : ""}
        chipColor={campaign ? typeColor(campaign.type) : "lightgray"}
        action={campaign ? "Add" : ""}
        onClickHandler={handleAdd}
        tooltip={addToolTip}
      >
        {campaign && (
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
                    <Row
                      key={index}
                      row={record}
                      selectAdventure={selectAdventure}
                    />
                  ))
                )}
              </TableBody>
            </TblContainer>
          </TableContainer>
        )}
        {campaign && <TblPagination />}
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
        <AdventureDialog recordForEdit={record} addOrEdit={addOrEdit} />
      </PageDialog>
      <Controls.Notification notify={notify} setNotify={setNotify} />
      <Controls.ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default AdventureList;
