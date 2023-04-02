/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useGetDataApi } from "@/../../lib/hooks/APIHooks";
import { useRouter } from "next/router";

const AdventuresContext = createContext();
const AdventuresActionsContext = createContext();

export const useAdventuresContext = () => useContext(AdventuresContext);
export const useAdventuresActionsContext = () => useContext(AdventuresActionsContext);

export const AdventuresContextProvider = (props) => {
  const { campaign, children } = props
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const API_URL = baseUrl + `adventures/campaign/${campaign.id}`;
  const router = useRouter();
  const { all } = router.query;
  const [pageView, setPageView] = useState("list");
  const [page, setPage] = useState(0);
  const [
    { apiData: adventuresList, loading },
    { setQueryParams, setData: setRecordsData, reCallAPI },
  ] = useGetDataApi(API_URL, {}, {}, false);
  useEffect(() => {
    setPage(0);
  }, [all]);
  // console.log("\n\n\n********** AdventuresContextProvider **********")
  // console.log("AdventuresContextProvider: ==> ", campaign)
  // console.log("AdventuresContextProvider ==> URL: ", API_URL)
  // console.log("AdventuresContextProvider ==> adventuresList: ", adventuresList)

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
    <AdventuresContext.Provider
      value={{
        all,
        adventuresList,
        loading,
        page,
        pageView,
      }}
    >
      <AdventuresActionsContext.Provider
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
      </AdventuresActionsContext.Provider>
    </AdventuresContext.Provider>
  );
};
export default AdventuresContextProvider;

AdventuresContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
