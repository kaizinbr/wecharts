import Logic from './logic.js';

const c = console;

async function getPlaycount(albumId, trackNumber){
    const url = `http://localhost:8080/albumPlayCount?albumid=${albumId}`;
    const response = await fetch(url, {
        method: 'GET'
    });
    const data = await response.json();
    // Cache.put(url, response)

    const playCount = (data.data.discs[0].tracks[trackNumber - 1].playcount).toLocaleString('pt-BR');

    // console.log((data.data.discs[0].tracks[trackNumber - 1].playcount).toLocaleString('pt-BR'));
    // c.log(playCount)


    return playCount;
}

// parte das músicas
async function putTracks(num, items){
    putTopTrack(items);
    // c.log('veio no app')
    const tabela = document.querySelector('table.songs-table tbody');
    tabela.innerHTML = '';

    for(let i = 0; i < num; i++){
        // const data = items[i];
        const number = i + 1;

        const playCount = await getPlaycount(items[i].album.id, items[i].track_number);

        // if (items[i].name.length > 20) {
        //     items[i].name = items[i].name.substring(0, 20) + '...';
        // }

        const view = `
                    <tr>
                        <td>${number}</td>
                        <td class="cover">
                            <div>
                                <img src="${items[i].album.images[0].url}" alt="${items[i].name} - ${items[i].artists[0].name}">
                            </div>
                        </td>
                        <td class="infos track">
                            <h3 class="title"><a href="/track?id=${items[i].id}">${items[i].name}</a></h3>
                            <h4 class="singer">${items[i].artists[0].name}</h4>
                        </td>
                        <td class="streams">
                            <span class="number">${playCount}</span>
                        </td>
                    </tr>`

                    // c.log(items[i].album.images[0].url)
        tabela.insertAdjacentHTML('beforeend', view);
    }
    // c.log(views);
}

function putTopTrack(items){
    const img = document.querySelector('.chart-cover img');
    const title = document.querySelector('.song-info #song-title');
    const artist = document.querySelector('.song-info #song-artist');

    img.setAttribute('src', items[0].album.images[0].url);
    img.setAttribute('alt', `${items[0].name} - ${items[0].artists[0].name}`);

    title.textContent = items[0].name;
    artist.textContent = items[0].artists[0].name;
}

// parte dos artistas
function putArtists(num, items){
    putTopArtist(items);
    // c.log('veio no app')
    const tabela = document.querySelector('table.songs-table tbody');
    tabela.innerHTML = '';

    for(let i = 0; i < num; i++){
        const data = items[i];
        const number = i + 1;

        const view = `
                    <tr>
                        <td>${number}</td>
                        <td class="cover">
                            <div>
                                <img src="${items[i].images[0].url}" alt="${items[0].name}">
                            </div>
                        </td>
                        <td class="infos">
                            <h3 class="title">${items[i].name}</h3>
                            <h4 class="singer">Seguidores: ${items[i].followers.total}</h4>
                        </td>
                    </tr>`

                    // c.log(items[i].album.images[0].url)
        tabela.insertAdjacentHTML('beforeend', view);
    }
    // c.log(views);
}

function putTopArtist(items){
    const img = document.querySelector('.chart-cover img');
    const title = document.getElementById('artist-title');

    img.setAttribute('src', items[0].images[0].url);
    img.setAttribute('alt', `${items[0].name}`);

    title.textContent = items[0].name;
}

function putDateTracks(num, items){
    // c.log('veio no app')
    const tabela = document.querySelector('table.songs-table tbody');
    tabela.innerHTML = '';

    for(let i = 0; i < num; i++){
        const data = items[i];
        const {horaExata, dataExata} = convertDate(items[i].played_at);
        // const number = i + 1;

        const view = `
                    <tr>
                        
                        <td class="cover">
                            <div>
                                <img src="${items[i].track.album.images[0].url}" alt="${items[i].track.name} - ${items[i].track.artists[0].name}">
                            </div>
                        </td>
                        <td class="infos">
                            <h3 class="title"><a href="/track?id=${items[i].track.id}">${items[i].track.name}</a></h3>
                            <h4 class="singer">${items[i].track.artists[0].name}</h4>
                            <h2 class="played">Tocada em ${dataExata}, às ${horaExata}</h2>
                        </td>
                    </tr>`

                    // c.log(items[i].album.images[0].url)
        tabela.insertAdjacentHTML('beforeend', view);
    }
    // c.log(views);
}

function convertDate(data) {
    var utcDate = '2023-01-18T23:57:48.941Z';  // ISO-8601 formatted date returned from server
    var d = new Date(data)

    var horaExata = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    var dataExata = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

    return {horaExata, dataExata};
}

function recommendations(num, obj){ 
    const tabela = document.querySelector('table.songs-table tbody');
    tabela.innerHTML = '';
    let uris = [];

    for(let i = 0; i < num; i++){
        const data = obj[i];
        const number = i + 1;

        const view = `
                    <tr>
                        <td>${number}</td>
                        <td class="cover">
                            <div>
                                <img src="${obj.tracks[i].album.images[0].url}" alt="${obj.tracks[i].name} - ${obj.tracks[i].artists[0].name}">
                            </div>
                        </td>
                        <td class="infos">
                            <h3 class="title"><a href="/track?id=${obj.tracks[i].id}" target="_blank" rel="noopener noreferrer" >${obj.tracks[i].name}</a></h3>
                            <h4 class="singer">${obj.tracks[i].artists[0].name}</h4>
                        </td>
                    </tr>`

                    // c.log(items[i].album.images[0].url)
        tabela.insertAdjacentHTML('beforeend', view);

        uris.push(obj.tracks[i].uri);
    }

    return uris;
}

function favoriteGenre(genre){
    if (genre === null) {
        console.log('não tem genero favorito')
        return;
    } else {
        var favoriteGenre = Logic.findGenres(genre);
        const div = document.querySelector('.favorite-genre');
        div.textContent = favoriteGenre;
    }
};

export default { putTracks, putArtists, putDateTracks, recommendations, favoriteGenre, getPlaycount };