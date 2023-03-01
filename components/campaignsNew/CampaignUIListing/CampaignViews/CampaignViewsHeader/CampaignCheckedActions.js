import React from 'react';
import Box from '@mui/material/Box';
// import IntlMessages from '@crema/helpers/IntlMessages';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { HiOutlineBolt } from 'react-icons/hi2';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import AppTooltip from '@/../../lib/components/AppTooltip';

const CampaignCheckedActions = (props) => {
  const {
    checkedRecords,
    onSelectRecordsForDelete,
    onSelectRecordsForStatusChg,
  } = props;


  return (
    <Box
      component="span"
      sx={{
        display: 'flex',
        alignItems: 'center',
        mr: { xs: 2, xl: 3 },
      }}
    >
      <AppTooltip 
        // title={<IntlMessages id="common.delete" />}
        title="Delete Item(s)"
      >
        <IconButton
          sx={{ color: (theme) => theme.palette.text.disabled }}
          size="large"
        >
          <DeleteOutlinedIcon
            sx={{
              cursor: 'pointer',
              display: 'block',
            }}
            onClick={() => onSelectRecordsForDelete(checkedRecords)}
          />
        </IconButton>
      </AppTooltip>

      <AppTooltip 
        // title={<IntlMessages id="common.delete" />}
        title="Change Status for Item(s)"
      >
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
          }}
        >
          <HiOutlineBolt
            sx={{
              cursor: 'pointer',
              display: 'block',
            }}
            onClick={() => onSelectRecordsForStatusChg(checkedRecords)}
          />
        </IconButton>
      </AppTooltip>
    </Box>
  );
};

export default CampaignCheckedActions;

CampaignCheckedActions.propTypes = {
  checkedRecords: PropTypes.array.isRequired,
  onSelectRecordsForDelete: PropTypes.func,
  onSelectRecordsForStatusChg: PropTypes.func,
};
