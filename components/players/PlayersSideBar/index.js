import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import React, { useEffect, useState } from 'react';
// import IntlMessages from '@crema/helpers/IntlMessages';
import AppScrollbar from '@/../../lib/components/AppScrollbar';
import CreatePlayer from '../CreatePlayer';
import AppsSideBarFolderItem from '@/../../lib/components/AppsSideBarFolderItem';
import { Fonts } from '@/../../lib/constants/AppEnums';
import AppList from '@/../../lib/components/AppList';
import ListEmptyResult from '@/../../lib/components/AppList/ListEmptyResult';
import SidebarPlaceholder from '@/../../lib/components/AppSkeleton/SidebarListSkeleton';
import CampaignSideBarItem from 'components/campaigns/CampaignSideBarItem';
import AddIcon from '@mui/icons-material/Add';
import { Zoom } from '@mui/material';
import LabelItem from './LabelItem';
// import { usePlayersContext } from '../PlayersContextProvider';
import { blue, green, red, orange } from '@mui/material/colors';
import CampaignService from 'services/campaign.service';

const SideBarContent = () => {
  // TODO: get folderList and labelList from context or Datasoure
  // const { folderList, labelList } = usePlayersContext();
  const folderList = [
    { id: 121, name: 'All', alias: 'all' },
    { id: 124, name: 'Starred', alias: 'isStarred' },
    { id: 122, name: 'Active', alias: 'active' },
    { id: 125, name: 'Inactive', alias: 'inactive' },
  ];
  const labelList = [
    { id: 311, name: 'Exp/Vet +DM', alias: '311', color: red[500] },
    { id: 312, name: 'Veteran', alias: '312', color: blue[500] },
    { id: 313, name: 'Experienced', alias: '313', color: orange[500] },
    { id: 314, name: 'Newbie', alias: '314', color: green[500] },
  ] 
  const [isAddPlayer, onSetIsAddPlayer] = useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const getTableData = async (e) => {
      try {
        // setLoading(true);
        const response = await CampaignService
          // .getAllRecordsBySts(archiveStatus)
          .getAllRecords()
          .then();
        setRecords(response.data);
        // setLoading(false);
        // setLoadData(false);
      } catch (e) {
        console.log("API call unsuccessful", e);
      }
    };
    getTableData();
  }, []);


  const handleAddPlayerOpen = () => {
    onSetIsAddPlayer(true);
  };

  const handleAddPlayerClose = () => {
    onSetIsAddPlayer(false);
  };

  return (
    <>
      <Box
        sx={{
          px: { xs: 4, md: 5 },
          pt: { xs: 4, md: 5 },
          pb: 2.5,
        }}
      >
        <Zoom in style={{ transitionDelay: '300ms' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: '8px 28px',
              borderRadius: 8,
              '& .MuiSvgIcon-root': {
                fontSize: 26,
              },
            }}
            startIcon={<AddIcon />}
            onClick={handleAddPlayerOpen}
          >
            {/* <IntlMessages id="PlayersApp.createPlayers" /> */}
            Create Player 
          </Button>
        </Zoom>
      </Box>

      <AppScrollbar className="scroll-app-sidebar">
        <Box
          sx={{
            pr: 4,
            pb: { xs: 4, md: 5, lg: 6.2 },
          }}
        >
          <List
            sx={{
              mb: { xs: 2, xl: 5 },
            }}
            component="nav"
            aria-label="main task folders"
          >
            <AppList
              animation="transition.slideLeftIn"
              data={folderList}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={
                    <Box
                      sx={{
                        px: { xs: 4, md: 5, lg: 6.2 },
                      }}
                    >
                      <SidebarPlaceholder />
                    </Box>
                  }
                />
              }
              renderRow={(item) => (
                <AppsSideBarFolderItem
                  key={item.id}
                  item={item}
                  path={`/players/folder/${item.alias}`}
                />
              )}
            />
          </List>

          <Box
            component="h4"
            sx={{
              mt: { xs: 4, xl: 5 },
              px: { xs: 4, md: 5, lg: 6.2 },
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            {/* <IntlMessages id="common.labels" /> */}
            Labels
          </Box>

          <List component="nav" aria-label="main mailbox folders">
            <AppList
              animation="transition.slideLeftIn"
              data={labelList}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={
                    <Box
                      sx={{
                        px: { xs: 4, md: 5, lg: 6.2 },
                      }}
                    >
                      <SidebarPlaceholder />
                    </Box>
                  }
                />
              }
              renderRow={(label) => (
                <LabelItem key={label.id} label={label} />
              )}
            />
          </List>

          <Box
            component="h4"
            sx={{
              mt: { xs: 4, xl: 5 },
              px: { xs: 4, md: 5, lg: 6.2 },
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            {/* <IntlMessages id="common.labels" /> */}
            Campaigns
          </Box>

          <List
            sx={{
              mb: { xs: 2, xl: 5 },
            }}
            component="nav"
            aria-label="main assignment campaigns"
          >
            <AppList
              animation="transition.slideLeftIn"
              data={records}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={
                    <Box
                      sx={{
                        px: { xs: 4, md: 5, lg: 6.2 },
                      }}
                    >
                      <SidebarPlaceholder />
                    </Box>
                  }
                />
              }
              renderRow={(item) => (
                <CampaignSideBarItem
                  key={item.id}
                  item={item}
                  path={`/players/campaign/${item.id}`}
                />
              )}
            />
          </List>

          <CreatePlayer
            isAddPlayer={isAddPlayer}
            handleAddPlayerClose={handleAddPlayerClose}
          />
        </Box>
      </AppScrollbar>
    </>
  );
};

export default SideBarContent;
