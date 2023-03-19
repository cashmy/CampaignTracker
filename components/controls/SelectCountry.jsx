/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-02-23 17:55:53
 * @modify date 2023-02-23 17:55:53
 * @desc [description]
 */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import CountryService from "services/country.service";

const SelectCountry = (props) => {
  const { name, label, value, error = null, onChange } = props;
  const { records, setRecords } = useState([]);

  useEffect(() => {
    console.log("useEffect called");
    const getTableData = async (e) => {
      try {
        const response = await CountryService.getAllRecords().then();
        setRecords(response.data);
      } catch (e) {
        console.log("API call unsuccessful", e);
      }
    };
    getTableData();
  }, []);

  console.log("records", records);

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
        {records.map((record) => (
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
              {record.countryName} ({record.countryCode}) +{record.phone}
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
