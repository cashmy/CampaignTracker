import React from 'react';
import Box from '@mui/material/Box';
import AppSearchBar from '@/../../lib/components/AppSearchBar';
import { Hidden } from '@mui/material';
import PropTypes from 'prop-types';
import AppsPagination from '@/../../lib/components/AppsPagination';
import ViewSelectButtons from './ViewSelectButtons';
import {
  useCampaignsActionsContext,
  useCampaignsContext,
} from '../../CampaignContextProvider';

const CampaignViewsHeader = (props) => {
  const {
    filterText,
    onSetFilterText,
    // onUpdatePlayers,
    // onSelectPlayersForDelete,
  } = props;
  const { page, pageView, CampaignsList } = useCampaignsContext();
  const { onPageChange, onChangePageView } = useCampaignsActionsContext();

  // const { messages } = useIntl();

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <AppSearchBar
          iconPosition="right"
          overlap={false}
          value={filterText}
          onChange={(event) => onSetFilterText(event.target.value)}
          // placeholder={messages['common.searchHere']}
          placeholder="search here"
        />

        <ViewSelectButtons
          pageView={pageView}
          onChangePageView={onChangePageView}
        />
      </Box>
      <Hidden smDown>
        {CampaignsList?.length > 0 ? (
          <AppsPagination
            sx={{ ml: 2 }}
            count={CampaignsList?.length}
            page={page}
            onPageChange={onPageChange}
          />
        ) : "length?"}
      </Hidden>
    </>
  );
};

export default CampaignViewsHeader;

CampaignViewsHeader.defaultProps = {
  filterText: '',
  page: 0,
};

CampaignViewsHeader.propTypes = {
  filterText: PropTypes.string,
  onSetFilterText: PropTypes.func,
  // onUpdatePlayers: PropTypes.func,
  // onSelectPlayersForDelete: PropTypes.func,
};
