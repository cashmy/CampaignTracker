import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Hidden } from "@mui/material";

import AppSearchBar from "@/../../lib/components/AppSearchBar";
import AppsPagination from "@/../../lib/components/AppsPagination";
import ViewSelectButtons from "./ViewSelectButtons";
import CheckBox from "./CheckBox";
import CampaignCheckedActions from "./CampaignCheckedActions";
import {
  useCampaignsActionsContext,
  useCampaignsContext,
} from "../../../CampaignsContextProvider";

const CampaignViewsHeader = (props) => {
  const {
    filterText,
    onSetFilterText,
    checkedRecords,
    setCheckedRecords,
    // onUpdateRecords,
    onSelectRecordsForDelete,
    onSelectRecordsForStatusChg,
  } = props;
  const { page, pageView, RecordsList } = useCampaignsContext();
  const { onPageChange, onChangePageView } = useCampaignsActionsContext();

  // const { messages } = useIntl();

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
            checkedRecordss={checkedRecords}
            onSelectRecordsForDelete={onSelectRecordsForDelete}
            onSelectRecordsForStatusChg={onSelectRecordsForStatusChg}
          />
        ) : null}

        <ViewSelectButtons
          pageView={pageView}
          onChangePageView={onChangePageView}
        />
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
};
