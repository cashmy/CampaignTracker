import React from 'react';
import PlayerListing from './PlayerListing';
// import { useIntl } from 'react-intl';
import AppContainer from '@/../../lib/components/AppContainer';
import SideBarContent from './PlayersSideBar';
import PlayersContextProvider from './PlayersContextProvider';

const Players = () => {
  // const { messages } = useIntl();
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // var adjTime = newTime.getHours() + ":" + newTime.getMinutes() + ":" + newTime.getSeconds();
  console.log("Players.js: " + time);
  today.setHours(today.getHours() + 4)
  console.log("Players.js: " + today);



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