import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/client';
import { isBrowser } from '~/util';

export function createLink() {
  const httpLink = createHttpLink({
    uri: 'https://korean-date-map.herokuapp.com/graphql',
    credentials: 'same-origin',
  });
  
  const authLink = setContext(async (_, current) => {
    const { headers } = current;
    let token = current ? current["x-dedong-token"] : "";

    if (!token && isBrowser()) {
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
