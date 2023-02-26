import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@/../../lib/components/AppAsyncComponent';

const Maintenance = asyncComponent(() =>
  import('../../modules/errorPages/Maintenance')
);
export default AppPage(() => <Maintenance />);
