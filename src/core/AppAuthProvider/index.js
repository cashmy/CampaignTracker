import React from 'react';
import { useInfoViewActionsContext } from '@/../../lib/context/AppContextProvider/InfoViewContextProvider';
import FirebaseAuthProvider from '@/../../lib/services/auth/firebase/FirebaseAuthProvider';

const AppAuthProvider = ({ children }) => {
  const { fetchStart, fetchSuccess, fetchError,showMessage } = useInfoViewActionsContext();

  return (
    <FirebaseAuthProvider
      fetchStart={fetchStart}
      fetchError={fetchError}
      fetchSuccess={fetchSuccess}
      showMessage={showMessage}
    >
      {children}
    </FirebaseAuthProvider>
  );
};

export default AppAuthProvider;
