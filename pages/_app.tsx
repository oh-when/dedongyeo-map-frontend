import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo/client';
import Router from 'next/router';
import theme from '../styles/theme';
import '../styles/reset.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { resetCourseState } from '~/components/Course/CourseState';

Router.events.on('routeChangeComplete', (url) => {
  if (url.indexOf('/course') === -1) {
    resetCourseState();
  }
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const client = useApollo(pageProps);

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
