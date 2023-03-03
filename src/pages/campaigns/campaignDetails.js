import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@/../../lib/components/AppAsyncComponent';

const CampaignDetails = asyncComponent(() => import('components/campaignsNew/CampaignDetails'));
export default AppPage(() => <CampaignDetails />);
