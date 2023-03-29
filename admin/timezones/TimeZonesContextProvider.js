/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useGetDataApi } from '@/../../lib/hooks/APIHooks';
import { useRouter } from 'next/router';

const TimeZonesContext = createContext();
const TimeZonesActionsContext = createContext();

export const useTimeZonesContext = () => useContext(TimeZonesContext);
export const useTimeZonesActionsContext = () => useContext(TimeZonesActionsContext);

export const TimeZonesContextProvider = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const API_URL = baseUrl + "timeZoneData/";
  const router = useRouter();
  const { all } = router.query;
  const [pageView, setPageView] = useState('list');
  const [page, setPage] = useState(0);
  const [
    { apiData: RecordsList, loading },
    { setQueryParams, setData: setRecordsData, reCallAPI },
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
    <TimeZonesContext.Provider
      value={{
        all,
        RecordsList,
        loading,
        page,
        pageView,
      }}
    >
      <TimeZonesActionsContext.Provider
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
      </TimeZonesActionsContext.Provider>
    </TimeZonesContext.Provider>
  );
};
export default TimeZonesContextProvider;

TimeZonesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
