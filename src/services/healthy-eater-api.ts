import buildUrl from 'build-url';
import urls from '../constants/urls';
import Meal from '../models/Meal';

interface AuthorizationToken {
  authorization: string,
}

export function authenticateUser(username: string, password: string): any {
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
    .then((response: Response) => response.json())
    .catch((error: Error) => {
      console.error(`Error authenticating user: ${error}`);
    });
}

export function createAccount(userName: string, password: string, firstName: string,
  lastName: string, emailAddress: string): any {
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
    .then((response: Response) => response.json())
    .then((responseData) => responseData)
    .catch((error: Error) => {
      console.error(`Error creating an account: ${error}`);
    });
}

export function reportMeal(meal: Meal, authToken: String) {
  const auth = `Bearer ${authToken}`;
  return fetch(buildUrl(urls.healthyEaterApi, { path: '/meals' }),
    {
      method: 'Post',
      body: JSON.stringify(meal),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth,
      },
    })
    .then((response: Response) => response)
    .catch((error: Error) => {
      console.error(`Error reporting meal: ${error}`);
    });
}

export function retrieveAccountDetails(userName: string, authorizationToken: string) {
  return fetch(buildUrl(urls.healthyEaterApi, { path: `/accounts?userName=${userName}` }),
    {
      method: 'Get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authorizationToken,
      },
    }).then((response: Response) => response)
    .catch((error: Error) => {
      console.error(`Error retrieving account: ${error}`);
    });
}
