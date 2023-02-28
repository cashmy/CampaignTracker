import React from 'react';
import { HiBolt } from 'react-icons/hi2'; 
import { HiOutlineBolt } from 'react-icons/hi2'; 
import { Checkbox } from '@mui/material';
import PropTypes from 'prop-types';

const AppsActiveIcon = ({ item, onChange }) => {
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
      checked={item?.active || false}
      onChange={(event) => onChange(event.target.checked, item)}
    />
  );
};

export default AppsActiveIcon;

AppsActiveIcon.propTypes = {
  item: PropTypes.object,
  onChange: PropTypes.func,
};
