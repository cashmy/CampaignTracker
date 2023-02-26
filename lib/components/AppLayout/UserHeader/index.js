/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import AppSidebar from './AppSidebar';
import AppContentView from '../../AppContentView';
import AppThemeSetting from '../../AppThemeSetting';
import AppHeader from './AppHeader';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import UserHeaderWrapper from './UserHeaderWrapper';
import AppFixedFooter from './AppFixedFooter';
import { useLayoutContext } from '@/../../lib/context/AppContextProvider/LayoutContextProvider';
import { LayoutType } from '@/../../lib/constants/AppEnums';
import UserHeaderContainer from './UserHeaderContainer';
import { useRouter } from 'next/router';
import PropsTypes from 'prop-types';

const UserHeader = ({ children, routesConfig }) => {
  const { pathname } = useRouter();
  const { footer, layoutType, footerType } = useLayoutContext();
  const [isNavCollapsed, setNavCollapsed] = useState(false);

  const toggleNavCollapsed = () => {
    setNavCollapsed(!isNavCollapsed);
  };
  useEffect(() => {
    if (isNavCollapsed) setNavCollapsed(!isNavCollapsed);
  }, [pathname]);

  return (
    <UserHeaderContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <UserHeaderWrapper
        className={clsx('userHeaderWrapper', {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
        })}
      >
        <AppHeader toggleNavCollapsed={toggleNavCollapsed} />
        <Box className="mainContent">
          <AppSidebar
            routesConfig={routesConfig}
            isNavCollapsed={isNavCollapsed}
            toggleNavCollapsed={toggleNavCollapsed}
          />
          <AppContentView>{children}</AppContentView>
          <AppFixedFooter />
        </Box>
        <AppThemeSetting />
      </UserHeaderWrapper>
    </UserHeaderContainer>
  );
};

export default UserHeader;
UserHeader.propsTypes = {
  children: PropsTypes.node.isRequired,
  routesConfig: PropsTypes.array.isRequired,
};
