import React from 'react';
import { TextField as MuiTextField } from "@mui/material";

const TextField = (props) => {
  const { name, label, value, error = null, onChange, size, ...other } = props;

  return (
    <MuiTextField
      variant="outlined"
      size={size || "medium"}
      label={label || "label"}
      name={name || "name"}
      value={value} 
      onChange={onChange}
      fullWidth
      {...(error && { error: true, helperText: error })}
      {...other}
    />
  );
};

export default TextField;
