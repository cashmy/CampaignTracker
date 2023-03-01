import React from 'react';
import Box from '@mui/material/Box';
// import IntlMessages from '@crema/helpers/IntlMessages';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import { Fonts } from '@/../../lib/constants/AppEnums';
import PropTypes from 'prop-types';

export const PersonalDetails = (props) => {
  return (
    <div>Hi Cash</div>
  )
}

// const PersonalDetails = (props) => {
//   // const { player } = props;
//   return (
//     <Box
//       sx={{
//         pb: 5,
//       }}
//     >
//       <Box
//         component="h4"
//         sx={{
//           mb: 4,
//           fontWeight: Fonts.SEMI_BOLD,
//         }}
//       >
//         {/* <IntlMessages id="playerApp.personalDetails" /> */}
//         Personal Details
//       </Box>

//       <div>
//         <Box
//           sx={{
//             mb: { xs: 2, md: 3 },
//             display: 'flex',
//             alignItems: 'center',
//           }}
//         >
//           <EmailOutlinedIcon
//             sx={{
//               color: (theme) => theme.palette.text.secondary,
//             }}
//           />
//           <Box
//             sx={{
//               ml: 3.5,
//             }}
//           >
//             Hi: {player.email}
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             mb: { xs: 2, md: 3 },
//             display: 'flex',
//             alignItems: 'center',
//           }}
//         >
//           <PhoneOutlinedIcon
//             sx={{
//               color: (theme) => theme.palette.text.secondary,
//             }}
//           />
//           <Box
//             sx={{
//               ml: 3.5,
//             }}
//           >
//             {player.player}
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             mb: { xs: 2, md: 3 },
//             display: 'flex',
//             alignItems: 'center',
//           }}
//         >
//           <LanguageIcon
//             sx={{
//               color: (theme) => theme.palette.text.secondary,
//             }}
//           />
//           <Box
//             sx={{
//               ml: 3.5,
//             }}
//           >
//             {player.website ? (
//               player.website
//             ) : (
//               // <IntlMessages id="common.na" />
//               NA
//             )}
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//           }}
//         >
//           <CakeOutlinedIcon
//             sx={{
//               color: (theme) => theme.palette.text.secondary,
//             }}
//           />
//           <Box
//             sx={{
//               ml: 3.5,
//             }}
//           >
//             {player.birthday ? (
//               player.birthday
//             ) : (
//               // <IntlMessages id="common.na" />
//               NA
//             )}
//           </Box>
//         </Box>
//       </div>
//     </Box>
//   );
// };



// export default PersonalDetails;

// PersonalDetails.propTypes = {
//   player: PropTypes.object.isRequired,
// };
