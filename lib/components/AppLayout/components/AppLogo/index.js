import React from 'react';
import { Box } from '@mui/material';
import { useThemeContext } from '@/../../lib/context/AppContextProvider/ThemeContextProvider';
import { alpha } from '@mui/material/styles';
import Logo from '@/../assets/icons/logo';
import LogoText from '@/../assets/icons/logoText';


const AppLogo = () => {
  const { theme } = useThemeContext();
  return (
    <Box
      sx={{
        height: { xs: 56, sm: 70 },
        padding: 2.5,
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
          height: { xs: 40, sm: 45 },
        },
      }}
      className="app-logo"
    >
       <Logo fill={theme.palette.primary.main} />
      <Box
        sx={{
          mt: 1,
          display: { xs: 'none', md: 'block' },
          '& svg': {
            height: { xs: 25, sm: 30 },
          },
        }}
      >
         <LogoText fill={alpha(theme.palette.text.primary, 0.8)} />
      </Box>
    </Box>
  );
};

export default AppLogo;
