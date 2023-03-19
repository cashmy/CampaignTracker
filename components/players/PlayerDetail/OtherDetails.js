import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from '@mui/material/styles';
// import IntlMessages from '@crema/helpers/IntlMessages';
import PropTypes from "prop-types";
import { Fonts } from "@/../../lib/constants/AppEnums";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";

const OtherDetails = (props) => {
  const { player } = props;
  const theme = useTheme();

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
        {/* <IntlMessages id="common.otherDetails" /> */}
        Other Details
      </Box>

      <div>
        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaDiscord
            size={24}
            color={theme.palette.text.secondary}
          />
          <Box
            sx={{
              ml: 3.5,
            }}
          >
            {player.discordId ? (
              player.discordId
            ) : (
              // <IntlMessages id="common.na" />
              <text>NA</text>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            mb: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <FiFacebook
            size={24}
            color={theme.palette.text.secondary}
          />
          <Box
            sx={{
              ml: 3.5,
            }}
          >
            {player.fbUsername ? (
              player.fbUsername
            ) : (
              // <IntlMessages id="common.na" />
              <text>NA</text>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FiTwitter
            size={24}
            color={theme.palette.text.secondary}
            />
          <Box
            sx={{
              ml: 3.5,
            }}
          >
            {player.twitterId ? (
              player.twitterId
            ) : (
              // <IntlMessages id="common.na" />
              <text>NA</text>
            )}
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default OtherDetails;

OtherDetails.propTypes = {
  player: PropTypes.object.isRequired,
};
