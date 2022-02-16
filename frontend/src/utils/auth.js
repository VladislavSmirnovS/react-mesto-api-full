function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const BASE_URL = "http://localhost:3000";

export function registerUser(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function loginUser(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse)
  .then((data) => {
    if (data.token){
      console.log(data.token)
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
}

export function getToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      'Authorization': `${jwt}`,
    },
  }).then(checkResponse)
}