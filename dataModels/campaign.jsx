import PropTypes from 'prop-types';

export const campaignRecord = {
  id: 0,
  userId: "",       // Logged In User (Used for authentication & Data delimiting)
  name: "",         // Campaign Name
  description: "",  // Description of campaign
  dm: "",           // Dungeon Master Name
  world: "",        // World/Plane name
  gameSystem: "",       // e.g. D&D, Cyberpunk, ShadowRun, etc.
  type: "n",        // one-shot, adventure-only, campaign
  style: "",        // table-top, online, Roll20, Combo, etc.
  frequency: "t",   // (w)eekly, (b)i-weekly, (m)onthly, (v)aried, (o)nce, (n)ever, (T)BD
  dow: 0,           // 0-7 = None,S,M,T,W,Th,F,Sa
  timeSlot: 0,      // 0-3 = None,M,A,E
  pcIdeal: 0,       // Ideal number of player characters
  pcCount: 0,       // Reqistered Players
  cost: 0,          // Cost per session
  discordServer: "",
  discordChannel: "",
  imageUrl: "",
  archived: false,  // record archive status
};

export const campaignColumnsDataX = [
  { id: "id", label: "Id", numeric: true },
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "dm", label: "DM Name" },
  { id: "world", label: "World" },
  { id: "gameSystem", label: "Game System" },
  { id: "type", label: "Type" },
  { id: "style", label: "Style"},
  { id: "frequency", label: "Freq" },
  { id: "dow", label: "DOW", numeric: true },
  { id: "timeSlot", label: "Time Slot", numeric: true},
  { id: "pcIdeal", label: "Ideal #", numeric: true },
  { id: "pcCount", label: "Nbr PCs", numeric: true },
  { id: "cost", label: "Cost", numeric: true },
  { id: "discordServer", label: "Discord Server" },
  { id: "discordChannel", label: "Discord Channel" },
  { id: "imageUrl", label: "Image URL" },
  { id: "archived", label: "Archived", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

export const campaignColumns = [
  { id: "name", label: "Name" },
  { id: "type", label: "Type" },
  { id: "frequency", label: "Freq" },
  { id: "dow", label: "DOW", numeric: true },
  { id: "actions", label: "Actions", disableSorting: true },
]

campaignRecord.PropTypes = {
  id: PropTypes.number,
  userId: "",               
  name: PropTypes.string,
  description: PropTypes.string,
  dm: PropTypes.string,
  world: PropTypes.string,
  gameSystem: PropTypes.string,
  type: PropTypes.oneOf(["n", "o", "a", "c"]),      // one-shot, adventure-only, campaign
  style: PropTypes.string,                          // table-top, online, Roll20, Combo, etc.
  frequency: PropTypes.oneOf(["w", "b", "m", "v"]), // weekly, bi-weekly, monthly, varied
  dow: PropTypes.number,
  timeSlot: PropTypes.number,
  pcIdeal: PropTypes.number,
  pcCount: PropTypes.number,
  cost: PropTypes.number,
  discordServer: PropTypes.string,
  discordChannel: PropTypes.string,
  imageUrl: PropTypes.string,
  archived: PropTypes.bool,
}