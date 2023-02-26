import React from 'react';
import AppPage from '../../../core/AppLayout/AppPage';
import asyncComponent from '@crema/components/AppAsyncComponent';

const Players = asyncComponent(() => import('@/../../components/players/'),
  { ssr: false });
export default AppPage(() => <Players />);
