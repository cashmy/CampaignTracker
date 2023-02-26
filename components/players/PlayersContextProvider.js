/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useGetDataApi } from '@/../../lib/hooks/APIHooks';
import { useRouter } from 'next/router';
import { blue, green, red } from '@mui/material/colors';

const PlayersContext = createContext();
const PlayersActionsContext = createContext();

export const usePlayersContext = () => useContext(PlayersContext);

export const usePlayersActionsContext = () => useContext(PlayersActionsContext);

export const PlayersContextProvider = ({ children }) => {
  const router = useRouter();
  const { all } = router.query;
  // const [{ apiData: labelList }] = useGetDataApi(
  //   '/api/PlayersApp/labels/list',
  //   []
  // );
  const [{apiData: labelList }] = [
      { id: 311, name: 'Crema', alias: 'crema', color: red[500] },
      { id: 312, name: 'Personal', alias: 'personal', color: blue[500] },
      { id: 313, name: 'Work', alias: 'work', color: green[500] },
  ] 
  // const [{ apiData: folderList }] = useGetDataApi(
  //   '/api/PlayersApp/folders/list',
  //   []
  const [{ apiData: folderList }] = [
    { id: 121, name: 'All', alias: 'all' },
    { id: 122, name: 'Frequent', alias: 'frequent' },
    { id: 124, name: 'Starred', alias: 'starred' },
  ];

  const [pageView, setPageView] = useState('list');

  const [page, setPage] = useState(0);

  const [
    { apiData: PlayersList, loading },
    { setQueryParams, setData: setPlayersData, reCallAPI },
  ] = useGetDataApi('/api/PlayersApp/Players/List', {}, {}, false);

  useEffect(() => {
    setPage(0);
  }, [all]);

  useEffect(() => {
    setQueryParams({
      // type: all[0],
      // name: all[1],
      page: page,
    });
  }, [all, page]);

  const onPageChange = (event, value) => {
    setPage(value);
  };

  const onChangePageView = (view) => {
    setPageView(view);
  };

  return (
    <PlayersContext.Provider
      value={{
        all,
        labelList,
        folderList,
        PlayersList,
        loading,
        page,
        pageView,
      }}
    >
      <PlayersActionsContext.Provider
        value={{
          setPlayersData,
          onPageChange,
          reCallAPI,
          setPageView,
          onChangePageView,
        }}
      >
        {children}
      </PlayersActionsContext.Provider>
    </PlayersContext.Provider>
  );
};
export default PlayersContextProvider;

PlayersContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
