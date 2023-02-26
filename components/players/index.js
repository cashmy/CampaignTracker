import React from 'react';
import PlayerListing from './PlayerListing';
// import { useIntl } from 'react-intl';
import AppContainer from '@/../../lib/components/AppContainer';
import SideBarContent from './PlayersSideBar';
import PlayersContextProvider from './PlayersContextProvider';

const Contact = () => {
  // const { messages } = useIntl();
  return (
    <PlayersContextProvider>
      <AppContainer
        // title={messages['contactApp.contact']}
        title="Players"
        sidebarContent={<SideBarContent />}
      >
        <PlayerListing />
        {/* <div>Players List goes here ... </div> */}
      </AppContainer>
    </PlayersContextProvider>
  );
};

export default Contact;