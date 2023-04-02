/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useGetDataApi } from "@/../../lib/hooks/APIHooks";
import { useRouter } from "next/router";

const SessionsContext = createContext();
const SessionsActionsContext = createContext();

export const useSessionsContext = () => useContext(SessionsContext);
export const useSessionsActionsContext = () => useContext(SessionsActionsContext);

export const SessionsContextProvider = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const API_URL = baseUrl + "sessions/";
  const router = useRouter();
  const { all } = router.query;
  const [pageView, setPageView] = useState("list");
  const [page, setPage] = useState(0);
  const [
    { apiData: sessionsList, loading },
    { setQueryParams, setData: setRecordsData, reCallAPI },
  ] = useGetDataApi(API_URL, {}, {}, false);
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
    <SessionsContext.Provider
      value={{
        all,
        sessionsList,
        loading,
        page,
        pageView,
      }}
    >
      <SessionsActionsContext.Provider
        value={{
          setRecordsData,
          onPageChange,
          reCallAPI,
          setPageView,
          onChangePageView,
          API_URL
        }}
      >
        {children}
      </SessionsActionsContext.Provider>
    </SessionsContext.Provider>
  );
};
export default SessionsContextProvider;

SessionsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
