/**
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-18 13:10:17
 * @modify date 2023-03-18 13:11:56
 * @desc [description]
 */

//#region Imports
import PropTypes from "prop-types";
// * Mui
import Box from "@mui/material/Box";
// * Icons
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LanguageIcon from "@mui/icons-material/Language";
// import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
// * Local Components
// import IntlMessages from 'lib/helpers/IntlMessages';
import { Fonts } from "@/../../lib/constants/AppEnums";
//#endregion

export const PersonalDetails = (props) => {
  const { player } = props;

  return (
    <Box
      sx={{
        pb: 5,
      }}
    >
      <Box
        component="h4"
        sx={{
          mb: 4,
          fontWeight: Fonts.SEMI_BOLD,
        }}
      >
        {/* <IntlMessages id="playerApp.personalDetails" /> */}
        Personal Details
      </Box>

      <div>
        {/* //& Email */}
        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <EmailOutlinedIcon
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <Box
            sx={{
              ml: 3.5,
            }}
          >
            {player.email}
          </Box>
        </Box>

        {/* //& Phone Number */}
        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <PhoneOutlinedIcon
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <Box
            sx={{
              ml: 3.5,
            }}
          >
            {player.contact}
          </Box>
        </Box>

        {/* //& Country Code */}
        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <LanguageIcon
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <Box
            sx={{
              ml: 3.5,
            }}
          >
            {player.country ? (
              <>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${player.countryCode.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${player.countryCode.toLowerCase()}.png 2x`}
                  alt=""
                />{" "}
                + {player.country.countryName} ({player.countryCode}) +
                {player.country.phone}
              </>
            ) : (
              player.countryCode
            )}
          </Box>
        </Box>

        {/* <Box
           sx={{
             display: 'flex',
             alignItems: 'center',
           }}
         >
           <CakeOutlinedIcon
             sx={{
               color: (theme) => theme.palette.text.secondary,
             }}
           />
           <Box
             sx={{
               ml: 3.5,
             }}
           >
             {player.birthday ? (
               player.birthday
             ) : (
               // <IntlMessages id="common.na" />
               NA
             )}
           </Box>
         </Box> */}
      </div>
    </Box>
  );
};

PersonalDetails.propTypes = {
  player: PropTypes.object.isRequired,
};
