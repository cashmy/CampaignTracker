import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@/../../lib/components/AppAsyncComponent';

const Players = asyncComponent(() => import('components/players/'));
export default AppPage(() => <Players />);
