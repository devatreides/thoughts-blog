import Router from 'next/router';
import NProgress from 'nprogress';
import { ToastContainer } from 'react-toastify';

import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/index.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
