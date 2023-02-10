import AppContextProvider from '../../lib/context/AppContextProvider';

import '@/styles/globals.css'
// import '@/styles/simplebar.css';

export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}
// import * as React from 'react';
// import PropTypes from 'prop-types';
// import CssBaseline from '@mui/material/CssBaseline';
// import { CacheProvider } from '@emotion/react';
// import createEmotionCache from '../../createEmotionCache';
// import AppThemeProvider from '../../libs/context/src/AppThemeProvider/index.js';
// import AppStyleProvider from '../../libs/context/src/AppStyleProvider/index.js';
// import AppLocaleProvider from '../../libs/context/src/AppLocaleProvider/index.js';
// import AppAuthProvider from '../core/AppAuthProvider';
// import AuthRoutes from '../../libs/components/src/lib/AuthRoutes.js';

// // import '@crema/mockapi';
// import '../../public/styles/vendors/index.css';
// import AppPageMeta from '../../libs/components/src/lib/AppPageMeta/index.js';
// import InfoViewContextProvider from '../../libs/context/src/AppContextProvider/InfoViewContextProvider.js';

// // Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

// export default function MyApp(props) {
//   const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

//   return (
//     <CacheProvider value={emotionCache}>
//       <AppContextProvider>
//         <AppThemeProvider>
//           <AppStyleProvider>
//             <AppLocaleProvider>
//               <InfoViewContextProvider>
//                 <AppAuthProvider>
//                   <AuthRoutes>
//                     <CssBaseline />
//                     <AppPageMeta />
//                     <Component {...pageProps} />
//                   </AuthRoutes>
//                 </AppAuthProvider>
//               </InfoViewContextProvider>
//             </AppLocaleProvider>
//           </AppStyleProvider>
//         </AppThemeProvider>
//       </AppContextProvider>
//     </CacheProvider>
//   );
// }

// MyApp.propTypes = {
//   Component: PropTypes.elementType.isRequired,
//   emotionCache: PropTypes.object,
//   pageProps: PropTypes.object.isRequired,
// };