/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useGetDataApi } from '@/../../lib/hooks/APIHooks';
import { useRouter } from 'next/router';

const CountriesContext = createContext();
const CountriesActionsContext = createContext();

export const useCountriesContext = () => useContext(CountriesContext);
export const useCountriesActionsContext = () => useContext(CountriesActionsContext);

export const CountriesContextProvider = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  const API_URL = baseUrl + "countries/";
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
    <CountriesContext.Provider
      value={{
        all,
        RecordsList,
        loading,
        page,
        pageView,
      }}
    >
      <CountriesActionsContext.Provider
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
      </CountriesActionsContext.Provider>
    </CountriesContext.Provider>
  );
};
export default CountriesContextProvider;

CountriesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
