import PropTypes from 'prop-types';

// Todo: possibly add birthdate, address.

export const playerRecord = {
  id: 0,
  userid: "",         // Logged In User (Used for auth)
  playerName: "",     // Player Name
  discordId: "",      // Discord Id
  notes: "",          // GM Notes about player
  email: "",          // Player email
  contact: "",        // Player contact info
  timeZone: "",       // Player time zone
  timeZoneOffset: 0,  // Player time zone offset from GMT
  countryCode: "",    // Player country code
  isStarred: false,   // Player is starred
  avatarImage: "",    // Player avatar image
  label: "",          // Player Experience label (Newbie, Exp, Vet, Exp/Vet+DM)
  fbUserName: "",     // Player Facebook User Name
  twitterId: "",      // Player Twitter Id
  active: true,
};

export const playerColumnsDataX = [
  { id: "id", label: "Id", numeric: true },
  { id: "playerName", label: "Player Name" },
  { id: "discordId", label: "Discord Id" },
  { id: "notes", label: "Notes" },
  { id: "email", label: "Email" },
  { id: "contact", label: "Contact"},
  { id: "timeZone", label: "Time Zone"},
  { id: "timeZoneOffset", label: "Time Zone Offset" },
  { id: "countryCode", label: "Country Code" },
  { id: "isStarred", label: "Is Starred"},
  { id: "active", label: "Active", disableSorting: true },
  { id: "avatarImage", label: "Avatar", disableSorting: true },
  { id: "label", label: "Label"},
  { id: "fbUserName", label: "Facebook"},
  { id: "twitterId", label: "Twitter"},
  { id: "actions", label: "Actions", disableSorting: true },
];

export const playerColumns = [
  { id: "id", label: "Id", numeric: true },
  { id: "playerName", label: "Player Name" },
  { id: "discordId", label: "Discord Id" },
  { id: "timeZone", label: "Time Zone"},
  { id: "timeSoneOffset", label: "Players Time" },
  { id: "countryCode", label: "Country Code" },
  { id: "active", label: "Active", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

playerRecord.PropTypes = {
  id: PropTypes.number,
  userid: PropTypes.string,
  playerName: PropTypes.string,
  discordId: PropTypes.string,
  notes: PropTypes.string,
  email: PropTypes.string,
  contact: PropTypes.string,
  timeZone: PropTypes.string,
  timeZoneOffset: PropTypes.number,
  countryCode: PropTypes.string,
  isStarred: PropTypes.bool,
  avatarImage: PropTypes.string,
  label: PropTypes.string,
  fbUserName: PropTypes.string,
  twitterId: PropTypes.string,
  active: PropTypes.bool,
};