const c = console;
// const requests = ['games'];
let responses = [];

async function search(params, mode) {

    let content = params;
    content = content.replaceAll(' ', '+');

    let views = 0;

    // for (const request of requests) {
        const url = `https://api.rawg.io/api/${mode}?key=6b749e73010d4081b7a673763e7c93d6&search=${content}`;

        const config = {
        method: 'get',
        headers: {},
        }

        const res = await (await fetch(url, config)).json();

        views = views + res.count;

        responses.push(res);
        c.log(res)
    //}

    // for (const r of res.re) {
        for (const dado of res.results) {
            createCardView(dado, mode);
        }
    // }

    c.log(views, 'resultados encontrados');
    // c.log(responses);
    putResQtd(views);

}

function createCardView(dado, mode) {
    const main = document.querySelector(`.results`);

    let foto = dado.background_image;
    // c.log(foto);
    if (foto === null || foto === undefined) {
        foto = dado.image;
        if (foto === null || foto === undefined){
            foto = 'resources/img/placeholder.jpg';
        }
    };
    

    if (dado.name.length > 15) {
        dado.name = dado.name.substring(0, 15) + '...';
    }

    const card = `<div class="result-card">
                    <div class="card">
                        <img src="${foto}" alt="${dado.name}">
                        <div class="infos">
                            <div class="button">                        
                                <button>
                                    <a href="/${mode}?id=${dado.id}">
                                        <h3>Ver</h3>
                                        <span class="material-symbols-outlined arrow">
                                            arrow_forward_ios
                                        </span>
                                    </a>
                                </button>
                                
                            </div>
                            
                        </div>   
                    </div>
                    <div class="game-name">
                        <h2>${dado.name}</h2>
                    </div>
                </div>`;


    main.insertAdjacentHTML('beforeend', card);

    // c.log(card);
};

function putResQtd(qtd) {
    const main = document.querySelector('.res-count');
    const view = `<h4>${qtd} resultados</h4>`;

    main.innerHTML = view;
}

export default { search }