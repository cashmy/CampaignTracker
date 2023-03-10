// import * as React from 'react';
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../../createEmotionCache";
import AppContextProvider from "../../lib/context/AppContextProvider";
import AppThemeProvider from "@/../../lib/context/AppThemeProvider/index.js";
import AppStyleProvider from "@/../../lib/context/AppStyleProvider/index.js";
// import AppLocaleProvider from '@/../../lib/context/AppLocaleProvider/index.js';
import AppAuthProvider from "../core/AppAuthProvider";
import AuthRoutes from "@/../../lib/components/AuthRoutes.js";
import InfoViewContextProvider from "@/../../lib/context/AppContextProvider/InfoViewContextProvider.js";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <AppContextProvider>
        <AppThemeProvider>
          {/* <AppLocalProvider> */}
          <AppStyleProvider>
            <InfoViewContextProvider>
              <AppAuthProvider>
                <AuthRoutes>
                  <CssBaseline />
                  <Component {...pageProps} />
                </AuthRoutes>
              </AppAuthProvider>
            </InfoViewContextProvider>
          </AppStyleProvider>
          {/* </AppLocalProvider> */}
        </AppThemeProvider>
      </AppContextProvider>
    </CacheProvider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
