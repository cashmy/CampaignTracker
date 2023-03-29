/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-28 17:55:53
 * @modify date 2023-03-28 17:55:53
 * @desc [description]
 */

//#region Imports
import React from 'react';
import PropTypes from "prop-types";
// * Mui
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
// * Services
import { useTimeZonesContext } from "../TimeZonesContextProvider";
//#endregion

const SelectTimeZone = (props) => {
  const { name, label, value, error = null, onChange } = props;
  const { RecordsList } = useTimeZonesContext();

  console.log("SelectTimeZone: props", props)

  return (
    <FormControl variant="outlined" fullWidth {...(error && { error: true })}>
      <InputLabel>{label || "Select Country"}</InputLabel>
      <MuiSelect
        variant="filled"
        label={label || "select country"}
        name={name}
        value={value || ""}
        onChange={onChange}
        fullWidth
      >
        {RecordsList.length != undefined && RecordsList.map((record) => (
          <MenuItem key={record.id} value={record.id}>
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {/* <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${record.countryCode.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${record.countryCode.toLowerCase()}.png 2x`}
                alt=""
              /> */}
              {record.abbreviation} ({record.name}) {record.utcOffset}
            </Box>
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default SelectTimeZone;

SelectTimeZone.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};
