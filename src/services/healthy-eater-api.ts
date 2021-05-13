import buildUrl from 'build-url';
import urls from '../constants/urls';

interface AuthorizationToken {
  token: string,
}

export default function authenticateUser(username: string, password: string): any {
  return fetch(buildUrl(urls.healthyEaterApi, { path: '/authentication' }),
    {
      method: 'Post',
      body: JSON.stringify({ username, password }),
    })
    .then((response: Response) => response.json())
    .catch((error: Error) => {
      console.error(`Error authenticating user: ${error}`);
    });
}
