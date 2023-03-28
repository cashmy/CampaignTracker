import React from 'react';
import Box from '@mui/material/Box';
// import IntlMessages from '@crema/helpers/IntlMessages';
import { FiFacebook, FiTwitter } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { Fonts } from '@/../../lib/constants/AppEnums';

const SocialMedia = (props) => {
  const { player } = props;

  return (
    <Box
      sx={{
        pr: { xs: 5, lg: 8, xl: 10 },
        py: 5,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        component="h6"
        sx={{
          mb: 2,
          fontWeight: Fonts.MEDIUM,
          fontSize: 16,
        }}
      >
        {/* <IntlMessages id="common.socialMedia" /> */}
        Social Media
      </Box>

      <Box
      // ? Remember: The sx prop below works only on "media query" adjustments.
      // ? It does not work on "theme/form" adjustments.
        sx={{
          px: { xs: 5, lg: 8, xl: 10 },
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FiFacebook
            style={{
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <Box
            sx={{
              ml: 2,
              color: 'text.secondary',
            }}
          >
            {player.facebookId ? (
              player.facebookId
            ) : (
              // <IntlMessages id="common.na" />
              NA
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FiTwitter
            style={{
              color: (theme) => theme.palette.text.secondary,
            }}
          />
          <Box
            sx={{
              ml: 2,
              color: 'text.secondary',
            }}
          >
            {player.twitterId ? (
              player.twitterId
            ) : (
              // <IntlMessages id="common.na" />
              NA
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SocialMedia;

SocialMedia.propTypes = {
  player: PropTypes.object.isRequired,
};
