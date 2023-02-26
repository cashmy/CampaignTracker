import PropTypes from 'prop-types';

export const adventureRecord = {
  id: 0,
  campaignId: 1,   
  name: "",
  description: "",    // Description of adventure
  sessionEstimate: 0, // Planned sessions
  sessionCount: 0,    // Number of played sessions
  completed: false
};

export const adventureColumnsDataX = [
  { id: "id", label: "Id", numeric: true },
  { id: "campaign_id", label: "Campaign_Id" },
  { id: "campaign_name", label: "Campaign"},
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "sessionEstimate", label: "Planned Sessions"},
  { id: "sessionCount", label: "Session Count" }, 
  { id: "completed", label: "Completed" }, 
];

export const adventureColumns = [
  { id: "name", label: "Name" },
  { id: "sessionCount", label: "Sess" },
  { id: "actions", label: "Actions", disableSorting: true },
]

adventureRecord.PropTypes = {
  id: PropTypes.number,
  campaignId: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  sessionEstimate: PropTypes.number,
  sessionCount: PropTypes.number,
  completed: PropTypes.bool,
}