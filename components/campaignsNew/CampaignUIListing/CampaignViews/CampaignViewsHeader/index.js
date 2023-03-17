/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-02 12:05:52
 * @modify date 2023-03-17 12:28:37
 * @desc [description]
 */

//#region //* Imports
import PropTypes from "prop-types";
// * Mui Components
import { Box, Fab, Hidden } from "@mui/material";
// * Icons
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
// * Local Components
import AppSearchBar from "@/../../lib/components/AppSearchBar";
import AppsPagination from "@/../../lib/components/AppsPagination";
import ActionIconButton from "components/controls/ActionIconButton";
import CheckBox from "./CheckBox";
import ViewSelectButtons from "./ViewSelectButtons";
// * Services
import CampaignCheckedActions from "./CampaignCheckedActions";
import {
  useCampaignsActionsContext,
  useCampaignsContext,
} from "../../../CampaignsContextProvider";
//#endregion

const CampaignViewsHeader = (props) => {
  //#region //* State & Local Variables
  const {
    filterText,
    onSetFilterText,
    checkedRecords,
    setCheckedRecords,
    // onUpdateRecords,
    onSelectRecordsForDelete,
    onSelectRecordsForStatusChg,
    handleAddRecordOpen,
    handleReload,
  } = props;
  const { page, pageView, RecordsList } = useCampaignsContext();
  const { onPageChange, onChangePageView } = useCampaignsActionsContext();
  //#endregion

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CheckBox
          checkedRecords={checkedRecords}
          setCheckedRecords={setCheckedRecords}
        />

        <AppSearchBar
          iconPosition="right"
          overlap={false}
          value={filterText}
          onChange={(event) => onSetFilterText(event.target.value)}
          // placeholder={messages['common.searchHere']}
          placeholder="search here"
        />

        {checkedRecords.length > 0 ? (
          <CampaignCheckedActions
            checkedRecords={checkedRecords}
            onSelectRecordsForDelete={onSelectRecordsForDelete}
            onSelectRecordsForStatusChg={onSelectRecordsForStatusChg}
          />
        ) : null}

        <ViewSelectButtons
          pageView={pageView}
          onChangePageView={onChangePageView}
        />
      </Box>
      <Box sx={{ ml: 3 }}>
        <ActionIconButton onClick={handleReload} tooltip="Reload table">
          <CachedIcon />
        </ActionIconButton>
      </Box>

      <Hidden smDown>
        {RecordsList?.length > 0 ? (
          <AppsPagination
            sx={{ ml: 2 }}
            count={RecordsList?.length}
            page={page}
            onPageChange={onPageChange}
          />
        ) : (
          "length?"
        )}
      </Hidden>

      <Box sx={{ ml: "auto" }}>
        <Fab size="small" aria-label="add" color="secondary">
          <AddIcon onClick={handleAddRecordOpen} />
        </Fab>{" "}
      </Box>
    </>
  );
};

export default CampaignViewsHeader;

CampaignViewsHeader.defaultProps = {
  filterText: "",
  page: 0,
};

CampaignViewsHeader.propTypes = {
  checkedRecords: PropTypes.array,
  setCheckedRecords: PropTypes.func,
  filterText: PropTypes.string,
  onSetFilterText: PropTypes.func,
  onSelectRecordsForDelete: PropTypes.func,
  onSelectRecordsForStatusChg: PropTypes.func,
  handleAddRecordOpen: PropTypes.func,
  handleReload: PropTypes.func,
};
