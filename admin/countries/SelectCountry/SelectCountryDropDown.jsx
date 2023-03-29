/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-02-23 17:55:53
 * @modify date 2023-02-23 17:55:53
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
import { useCountriesContext } from "../CountriesContextProvider";
//#endregion

const SelectCountry = (props) => {
  const { name, label, value, error = null, onChange } = props;
  const { RecordsList } = useCountriesContext();
  
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
          <MenuItem key={record.countryCode} value={record.countryCode}>
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${record.countryCode.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${record.countryCode.toLowerCase()}.png 2x`}
                alt=""
              />
              {record.countryName} ({record.countryCode}) + {record.phone}
            </Box>
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default SelectCountry;

SelectCountry.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};
