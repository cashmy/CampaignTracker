import PropTypes from "prop-types";
import SelectTimeZoneDropDown from "./SelectTimeZoneDropDown";
import TimeZonesContextProvider from "../TimeZonesContextProvider";

const SelectTimeZone = (props) => {
  const { name, label, value, error = null, onChange } = props;
  return (
    <TimeZonesContextProvider>
      <SelectTimeZoneDropDown
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        error={error}
      />
    </TimeZonesContextProvider>
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