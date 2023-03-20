/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useGetDataApi } from '@/../../lib/hooks/APIHooks';
import { useRouter } from 'next/router';
import { blue, green, red, orange } from '@mui/material/colors';

const PlayersContext = createContext();
const PlayersActionsContext = createContext();

export const usePlayersContext = () => useContext(PlayersContext);
export const usePlayersActionsContext = () => useContext(PlayersActionsContext);

export const PlayersContextProvider = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const API_URL = baseUrl + "players/";
  const router = useRouter();
  const { all } = router.query;
  const [{apiData: labelList }] = [
      { id: 311, name: 'Exp/Vet +DM', alias: 'crema', color: red[500] },
      { id: 312, name: 'Veteran', alias: 'personal', color: blue[500] },
      { id: 313, name: 'Experienced', alias: 'work', color: orange[500] },
      { id: 314, name: 'Newbie', alias: 'work', color: green[500] },
  ] 
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
  ] = useGetDataApi(API_URL, {}, {}, false);

  useEffect(() => {
    setPage(0);
  }, [all]);

  useEffect(() => {
    setQueryParams({
      type: all[0],
      name: all[1],
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
          API_URL
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
