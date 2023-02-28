import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@/../../lib/components/AppAsyncComponent';

const CampaignViews = asyncComponent(() => import('@/../../components/campaignsNew/CampaignViews/'));
export default AppPage(() => <CampaignViews />);
