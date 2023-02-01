function isAuthenticated() {
  if (!getToken()) {
    window.location.href = '/signinup.html';
		console.log("Sei lá")
  } else {
    return true;
  }
}

function getToken() {
  return localStorage.getItem('@foodApp:token');
}

function signin(token) {
  localStorage.setItem('@foodApp:token', token);

  window.location.href = '/';
}

function signout() {
  localStorage.removeItem('@foodApp:token');

  window.location.href = '/signinup.html';
}

export default { isAuthenticated, getToken, signin, signout }; 