import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useAuthUser } from '@/../../lib/hooks/AuthHooks';
import AppLoader from '@/../../lib/components/AppLoader';
import { initialUrl } from '@/../../lib/constants/AppConst';

const withData = (ComposedComponent) => (props) => {
  const { user, isLoading } = useAuthUser();
  const { asPath } = useRouter();
  const queryParams = asPath.split('?')[1];
  useEffect(() => {
    if (user) {
      Router.push(initialUrl + (queryParams ? '?' + queryParams : ''));
    }
  }, [queryParams, user]);
  if (isLoading) return <AppLoader />;
  if (user) return <AppLoader />;

  return <ComposedComponent {...props} />;
};

export default withData;
