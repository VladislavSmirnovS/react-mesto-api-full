class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: "include",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._getResponseData);
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponseData);
  }

  createCard(newCard) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(cardId, isNotLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isNotLiked ? "PUT" : "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ avatar: link }),
    }).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  url: "https://api.mesto.vladislav.nomoredomains.work",
  headers: {
    "content-type": "application/json",
  },
});

export default api;
