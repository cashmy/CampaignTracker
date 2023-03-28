import PropTypes from 'prop-types';

// Todo: Possibly add payment amt override, ...
//       payment amt override reason,
//       billing summary ?,

// Player - Campaign Join file (many-to-many)

export const playerCampaignRecord = {
  id: 0,
  playerId: 0,
  campaignId: 0,
  discordNickName: "",
  pcName: "",
  pcRace: "",
  pcClass: "",
  tokenUrl: "",
};