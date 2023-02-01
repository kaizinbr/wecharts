const c = console

async function getBannerData(el) {
    const url = `/banner-data`;

    const config = {
    method: 'get',
    headers: {},
    }

    const res = await (await fetch(url, config)).json();

    for (const con of res.games){
        createBannerView(con, el)
    };
    callBtns()
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

function callBtns(){
    
    var swiper = new Swiper(".banner", {
        slidesPerView: 1,
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
        },
        pagination: {
            el: ".swiper-pagination",                
            dynamicBullets: true,
        },
    });
}

export default { createBannerView, getBannerData }