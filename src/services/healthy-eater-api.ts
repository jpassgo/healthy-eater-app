import buildUrl from 'build-url';
import urls from '../constants/urls';

interface AuthorizationToken {
  authorization: string,
}

export default function authenticateUser(username: string, password: string): any {
  const userName = username;
  return fetch(buildUrl(urls.healthyEaterApi, { path: '/authentication' }),
    {
      method: 'Post',
      body: JSON.stringify({ userName, password }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response: Response) => {
      response.json();
    })
    .catch((error: Error) => {
      console.error(`Error authenticating user: ${error}`);
    });
}

export default function createAccount(username: string, password: string, firstName: string, lastName: string, emailAddress: string): any {
  return fetch(buildUrl(urls.healthyEaterApi, { path: '/accounts' }),
    {
      method: 'Post',
      body: JSON.stringify({
        userCredentials: { userName, password }, firstName, lastName, emailAddress,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response: Response) => {
      response.json();
    })
    .catch((error: Error) => {
      console.error(`Error creating an account: ${error}`);
    });
}
