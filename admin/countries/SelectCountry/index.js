import PropTypes from "prop-types";
import SelectCountryDropDown from "./SelectCountryDropDown";
import CountriesContextProvider from "../CountriesContextProvider";

const SelectCountry = (props) => {
  const { name, label, value, error = null, onChange } = props;
  return (
    <CountriesContextProvider>
      <SelectCountryDropDown
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        error={error}
      />
    </CountriesContextProvider>
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