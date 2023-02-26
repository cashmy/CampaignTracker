/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import Box from '@mui/material/Box';
// import { Button } from '@mui/material';
import { useLayoutContext } from '@/../../lib/context/AppContextProvider/LayoutContextProvider';
import Typography from '@mui/material/Typography';
import FooterWrapper from './FooterWrapper';

// Research Alt-codes (0169) for the copyright symbol: ©

const AppFixedFooter = () => {
  const { footer, footerType } = useLayoutContext();

  return (
    <>
      {footer && footerType === 'fixed' ? (
        <FooterWrapper className="footer fixed-footer">
          <div className="footerContainer">
            <Typography>© &copy Copyright 2023 CMC Services</Typography>
            <Box sx={{ ml: 'auto' }}>
              {/* <Button color="primary">Buy Now</Button> */}
            </Box>
          </div>
        </FooterWrapper>
      ) : null}
    </>
  );
};

export default AppFixedFooter;
