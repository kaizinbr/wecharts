async function putUser(access_token) {

    console.log('Acessando seu perfil...');
    let img;
    let name;
    let user_product;
    let id;

    img = sessionStorage.getItem('profile_pic');
    name = sessionStorage.getItem('user_name');
    user_product = sessionStorage.getItem('user_product');
    id = sessionStorage.getItem('user_id');

    if(img && name && user_product && id){
        const view = `
        <div class="pic ${id}">
            <figure>
                <img src="${img}" alt="${name} profile pic">
            </figure>
            <span class="user_product ${user_product}">${user_product}</span>
        </div>`;

        const userDiv = document.querySelector('.user');
        userDiv.classList.add(id)
        userDiv.innerHTML = view;
        return;
    } else {
        const config = {
            method: 'get',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
        };
    
        const url = `https://api.spotify.com/v1/me`

        const user = await (await fetch(url, config)).json();
        
        img = (user.images == []) ? 'resources/img/cover placeholder.png' : user.images[0].url ;
        name = user.display_name;
        user_product = user.product;
        id = user.id;

        sessionStorage.setItem('profile_pic', img);
        sessionStorage.setItem('user_name', name);
        sessionStorage.setItem('user_product', user_product);
        sessionStorage.setItem('user_id', id);

        const view = `
        <div class="pic ${id}">
            <figure>
                <img src="${img}" alt="${name} profile pic">
            </figure>
            <span class="user_product ${user_product}">${user_product}</span>

        </div>`;

        const userDiv = document.querySelector('.user');
        userDiv.classList.add(id)
        userDiv.innerHTML = view;
    }
}

export default putUser;