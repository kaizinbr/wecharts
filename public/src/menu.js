import Auth from './auth.js';

window.signout = Auth.signout;

function startIndex() {
	console.log("É isso")
	Auth.isAuthenticated()
	verifyAuth()	
}

async function verifyAuth() {
  const url = `/get-image-user`;
  const config = {
  method: 'get',
  headers: {
    Authorization: `Bearer ${Auth.getToken()}`,
  },
};
  const user_img = await (await fetch(url, config)).json();

    const sign = document.getElementById('navbarSupportedContent')
    let response = `<a class="nav-link active" id="home-link" aria-current="page" href="/index.html">Home</a>`
    if((Auth.getToken())) {
      /*
      <p class="saudacao" class="navbar-brand" style="
    margin-bottom: 0;
padding: 16px; color: white;">Olá!</p>*/
			response +=  `
<img class="foto-perfil" class="navbar-brand" src="${user_img.image}">
                <span class="material-symbols-outlined logout navbar-brand"
                  onclick="signout()" id="logout" alt="Sair">
  logout
  </span>`
    } else {
			response = `<a class="nav-link" aria-current="page" href="/index.html">Home</a>
      <a class="nav-link active"  href="/signinup.html">Cadastrar/Entrar</a>`
			// window.location.href = '/signinup.html'
    }

		sign.innerHTML = response;
}

export default { startIndex, verifyAuth }; //logout
