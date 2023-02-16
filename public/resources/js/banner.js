import Color from './color.js';

const c = console;

async function recBanner(artist, track, access_token) {
    const url = `https://api.spotify.com/v1/recommendations?seed_artists=${artist}&seed_tracks=${track}&limit=1`;

    const config = {
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true
    }

    const res = await (await fetch(url, config)).json();
    // c.log(res);

    document.querySelector('.banner-box').insertAdjacentHTML('beforeend', `
    <div id="recommendation" class="banner" style="background-image: radial-gradient(farthest-corner at 40px 40px, #14E0AA, #16202C); ">
        
            <div class="banner-body">
                <div class="banner-header">
                    <img class="banner-logo" src="resources/img/spotify-icons-logos/logos/01_RGB/02_PNG/Spotify_Logo_RGB_White.png" alt="">
                </div>
                <div class="banner-content">
                    
                    <canvas src="" alt="" id="canvas"></canvas>
                    <div class="banner-infos">
                        <p class="b-title">Você pode gostar de</p>
                        <h1 class="banner-item"></h1>
                        <p class="banner-text"></p>
                        <div class="banner-link">
                            <a href="/recommendations">Veja mais</a>
                            <a href="${res.tracks[0].external_urls.spotify}" target="_blank" rel="noopener noreferrer">Ouça agora</a>
                        </div>
                    </div>
                        
                </div>
            </div>
    </div>`);
    
    const canvas = document.querySelector(`#recommendation #canvas`);
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = '#14e0a9ff';
    ctx.fillRect(0, 0, 300, 300);

    const div = document.querySelector(`#recommendation`);
    constructBanner(div, res.tracks[0].album.images[1].url, res.tracks[0].name, res.tracks[0].artists[0].name)
    
};

function createBannerView(data, el) {
    const main = el

    // if (data.name.length > 20) {
    //     data.name = data.name.substring(0, 20) + '...';
    // }

    let genres = ``

    for (const g of data.genres){
        genres = genres + "\n" + `                                <div class="genre-tag">${g.name}</div>`
    }

    const banner = `
        <div class="swiper-slide banner-slide">
            <div class="card banner-card">
                <img src="${data.background_image}" alt="${data.name}"> 
                <div class="card-footer">
                    <div class="card-footer-content">
                        <div class="major-infos">
                            <h2 class="title"> <a href="/games?id=${data.id}">${data.name}</a> </h2>
                            <div>
                                <h4 class="developer">${data.publishers[0].name}</h4>
                                <span> | </span>
                                <h4 class="classificacao-esb">${data.esrb_rating.name}</h4>
                            </div>
                                
                        </div>
                        <div class="minor-infos">
                            <div class="genres">
                                ${genres}
                            </div>
                        </div>
                    </div>
                </div>                                             
            </div>
        </div>`;

    main.insertAdjacentHTML('beforeend', banner);

    // callSwiper();

    // c.log(card);
};

function constructBanner(div, url, name, artist){
    fetch(url)
        // .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(async blob => {
        let objectURL = blob;
        // main(objectURL)
        let myImage = new Image();

        const fileName = 'image.png'

        const contentType = blob.headers.get('content-type')
        const blobi = await blob.blob()
        const file = new File([blobi], fileName, { contentType })
        await Color.getColorPallete(div, file)
    });

    console.log('Construindo seus banners exclusivos...');

    document.querySelector(`#${div.id} .banner-item`).textContent = name;
    document.querySelector(`#${div.id} .banner-text`).textContent = artist;

};

export default { createBannerView, recBanner, constructBanner }