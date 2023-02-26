import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import AppContentView from '../../AppContentView';
import AppFixedFooter from './AppFixedFooter';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import { useLayoutContext } from '@/../../lib/context/AppContextProvider/LayoutContextProvider';
import AppThemeSetting from '../../AppThemeSetting';
import HorHeaderFixedWrapper from './HorHeaderFixedWrapper';
import MainContent from './MainContent';
import { LayoutType } from '@/../../lib/constants/AppEnums';
import HorHeaderFixedContainer from './HorHeaderFixedContainer';
import { useRouter } from 'next/router';
import PropsTypes from 'prop-types';

const HorHeaderFixed = ({ children, routesConfig }) => {
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
    <HorHeaderFixedContainer
      className={clsx({
        boxedLayout: layoutType === LayoutType.BOXED,
        framedLayout: layoutType === LayoutType.FRAMED,
      })}
    >
      <HorHeaderFixedWrapper
        className={clsx('horHeaderFixedWrapper', {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
        })}
      >
        <AppSidebar
          routesConfig={routesConfig}
          isNavCollapsed={isNavCollapsed}
          toggleNavCollapsed={toggleNavCollapsed}
        />

        <MainContent>
          <AppHeader
            toggleNavCollapsed={toggleNavCollapsed}
            routesConfig={routesConfig}
          />
          <AppContentView>{children}</AppContentView>
          <AppFixedFooter />
        </MainContent>
        <AppThemeSetting />
      </HorHeaderFixedWrapper>
    </HorHeaderFixedContainer>
  );
};

export default HorHeaderFixed;
HorHeaderFixed.propsTypes = {
  children: PropsTypes.node.isRequired,
  routesConfig: PropsTypes.array.isRequired,
};
