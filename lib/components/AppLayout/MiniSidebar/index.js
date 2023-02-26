import React, { useEffect, useState } from 'react';
import AppSidebar from './AppSidebar';
import AppThemeSetting from '../../AppThemeSetting';
import AppHeader from './AppHeader';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import MiniSidebarWrapper from './MiniSidebarWrapper';
import AppFixedFooter from './AppFixedFooter';
import { useLayoutContext } from '@/../../lib/context/AppContextProvider/LayoutContextProvider';
import { LayoutType } from '@/../../lib/constants/AppEnums';
import MiniSidebarContainer from './MiniSidebarContainer';
import AppContentView from '../../AppContentView';
import { useRouter } from 'next/router';
import PropsTypes from 'prop-types';

const MiniSidebar = ({ children, routesConfig }) => {
  const { pathname } = useRouter();
  const [isCollapsed, setCollapsed] = useState(true);
  const [isNavCollapsed, setNavCollapsed] = useState(false);
  const { footer, layoutType, headerType, footerType } = useLayoutContext();

  const toggleNavCollapsed = () => {
    setNavCollapsed(!isNavCollapsed);
  };
  useEffect(() => {
    if (isNavCollapsed) setNavCollapsed(!isNavCollapsed);
  }, [pathname]);

  return (
    <MiniSidebarContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <MiniSidebarWrapper
        className={clsx('miniSidebarWrapper', {
          'mini-sidebar-collapsed': isCollapsed,
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
          appMainFixedHeader: headerType === 'fixed',
        })}
      >
        <AppSidebar
          routesConfig={routesConfig}
          isNavCollapsed={isNavCollapsed}
          toggleNavCollapsed={toggleNavCollapsed}
        />
        <Box className="mainContent">
          <AppHeader
            setCollapsed={setCollapsed}
            isCollapsed={isCollapsed}
            toggleNavCollapsed={toggleNavCollapsed}
          />
          <AppContentView>{children}</AppContentView>
          <AppFixedFooter />
        </Box>
        <AppThemeSetting />
      </MiniSidebarWrapper>
    </MiniSidebarContainer>
  );
};

export default MiniSidebar;
MiniSidebar.propsTypes = {
  children: PropsTypes.node.isRequired,
  routesConfig: PropsTypes.array.isRequired,
};
