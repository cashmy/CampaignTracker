import React from 'react';
import { HiBolt } from 'react-icons/hi2'; 
import { HiOutlineBolt } from 'react-icons/hi2'; 
import { Checkbox } from '@mui/material';
import PropTypes from 'prop-types';

const AppsArchiveIcon = ({ record, onChange }) => {
  return (
    <Checkbox
      sx={{
        color: "darkgoldenrod",
        '&.Mui-checked': {
          color: "darkgoldenrod",
        },
        '& .MuiSvgIcon-root': {
          fontSize: 20,
        },
      }}
      icon={<HiOutlineBolt />}
      checkedIcon={<HiBolt />}
      checked={!record?.archived}
      onChange={(event) => onChange(event.target.checked, record)}
    />
  );
};

export default AppsArchiveIcon;

AppsArchiveIcon.propTypes = {
  record: PropTypes.object,
  onChange: PropTypes.func,
};
