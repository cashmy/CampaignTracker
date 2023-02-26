import AppPage from '../core/AppLayout/AppPage';
import asyncComponent from '@/../../lib/components/AppAsyncComponent';

const Error404 = asyncComponent(() =>
  import('../modules/errorPages/Error404')
);
export default AppPage(() => <Error404 />);
