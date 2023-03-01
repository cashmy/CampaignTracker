import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@/../../lib/components/AppAsyncComponent';

const CampaignUIListing = asyncComponent(() => import('components/campaignsNew/CampaignUIListing'));
export default AppPage(() => <CampaignUIListing />);
