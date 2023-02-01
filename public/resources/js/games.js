const c = console

async function getData(id, front) {
    const url = `https://api.rawg.io/api/games/${id}?key=6b749e73010d4081b7a673763e7c93d6`;

    const config = {
    method: 'get',
    headers: {},
    }

    const res = await (await fetch(url, config)).json();

    getFrontData(res, front);
    getDesc(res);
    getPics(res);
    getRating(res);
    getDetails(res);
    getTags(res);

    const name = res.name;
    document.title = name;
    callSwiper();
    // c.log(res.metacritic_platforms[0].platform);
};

function getFrontData(res, front) {
    const game_title = document.querySelector('.game-title');
    const publisher = document.querySelector('.publisher');
    const esrb_rating = document.querySelector('.esrb-rating');
    const plataform = document.querySelector('.plataform');

    const metacritic = document.querySelector('.metacritic-rating');
    const user_rating = document.querySelector('.user-rating');
    const release_date = document.querySelector('.release-date');
    let rate = res.esrb_rating;
    if (rate == null){
        rate = 'N/A';
    } else{
        rate = rate.name;
    }



    game_title.textContent = res.name;
    publisher.textContent = res.publishers[0].name;
    esrb_rating.textContent = rate;
    plataform.textContent = res.platforms[0].platform.name;

    metacritic.textContent = res.metacritic;
    user_rating.textContent = res.rating;
    release_date.textContent = res.released;
    document.body.style.backgroundImage = `url('${res.background_image}')`;
    front.style.backgroundImage = `url('${res.background_image}')`;
};

function getDesc(res) {
    const desc = document.querySelector('.description');
    desc.innerHTML = res.description;
}

function getPics(res) {
    const pics = document.querySelectorAll('.pics');

    const hidden_pic = document.querySelectorAll('.hidden-pic');
    
    pics[0].src = res.background_image;
    pics[1].src = res.background_image_additional;

    hidden_pic[0].src = res.background_image;
    hidden_pic[1].src = res.background_image_additional;
}

function getRating(res) {
    const meta_score = document.querySelector('.metascore-score');
    const meta_title = document.querySelector('.metascore-title');

    const user_score = document.querySelector('.individual-scores');

    for (const ratings of res.metacritic_platforms) {
        const score = ratings.metascore;
        const rate = `<div class="score">
                            <h3 class="score-score">${score}</h3>
                            <h3 class="score-title">${ratings.platform.name}</h3>
                        </div>
                        <div class="vertical-line"></div>`;

        user_score.insertAdjacentHTML('beforeend', rate);
    };
    
    const last_line = user_score.lastChild
    last_line.parentNode.removeChild(last_line);
};

function getDetails(res) {
    const details = document.querySelector('.detail-box');
     
    const devs = res.developers;    
    var devName = ''
    for (const dev of devs) {
        devName = devName  + ', ' + dev.name;
    }
    devName = devName.replace(', ', '');

    const devView = `<div class="detail">
                        <h3 class="detail-title">Desenvolvedor:</h3>
                        <h3 class="detail-info">${devName}</h3>
                    </div>`;

    details.insertAdjacentHTML('afterbegin', devView);

    const pubs = res.publishers;    
    var pubName = ''
    for (const pub of pubs) {
        pubName = pubName  + ', ' + pub.name;
    }
    pubName = pubName.replace(', ', '');

    const pubView = `<div class="detail">
                        <h3 class="detail-title">Publicador:</h3>
                        <h3 class="detail-info">${pubName}</h3>
                    </div>`;

    details.insertAdjacentHTML('beforeend', pubView);

    var release_date = res.released;
    release_date = new Date(Date.parse(release_date))
    release_date = release_date.toLocaleDateString()

    const releaseView = `<div class="detail">
                        <h3 class="detail-title">Data de lançamento:</h3>
                        <h3 class="detail-info">${release_date}</h3>
                    </div>`;

    details.insertAdjacentHTML('beforeend', releaseView);

    const last_update = res.updated; 
    var localDate = new Date(Date.parse(last_update))
    localDate = localDate.toLocaleDateString()

    const updateView = `<div class="detail">
                        <h3 class="detail-title">Última atualização:</h3>
                        <h3 class="detail-info">${localDate}</h3>
                    </div>`;

    details.insertAdjacentHTML('beforeend', updateView);

    const esrb_rating = res.esrb_rating.name;

    const classView = `<div class="detail">
                        <h3 class="detail-title">Classificação:</h3>
                        <h3 class="detail-info">${esrb_rating}</h3>
                    </div>`;

    details.insertAdjacentHTML('beforeend', classView);

    const site = res.website;
    const siteName = removeHttp(site);

    const siteView = `<div class="detail">
                            <h3 class="detail-title">Site:</h3>
                            <h3 class="detail-info"><a href="${site}">${siteName}</a></h3>
                        </div>`;

    details.insertAdjacentHTML('beforeend', siteView);

    const platforms = res.platforms;    
    var platName = ''
    for (const plat of platforms) {
        platName = platName  + ', ' + plat.platform.name;
    }
    platName = platName.replace(', ', '');
    c.log(platName)

    const platView = `<div class="detail">
                        <h3 class="detail-title">Plataformas:</h3>
                        <h3 class="detail-info">${platName}</h3>
                    </div>`;

    details.insertAdjacentHTML('beforeend', platView);
};

function getTags(res) {
    const main = document.querySelector('.swiper-wrapper.swiper-genre');
    c.log(main)
    const genre = res.genres;
    for (const g of genre) {
        c.log(g)
        const genreView = `<div class="swiper-slide">
                            <div class="card tag-pic">
                                <img src="${g.image_background}" alt="${g.name}">                             
                            </div>
                            <h4 class="tag-name">${g.name}</h4>
                        </div>`
        main.insertAdjacentHTML('beforeend', genreView);
    }

    const main2 = document.querySelector('.swiper-wrapper.swiper-tag');
    c.log(main2)

    const tags = res.tags;
    for (const t of tags) {
        const tagView = `<div class="swiper-slide">
                            <div class="card tag-pic">
                                <img src="${t.image_background}" alt="${t.name}">                             
                            </div>
                            <h4 class="tag-name">${t.name}</h4>
                        </div>`
        main2.insertAdjacentHTML('beforeend', tagView);
    }
}

function removeHttp(url) {
    let newUrl = url.replace(/(^\w+:|^)\/\//, '');
    newUrl = newUrl.replace('www.', '');
    return newUrl
}

function callSwiper() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 2,
        spaceBetween: 20,
        freeMode: true
    
    });
}

export default { getData, getFrontData }