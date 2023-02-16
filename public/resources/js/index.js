import Banner from './banner.js';
import putUser from './user.js';


const c = console;



async function up(access_token){
    await putUser(access_token);
    
    await getPlayingNow()
    .then((obj) => {
        playing(obj);
    }).catch((error) => {
        console.error("Error:", error);
    });

    const top_song = await getTopTrack(access_token);
    const top_artist = await getTopArtist(access_token);
    putTopItems(top_song, top_artist);    
    await Banner.recBanner(top_artist.items[0].id, top_song.items[0].id, access_token);

    await getLastPlayed(access_token)
    .then((last_played) => {
        recentlyPlayed(last_played);
    }).catch((error) => {
        console.error("Error:", error);
    });

    console.log('Tudo pronto!')
    
}

async function getPlayingNow(){
    const config = {
        method: 'get',
        headers: {
        },
    };

    const url = `/index/playing-now`;

    const playing_now_data = await (await fetch(url, config)).json()
    

    if (playing_now_data.is_playing) {
        console.log(`Parece que você está ouvindo ${playing_now_data.item.name}`);
        return playing_now_data;
    } else {
        const playing = document.querySelector('.playing-box');
        playing.classList.add('hidden');
        return false;
    }
}

async function getTopTrack(access_token){
        
    const url = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&offset=0&limit=1`;

    const config = {
        method: 'get',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    const top_song = await (await fetch(url, config)).json();    

    const div = document.querySelector('#top_track');
    Banner.constructBanner(div, top_song.items[0].album.images[1].url, top_song.items[0].name, top_song.items[0].artists[0].name);
    console.log(`Hmm, parece que você gosta de ${top_song.items[0].name}`)
    return top_song;
};

async function getTopArtist(access_token){
    const config = {
        method: 'get',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    const url = `https://api.spotify.com/v1/me/top/artists?time_range=short_term&offset=0&limit=1`;

    const top_artist = await (await fetch(url, config)).json();
    
    // console.log(top_artist)
    const div = document.querySelector('#top_artist');
    Banner.constructBanner(div, top_artist.items[0].images[1].url, top_artist.items[0].name, '');
    console.log(`E de ${top_artist.items[0].name} também`)

    return top_artist;
};

async function getLastPlayed(access_token){
    const config = {
        method: 'get',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };

    const url = `https://api.spotify.com/v1/me/player/recently-played?offset=0&limit=50`;

    const last_played = await (await fetch(url, config)).json();

    return last_played;
}

// function putIndexContent(songObj, artistObj, lastPlayedObj){
//     putTopItems(songObj, artistObj);
//     recentlyPlayed(lastPlayedObj);
// };

function playing(obj){
    if(obj.is_playing && obj.item.is_local == false && obj != 'error'){
        const view = `
        <div class="playing-now">
            <figure>
                <img src="${obj.item.album.images[2].url}" id="playing-now-img" alt="capa de ${obj.item.album.artists[0].name} - ${obj.item.name}">
            </figure>
            <div class="playing-now-info">
                <h3 id="playing-now">Tocando Agora:</h3>
                <div>
                    <h1 id="playing-now-title">${obj.item.name}</h1>
                    <h2 id="playing-now-artist">${obj.item.album.artists[0].name}</h2>
                </div>
                    
            </div>
        </div>`;

        const div = document.querySelector('.playing-box');
        div.innerHTML = view;
    } else{
        return console.log('Não está tocando nada no momento. :(')
    }
};

function putTopItems(songObj, artistObj){
    console.log('Estamos organizando tudo, um momento!');

    if (songObj.items[0] == null || songObj.items[0] == undefined) {
        console.log('Não há músicas salvas no seu perfil. :(');
        window.alert('Parece que não há músicas salvas no seu perfil ou você não usa sua conta há algum tempo. Algumas funções podem não funcionar corretamente. Tente usar sua conta regularmente por um período de 4 semanas e volte!');
    }
    else{


        const songImg = document.querySelector('.card.top-tracks .card-footer img');
        const songTitle = document.querySelector('.card.top-tracks .card-footer h4');
        const songArtist = document.querySelector('.card.top-tracks .card-footer p');

        // console.log(songObj)


        songImg.setAttribute('src', songObj.items[0].album.images[2].url);
        songImg.setAttribute('alt', `${songObj.items[0].album.artists[0].name} - ${songObj.items[0].name}`);
        songTitle.textContent = songObj.items[0].name;
        songArtist.textContent = songObj.items[0].album.artists[0].name;

        const artistImg = document.querySelector('.card.top-artists .card-footer img');
        const artistName = document.querySelector('.card.top-artists .card-footer h4');

        artistImg.setAttribute('src', artistObj.items[0].images[2].url);
        artistImg.setAttribute('alt', `${artistObj.items[0].name}`);
        artistName.textContent = artistObj.items[0].name;
    }
};

function recentlyPlayed(obj){
    if (obj.items[0] == null || obj.items[0] == undefined) {
        console.log('Não há músicas salvas no seu perfil. :(')
    }
    else{
        const recently_played_song = obj.items[0].track.name;
        const recently_played_artist = obj.items[0].track.artists[0].name;

        const img = document.querySelector('.card.recently-played .card-footer img');
        const song = document.querySelector('.card.recently-played .card-footer .recently-played-content');
        const artist = document.querySelector('.card.recently-played .card-footer .recently-played-artist');
        img.setAttribute('src', obj.items[0].track.album.images[2].url);
        song.textContent = recently_played_song;
        artist.textContent = recently_played_artist;
    }
}



export default {  playing, up };