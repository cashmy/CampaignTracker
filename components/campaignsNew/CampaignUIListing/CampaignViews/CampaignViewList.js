/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-02-28 12:47:54
 * @modify date 2023-04-01 15:25:27
 * @desc [description]
 */

//#region Imports
import { Fragment } from "react";
import PropTypes from "prop-types";
// * Mui
import Box from "@mui/material/Box";
import { Hidden } from "@mui/material";
// * Local Components
import AppList from "lib/components/AppList";
import AppGrid from "lib/components/AppGrid";
import CampaignGridItem from "./CampaignGridItem";
import CampaignListItem from "./CampaignListItem";
// import CampaignDetailListMobile from "./CampaignDetailListMobile";
import ListEmptyResult from "lib/components/AppList/ListEmptyResult";
// TODO: Create & Replace this
import PlayerListSkeleton from "lib/components/AppSkeleton/PlayerListSkeleton";
// * Services
import { useCampaignsContext } from "../../CampaignsContextProvider";
//#endregion

const CampaignViewList = (props) => {
  const {
    list,
    handleAddRecordOpen,
    onChangeActive,
    checkedRecords,
    onChangeCheckedRecords,
    onSelectRecordsForDelete,
    onOpenEditRecord,
    onOpenDetails,
    onViewRecordDetail,
    handleSchedule,
  } = props;
  const { loading, pageView } = useCampaignsContext();

  return (
    <Fragment>
      {pageView === "list" ? (
        <>
          <Hidden smDown>
            <AppList
              data={list}
              animation="transition.slideUpIn"
              sx={{
                pt: 0,
                pb: 0,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle="Create Campaign"
                  onClick={handleAddRecordOpen}
                  placeholder={<PlayerListSkeleton />}
                />
              }
              renderRow={(record) => (
                <CampaignListItem
                  key={record.id}
                  record={record}
                  onChangeCheckedRecords={onChangeCheckedRecords}
                  checkedRecords={checkedRecords}
                  onSelectRecordsForDelete={onSelectRecordsForDelete}
                  onChangeActive={onChangeActive}
                  onViewRecordDetail={onViewRecordDetail}
                  onOpenEditRecord={onOpenEditRecord}
                  onOpenDetails={onOpenDetails}
                  handleSchedule={handleSchedule}
                />
              )}
            />
          </Hidden>

          <Hidden smUp>
            <AppList
              data={list}
              animation="transition.slideUpIn"
              sx={{
                pt: 0,
                pb: 0,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle="Create Campaign"
                  onClick={handleAddRecordOpen}
                  placeholder={<PlayerListSkeleton />}
                />
              }
              renderRow={(record) => (
                <div> Mobile record item </div>
                // <CampaignDetailListMobile
                //   key={Record.id}
                //   Record={Record}
                //   onChangeCheckedRecords={onChangeCheckedRecords}
                //   checkedRecords={checkedRecords}
                //   onSelectRecordsForDelete={onSelectRecordsForDelete}
                //   onChangeActive={onChangeActive}
                //   onViewRecordDetail={onViewRecordDetail}
                //   onOpenEditRecord={onOpenEditRecord}
                // />
              )}
            />
          </Hidden>
        </>
      ) : (
        <Box
          sx={{
            px: 5,
            pt: 0.5,
            pb: 3,
          }}
        >
          <AppGrid
            responsive={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
            }}
            data={list}
            renderRow={(record) => (
              <CampaignGridItem
                key={record.id}
                record={record}
                onChangeCheckedRecords={onChangeCheckedRecords}
                checkedRecords={checkedRecords}
                onChangeActive={onChangeActive}
                onSelectRecordsForDelete={onSelectRecordsForDelete}
                onViewRecordDetail={onViewRecordDetail}
                onOpenEditRecord={onOpenEditRecord}
                onOpenDetails={onOpenDetails}
                handleSchedule={handleSchedule}
              />
            )}
          />
        </Box>
      )}
    </Fragment>
  );
};

export default CampaignViewList;

CampaignViewList.defaultProps = {
  list: [],
  checkedRecords: [],
  pageView: "list",
  loading: false,
};
CampaignViewList.propTypes = {
  list: PropTypes.array,
  pageView: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  checkedRecords: PropTypes.array,
  onChangeCheckedRecords: PropTypes.func.isRequired,
  handleAddRecordOpen: PropTypes.func.isRequired,
  onChangeActive: PropTypes.func.isRequired,
  onSelectRecordsForDelete: PropTypes.func.isRequired,
  onOpenEditRecord: PropTypes.func.isRequired,
  onOpenDetails: PropTypes.func.isRequired,
  onViewRecordDetail: PropTypes.func.isRequired,
  handleSchedule: PropTypes.func.isRequired,
};
