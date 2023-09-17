import { routes, host } from '../constants/routes';
import { store } from '../features/store';
import { newTokens,  } from '../features/slices/auth';

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');

async function request(method, url, data) {

  const state = store.getState();
  let accessToken = state.auth.accessToken;
  let refreshToken = state.auth.refreshToken;

  if (accessToken) {
    const jwtPayload = JSON.parse(window.atob(accessToken.split('.')[1]));
    const expaierd = jwtPayload.exp > Date.now() / 1000;

    if (!expaierd) {
      const result = await fetch(`${host}${routes.TOKENS}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      });
      const tokens = await result.json();

      if (!result.ok) {
        throw tokens;
      }
      accessToken = tokens.accessToken;
      refreshToken = tokens.refreshToken;
      store.dispatch(newTokens({ accessToken, refreshToken }));
    }
  }

  const options = {
    method,
    credentials: 'include',
    headers: {}
  };

  if (accessToken) {
    options.headers['x-authorization'] = accessToken;
  }

  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(`${host}${url}`, options);
    if (!res.ok) {
      throw await res.json();
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
}
