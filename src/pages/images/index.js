import React from 'react';
import AppPage from '../../core/AppLayout/AppPage';
import asyncComponent from 'lib/components/AppAsyncComponent';

const ImageLibrary = asyncComponent(() => import('components/imageLibraries/'));
export default AppPage(() => <ImageLibrary />);