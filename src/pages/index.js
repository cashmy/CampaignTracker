import AppPage from '../core/AppLayout/DefaultPage';
import asyncComponent from '@/../../lib/components/AppAsyncComponent';

const SignIn = asyncComponent(() => import('../modules/auth/Signin'));
export default AppPage(() => <SignIn />);