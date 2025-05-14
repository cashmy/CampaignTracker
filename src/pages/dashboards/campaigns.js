import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@/../../lib/components/AppAsyncComponent';

const Campaigns = asyncComponent(() => import('components/campaigns/'));
export default AppPage(() => <Campaigns />);