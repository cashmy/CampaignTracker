/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useGetDataApi } from "@/../../lib/hooks/APIHooks";
import { useRouter } from "next/router";

const ImagesContext = createContext();
const ImagesActionsContext = createContext();

export const useImagesContext = () => useContext(ImagesContext);
export const useImagesActionsContext = () => useContext(ImagesActionsContext);

export const ImagesContextProvider = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const API_URL = baseUrl + "images/admin";
  const router = useRouter();
  const { all } = router.query;
  const [pageView, setPageView] = useState("list");
  const [page, setPage] = useState(0);
  const [
    { apiData: recordsList = [], loading },
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
    <ImagesContext.Provider
      value={{
        all,
        recordsList,
        loading,
        page,
        pageView,
      }}
    >
      <ImagesActionsContext.Provider
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
      </ImagesActionsContext.Provider>
    </ImagesContext.Provider>
  );
};
export default ImagesContextProvider;

ImagesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
