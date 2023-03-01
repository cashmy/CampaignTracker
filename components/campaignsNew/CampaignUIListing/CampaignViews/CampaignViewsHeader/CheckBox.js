import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useCampaignsContext } from '../../../CampaignsContextProvider';

const CheckBox = ({ checkedRecords, setCheckedRecords }) => {
  const { RecordsList } = useCampaignsContext();
  const onHandleMasterCheckbox = (event) => {
    if (event.target.checked) {
      const RecordIds = RecordsList?.map((Record) => Record.id);
      setCheckedRecords(RecordIds);
    } else {
      setCheckedRecords([]);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Checkbox
        sx={{
          color: (theme) => theme.palette.text.disabled,
        }}
        color="primary"
        indeterminate={
          checkedRecords.length > 0 &&
          checkedRecords.length < RecordsList?.length
        }
        checked={
          RecordsList?.length > 0 &&
          checkedRecords.length === RecordsList?.length
        }
        onChange={onHandleMasterCheckbox}
      />
    </Box>
  );
};

export default CheckBox;

CheckBox.propTypes = {
  checkedRecords: PropTypes.array.isRequired,
  setCheckedRecords: PropTypes.func,
};
