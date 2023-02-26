import React from 'react';
import AppPage from '../core/AppLayout/AppPage';
import asyncComponent from '@/../../lib/components/AppAsyncComponent';

const Error401 = asyncComponent(() =>
  import('../modules/errorPages/Error401')
);
export default AppPage(() => <Error401 />);
