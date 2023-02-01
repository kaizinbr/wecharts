const c = console

// async function getDeveloperId(nome) {
//     let content = nome   //document.querySelector('.content-title').textContent;
//     content = encodeURI(content);
//     c.log(content, 'encodado');

//     const url = `https://api.rawg.io/api/developers?key=6b749e73010d4081b7a673763e7c93d6&search=${content}&page_size=1`;

//     const config = {
//     method: 'get',
//     headers: {},
//     }

//     const res = await (await fetch(url, config)).json();

//     let devId = res.results[0].id;
//     return devId;
// }

async function putData(devId, el) {

    c.log(devId);    

    const url = `https://api.rawg.io/api/games?key=6b749e73010d4081b7a673763e7c93d6&developers=${devId}&page_size=30`;

    const config = {
    method: 'get',
    headers: {},
    }

    const data = await (await fetch(url, config)).json();

    const nextPage = data.next;
    c.log(nextPage)
    const prevPage = data.prev;
    c.log(prevPage)
    let gamesQtd = data.count;
    const results = data.results;    

    for (const dado of results) {
      createCardView(dado, el);
      pgQtd = pgQtd +1;
    }

    ableButton(nextPage, prevPage, pgQtd, gamesQtd);
    c.log(prevPage);
};

async function putNewData(link, el) {

    c.log(link);    

    const url = link;

    const config = {
    method: 'get',
    headers: {},
    }

    const data = await (await fetch(url, config)).json();

    const nextPage = data.next;
    const prevPage = data.prev;
    let gamesQtd = data.count;
    const results = data.results;   
    
    
    const main = el;
    main.innerHTML = '';

    for (const dado of results) {
      createCardView(dado, el);
      pgQtd = pgQtd +1;
    }

    ableButton(nextPage, prevPage, pgQtd, gamesQtd);
};

async function ableButton(next, prev, pgQtd, gamesQtd) {
    // parte dos botôes de paginação
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prev === undefined || prev === null) {
        prevBtn.classList.add('disabled');
        prevBtn.setAttribute('disabled', 'disabled');
    } else if (prev !== undefined || prev !== null) {
        prevBtn.classList.remove('disabled');
        prevBtn.removeAttribute('disabled');
    };

    if (next == undefined || next === null) {
        nextBtn.classList.add('disabled');
        nextBtn.setAttribute('disabled', 'disabled');
    } else if (next !== undefined || next !== null) {
        nextBtn.classList.remove('disabled');
        nextBtn.removeAttribute('disabled');
    };

    const prevLink = `
            <span class="material-symbols-outlined">
                arrow_back_ios
            </span>`;

    const nextLink = `
            <span class="material-symbols-outlined">
                arrow_forward_ios
            </span>`;

    prevBtn.innerHTML = prevLink;
    nextBtn.innerHTML = nextLink;

    // parte dos números de paginação
    const pgNumber = document.querySelector('.page-games');
    const pgTotal = document.querySelector('.total-games');

    pgNumber.textContent = pgQtd;
    pgTotal.textContent = gamesQtd;
};


function createCardView(dado, el) {
    const main = el;

    if (dado.name.length > 20) {
        dado.name = dado.name.substring(0, 20) + '...';
    }

    const card = `
        <div class="card">
            <img src="${dado.background_image}" alt="">
            <div class="infos">
                <div class="game-infos">
                    <h2>${dado.name}</h2>
                    <div class="details">
                        <span class="material-symbols-outlined">
                            visibility
                        </span><h3>${dado.reviews_count}</h3>
                        <span class="material-symbols-outlined">
                            star
                        </span><h3>${dado.rating}</h3>
                    </div>
                </div>
                <div class="button">                        
                    <button>
                        <a href="/game/${dado.id}">
                            <h3>Ver</h3>
                            <span class="material-symbols-outlined arrow">
                                arrow_forward_ios
                            </span>
                        </a>
                    </button>
                    
                </div>
                
            </div>   
        </div>`;


    main.insertAdjacentHTML('beforeend', card);
};

export default { putData, ableButton, createCardView };  