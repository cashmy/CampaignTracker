import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from '@/../../lib/components/AppAsyncComponent';

const Default = asyncComponent(() => import('../../modules/dashboards/Default'));
export default AppPage(() => <Default />);