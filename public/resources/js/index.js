import Logic from './logic.js';

const c = console

function putIndexContent(songObj, artistObj, genre, lastPlayedObj){
    putTopItems(songObj, artistObj);
    favoriteGenre(genre);
    recentlyPlayed(lastPlayedObj);
};

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
    const songImg = document.querySelector('.card.top-tracks .card-footer img');
    const songTitle = document.querySelector('.card.top-tracks .card-footer h4');
    const songArtist = document.querySelector('.card.top-tracks .card-footer p');

    songImg.setAttribute('src', songObj.items[0].album.images[2].url);
    songImg.setAttribute('alt', `${songObj.items[0].album.artists[0].name} - ${songObj.items[0].name}`);
    songTitle.textContent = songObj.items[0].name;
    songArtist.textContent = songObj.items[0].album.artists[0].name;

    const artistImg = document.querySelector('.card.top-artists .card-footer img');
    const artistName = document.querySelector('.card.top-artists .card-footer h4');

    artistImg.setAttribute('src', artistObj.items[0].images[2].url);
    artistImg.setAttribute('alt', `${artistObj.items[0].name}`);
    artistName.textContent = artistObj.items[0].name;
};

function favoriteGenre(genre){
    var favoriteGenre = Logic.findGenres(genre);
    const div = document.querySelector('.card.genre-msg .genre');
    div.textContent = favoriteGenre + '!!!💃';
};

function recentlyPlayed(obj){
    const recently_played_song = obj.items[0].track.name;
    const recently_played_artist = obj.items[0].track.artists[0].name;

    const img = document.querySelector('.card.recently-played .card-footer img');
    const song = document.querySelector('.card.recently-played .card-footer .recently-played-content');
    const artist = document.querySelector('.card.recently-played .card-footer .recently-played-artist');
    img.setAttribute('src', obj.items[0].track.album.images[2].url);
    song.textContent = recently_played_song;
    artist.textContent = recently_played_artist;
}



export default { putIndexContent, playing };