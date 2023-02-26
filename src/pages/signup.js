import React from 'react';
import AppPage from '../core/AppLayout/DefaultPage';
import asyncComponent from '@/../../lib/components/AppAsyncComponent';

const SignUp = asyncComponent(() => import('../modules/auth/Signup'));
export default AppPage(() => <SignUp />);
