import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Box } from '@mui/material';

const AppAnimate = ({loading, children, ...props}) => {
  return <Box {...props}>{children}</Box>;
};

AppAnimate.propTypes = {
  children: PropTypes.element.isRequired,
  loading: PropTypes.bool,
};

AppAnimate.defaultProps = {};

export default memo(AppAnimate);
