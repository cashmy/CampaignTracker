import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Checkbox } from '@mui/material';
import PropTypes from 'prop-types';

const AppsStarredIcon = ({ item, onChange, formOnly = false }) => {

  const handleInternalChangeFirst = (event) => {
    if (formOnly) {
      const simEvent = {
        target: {
          name: 'isStarred',
          value: event.target.checked,
          type: 'checkbox',
        },
      }
      onChange(simEvent)
    } else 
    {
     onChange(event.target.checked, item);
    }
    item.isStarred = event.target.checked;
  }

  return (
    <Checkbox
      sx={{
        color: (theme) => theme.palette.info.dark,
        '&.Mui-checked': {
          color: (theme) => theme.palette.info.dark,
        },
        '& .MuiSvgIcon-root': {
          fontSize: 20,
        },
      }}
      icon={<StarBorderIcon />}
      checkedIcon={<StarIcon />}
      checked={item?.isStarred || false}
      onChange={handleInternalChangeFirst}
    />
  );
};

export default AppsStarredIcon;

AppsStarredIcon.propTypes = {
  item: PropTypes.object,
  onChange: PropTypes.func,
  formOnly: PropTypes.bool,
};
