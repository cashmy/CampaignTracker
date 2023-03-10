/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-02-23 17:55:53
 * @modify date 2023-02-23 17:55:53
 * @desc [description]
 */
//#region Imports
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/styles";
//#endregion

const SelectPlayer = (props) => {
  //#region //* State & Local Variables
  const { name, label, value, error = null, onChange, records } = props;
  const theme = useTheme();
  //#endregion

  return (
    <FormControl variant="outlined" fullWidth {...(error && { error: true })}>
      <InputLabel>{label || "Select Country"}</InputLabel>
      <MuiSelect
        variant="filled"
        label={label || "select player"}
        name={name}
        value={value || ""}
        onChange={onChange}
        fullWidth
      >
        {records && records.map((record) => (
          <MenuItem key={record.id} value={record.id}>
            <Box
              component="li"
              sx={{ 
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                "& > img": { mr: 2, flexShrink: 0 } 
            }}
              {...props}
            >
              {record.avatarImage ? (
                <Avatar
                  sx={{
                    // backgroundColor: blue[500],
                    width: 36,
                    height: 36,
                  }}
                  src={record.avatarImage}
                />
              ) : (
                <Avatar
                  sx={{
                    // backgroundColor: blue[500],
                    width: 36,
                    height: 36,
                  }}
                >
                  {record.playerName[0].toUpperCase()}
                </Avatar>
              )} 
              <Typography variant="body2" sx={{ pr: 23, color: (theme) => theme.palette.text.primary  }}>
                {record.playerName}
                </Typography>
            </Box>
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default SelectPlayer;

SelectPlayer.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
  error: PropTypes.string,
  onChange: PropTypes.func,
  records: PropTypes.array,
};
