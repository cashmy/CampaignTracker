import React, { useEffect, useState } from 'react';
import AppSidebar from './AppSidebar';
import AppThemeSetting from '../../AppThemeSetting';
import AppHeader from './AppHeader';
import clsx from 'clsx';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import BitBucketWrapper from './BitBucketWrapper';
import { LayoutType } from '@/../../lib/constants/AppEnums';
import { useLayoutContext } from '@/../../lib/context/AppContextProvider/LayoutContextProvider';
import BitBucketContainer from './BitBucketContainer';
import AppContentView from '../../AppContentView';
import { useRouter } from 'next/router';
import PropsTypes from 'prop-types';

const BitBucket = ({ children, routesConfig }) => {
  const { pathname } = useRouter();
  const [isCollapsed, setCollapsed] = useState(false);
  const [isNavCollapsed, setNavCollapsed] = useState(false);
  const { layoutType } = useLayoutContext();

  const toggleNavCollapsed = () => {
    setNavCollapsed(!isNavCollapsed);
  };
  useEffect(() => {
    if (isNavCollapsed) setNavCollapsed(!isNavCollapsed);
  }, [pathname]);

  return (
    <BitBucketContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <BitBucketWrapper
        className={clsx('bitBucketWrapper', {
          bitBucketCollapsed: isCollapsed,
        })}
      >
        <Hidden lgUp>
          <AppHeader toggleNavCollapsed={toggleNavCollapsed} />
        </Hidden>
        <AppSidebar
          routesConfig={routesConfig}
          isCollapsed={isCollapsed}
          setCollapsed={setCollapsed}
          isNavCollapsed={isNavCollapsed}
          toggleNavCollapsed={toggleNavCollapsed}
        />
        <Box className="mainContent">
          <AppContentView>{children}</AppContentView>
        </Box>
        <AppThemeSetting />
      </BitBucketWrapper>
    </BitBucketContainer>
  );
};

export default BitBucket;
BitBucket.propsTypes = {
  children: PropsTypes.node.isRequired,
  routesConfig: PropsTypes.array.isRequired,
};
