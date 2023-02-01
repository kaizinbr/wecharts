// Requiring fs module in which
// writeFile function is defined.
import { writeFile } from 'fs';
import fetch from "node-fetch";
  
// Data which will write in a file.

const c = console;

async function getGameId(nome) {
    let content = nome   //document.querySelector('.content-title').textContent;
    content = encodeURI(content);

    const url = `https://api.rawg.io/api/games?key=6b749e73010d4081b7a673763e7c93d6&search=${content}&page_size=1`;

    const config = {
    method: 'get',
    headers: {},
    }

    const res = await (await fetch(url, config)).json();

    let devId = res.results[0].id;

    const resultado = `https://api.rawg.io/api/games/${devId}?key=6b749e73010d4081b7a673763e7c93d6`;

    c.log(typeof resultado);
    
    let data = resultado;
    c.log(typeof data, 'linha 49');
    // Write data in 'Output.txt' .
    writeFile('public/resources/json/index-banner-infos.txt', data, (err) => {
        
        // In case of a error throw err.
        if (err) throw err;
    })
}
getGameId('genshin');
// async function getGameInfo(id) {
    

//     const url = `https://api.rawg.io/api/games/${id}?key=6b749e73010d4081b7a673763e7c93d6`;

//     // const config = {
//     // method: 'get',
//     // headers: {},
//     // }

//     // const res = await (await fetch(url, config)).json();

//     // let gameInfo = res;
//     // c.log(typeof url);
//     return url;
// }

