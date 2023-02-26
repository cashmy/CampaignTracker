import PropTypes from 'prop-types';

export const sessionRecord = {
  id: 0,
  campaignId: 1,            // Campaign Id
  adventureId: 1,           // Adventure ID
  name: "",                 // Brief title of the session
  description: "",          // Short descript of the session - what is planned to happen
  activity: "",             // What happened, what does the DM need to do, etc.
  sessionDate: new Date(),  // Date of Session (Actual or Planned)
  sessionLength: 0,         // Length in hours
  sideQuest: false,         // Is this a side quest?
  status: "",               // Planned, InProgress/NextUp, Completed (used in Timeline)
};

export const sessionColumnsDataX = [
  { id: "id", label: "Id", numeric: true },
  { id: "campaignId", label: "Campaign ID" },
  { id: "campaign_name", label: "Campaign"},
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "activity", label: "Activity/Notes"},
  { id: "sessionDate", label: "Session Date"},
  { id: "sessionLength", label: "Session Length" }, 
  { id: "sideQuest", label: "Side Quest"},
  { id: "status", label: "Status" }, 
];

export const sessionColumns = [
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "sessionDate", label: "Date"},
  { id: "status", label: "Sts" },
  { id: "actions", label: "Actions", disableSorting: true },
]

sessionRecord.PropTypes = {
  id: PropTypes.number,
  campaignId: PropTypes.number,
  adventureId: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  activity: PropTypes.string,
  sessionLength: PropTypes.number,
  sessionDate: PropTypes.date,
  sideQuest: PropTypes.bool,
  status: PropTypes.bool,
}