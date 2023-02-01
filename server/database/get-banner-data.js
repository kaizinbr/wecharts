import { resolve } from 'path';
import { readFileSync } from 'fs';

const c = console

async function getBannerData() {
    const file = resolve(process.cwd(), 'public', 'resources', 'json', 'index-banner-infos.json');
  
    const content = JSON.parse(readFileSync(file));

    return content;
};

async function getGameData() {
    const file = resolve(process.cwd(), 'public', 'resources', 'json', 'index-banner-infos.json');
  
    const content = JSON.parse(readFileSync(file));

    const result = content.games[2]

    return result;
};

getGameData()

export default { getBannerData, getGameData }