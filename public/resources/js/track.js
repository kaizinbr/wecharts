import App from './app.js';

const c = console;

function putTopData(image, title, artist){
    const img = document.querySelector('.song-cover img');
    const divTitle = document.getElementById('song-name');
    const divArtist = document.getElementById('song-artist');

    img.setAttribute('src', image);
    img.setAttribute('alt', `${title} - ${artist}`);

    divTitle.textContent = title;
    divArtist.textContent = artist;
}

function putBtns(url, preview){
    const btnPreview = document.getElementById('btn-preview');
    const btnUrl = document.getElementById('btn-url');

    btnPreview.setAttribute('href', preview);
    btnUrl.setAttribute('href', url);
}

function putSongInfo(items){
    const name = document.querySelector('.name p');
    const album = document.querySelector('.album p');
    const artist = document.querySelector('.artists > div');
    const number = document.querySelector('.number p');
    const isrc = document.querySelector('.isrc p');
    const duration = document.querySelector('.duration p');

    name.textContent = items.name;
    album.textContent = items.album.name;
    number.textContent = items.track_number;
    isrc.textContent = items.external_ids.isrc ? items.external_ids.isrc : 'Não disponível';
    duration.textContent = msToMsAndS(items.duration_ms);

    putArtists(items.artists, artist);
    putSongPopularity(items);
}

async function putPlaycount(items){
    const playcount = document.querySelector('.playcount #category-item');
    // const playcountSpan = document.getElementById('playcount-span');
    // const playcountSpan2 = document.getElementById('playcount-span-2');

    console.log(items.name, items.album.id)
    const playcountData = await App.getPlaycount(items.album.id, items.track_number);
    playcount.textContent = playcountData;
    // playcountSpan.textContent = playcountData;
    // playcountSpan2.textContent = playcountData;
}

function putAlbumInfo(items, trackName){
    c.log(items)
    const name = document.querySelector('.album-info .name p');
    const artist = document.querySelector('.album-info .artists > div');
    const total_tracks = document.querySelector('.album-info .total > p');
    const label = document.querySelector('.album-info .label p');
    const popularity = document.querySelector('.album-info .popularity p');
    const release = document.querySelector('.album-info .release p');
    const duration = document.querySelector('.album-info .duration p');
    const copyright = document.querySelector('.album-info .copyright');

    name.textContent = items.name;
    total_tracks.textContent = items.total_tracks;
    label.textContent = items.label ? items.label : 'Não disponível';
    popularity.textContent = items.popularity;
    release.textContent = convertData(items.release_date);
    duration.textContent = getAlbumDuration(items.tracks, document.querySelector('.other-tracks'), trackName);

    putArtists(items.artists, artist);
    putCopyright(items.copyrights, copyright);
}

function putSongPopularity(items){
    const popularity = document.getElementById('popularity');
    const popularitySpan = document.querySelector('#popularity span');

    popularitySpan.textContent = items.popularity;
    popularity.style.width = `${items.popularity}%`;
}

function putAudioFeatures(items){
    const key = document.querySelector('.key p');
    const tempo = document.querySelector('.bpm p');
    key.textContent = items.key;
    tempo.textContent = items.tempo;

    const danceability = document.getElementById('danceability');
    const danceabilitySpan = document.querySelector('#danceability span');
    const energy = document.getElementById('energy');    
    const energySpan = document.querySelector('#energy span');
    // const loudness = document.getElementById('loudness');
    const acousticness = document.getElementById('acousticness');   
    const acousticnessSpan = document.querySelector('#acousticness span');
    const liveness = document.getElementById('liveness');
    const livenessSpan = document.querySelector('#liveness span');
    const valence = document.getElementById('valence');
    const valenceSpan = document.querySelector('#valence span');

    putBar((items.danceability * 100).toFixed(), danceability, danceabilitySpan);
    putBar((items.energy * 100).toFixed(), energy, energySpan);
    // putBar(items.loudness, loudness);
    putBar((items.acousticness * 100).toFixed(), acousticness, acousticnessSpan);
    putBar((items.liveness * 100).toFixed(), liveness, livenessSpan);
    putBar((items.valence * 100).toFixed(), valence, valenceSpan);

    // danceabilitySpan.textContent = `${items.danceability * 100}%`;
    // energy.style.width = `${items.energy * 100}%`;
    // energySpan.textContent = `${items.energy * 100}%`;
    // acousticness.style.width = `${items.acousticness * 100}%`;
    // acousticnessSpan.textContent = `${items.acousticness * 100}%`;
}

function putBar(value, document, span){

    if (value > 10){
        document.style.width = `${value}%`;
        span.textContent = `${value}%`;
    } else {
        document.style.width = `${value}%`;
        document.insertAdjacentHTML('afterend', `<span style="color: #dfece9; margin-left: 10px" class="percent">${value}%</span>`);
    }
    
}

function putArtists(artObj, divPai){
    for (let i = 0; i < artObj.length; i++) {
        const a = `
        <a href="${artObj[i].external_urls.spotify}" target="_blank" rel="noopener noreferrer" id="${artObj[i].id}">${artObj[i].name}</a>`;

        divPai.insertAdjacentHTML('beforeend', a);
    }
}

function putCopyright(copyObj, divPai){
    for (let i = 0; i < copyObj.length; i++) {
        const a = `
        <p id="category-item">${copyObj[i].text}</p>`;

        divPai.insertAdjacentHTML('beforeend', a);
    }
}

function convertData(data){
    let dataInput = new Date(data);
    let dataFormatada = dataInput.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

    return dataFormatada;
}

function getAlbumDuration(tracks, otherTracksDiv, trackName){
    c.log(trackName)
    let total_duration = 0;
    for (let i = 0; i < tracks.items.length; i++){
        if (tracks.items[i].name != trackName){
            total_duration += tracks.items[i].duration_ms;
            
            const track = `
            <a href="/track?id=${tracks.items[i].id}" id="${tracks.items[i].id}">${tracks.items[i].name}</a>`;

            otherTracksDiv.insertAdjacentHTML('beforeend', track);
        }
        else{
            total_duration += tracks.items[i].duration_ms;
        }
    }

    total_duration = msToMsAndS(total_duration);

    return total_duration;
}

function msToMsAndS(ms) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60) > 0 ? Math.floor(minutes / 60) : '';
    console.log(hours)
  
    seconds = seconds % 60;
    minutes = minutes % 60;
  
    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
    hours = hours % 24;

    let time = `${(padTo2Digits(hours) !== '00' ? (padTo2Digits(hours) + ':') : '')}${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
  
    return time;
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

export default { putTopData, putBtns, putSongInfo, putAlbumInfo, putAudioFeatures, putPlaycount };