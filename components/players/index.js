import React from 'react';
import PlayerListing from './PlayerListing';
import AppContainer from '@/../../lib/components/AppContainer';
import SideBarContent from './PlayersSideBar';
import PlayersContextProvider from './PlayersContextProvider';

const Players = () => {
  var today = new Date();
  today.setHours(today.getHours() + 4)

  return (
    <PlayersContextProvider>
      <AppContainer
        title="Players"
        sidebarContent={<SideBarContent />}
      >
        <PlayerListing />
      </AppContainer>
    </PlayersContextProvider>
  );
};

export default Players;