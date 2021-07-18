import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/client';
import { isBrowser } from '~/util';

export function createLink() {
  const httpLink = createHttpLink({
    uri: 'https://korean-date-map.herokuapp.com/graphql',
    credentials: 'same-origin',
  });
  
  const authLink = setContext(async (_, { headers }) => {
    let token = "";

    if (isBrowser()) {
      const session = await getSession();
      if (session) token = session.token as string;
    }
  
    return {
      headers: {
        ...headers,
        Authorization: token ? `Basic ${token}` : "",
      }
    }
  });

  return authLink.concat(httpLink)
}
