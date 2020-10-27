import Router from 'next/router';
import NProgress from 'nprogress';
import TagManager from 'react-gtm-module';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/index.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const tagManagerArgs = {
      gtmId: 'GTM-NKQNFP2'
    };
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default MyApp;
