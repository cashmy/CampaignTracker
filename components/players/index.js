import React from 'react';
import PlayerListing from './PlayerListing';
// import { useIntl } from 'react-intl';
import AppContainer from '@/../../lib/components/AppContainer';
import SideBarContent from './PlayersSideBar';
import PlayersContextProvider from './PlayersContextProvider';

const Players = () => {
  // const { messages } = useIntl();
  var today = new Date();
  today.setHours(today.getHours() + 4)

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

export default Players;