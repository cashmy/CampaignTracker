import PropTypes from 'prop-types';

export const CountryRecord = {
  countryCode: "",
  countryName: "", 
  phone: "",
};

export const AdventureColumnsDataX = [
  { id: "countryCode", label: "Code"},
  { id: "countryName", label: "Country Name" },
  { id: "phone", label: "Dial Code"},
];

export const AdventureColumns = [
  { id: "countryCode", label: "Code"},
  { id: "countryName", label: "Country Name" },
  { id: "phone", label: "Dial Code"},
];

AdventureRecord.PropTypes = {
  countryCode: PropTypes.string,
  countryName: PropTypes.string,
  phone: PropTypes.string,
}