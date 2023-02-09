import 'express-async-errors';
import 'dotenv/config'
import { Router } from "express";
import request from 'request'; // "Request" library
import express, { json } from 'express';
import morgan from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';
import querystring from 'querystring';
import cookieParser from 'cookie-parser';
import puppeteer from 'puppeteer';
import Logic from '../public/resources/js/logic.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const c = console;
router.use(express.json())
router.use(express.urlencoded({ extended: true }));

router.use(cors())
    .use(cookieParser());




router.get('/user', (req, res) => {
    const access_token = req.cookies.access_token;

    var options = {
        url: `https://api.spotify.com/v1/me`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    
    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
        var user = 'user_id';
        res.cookie(user, body.id, { maxAge: 3600 * 1000 });
        res.send(body);
    });
})

router.get('/construct-top-fifty-songs', (req, res) => {
    const access_token = req.cookies.access_token;
    var time_range = req.query.time_range;

    var options = {
        url: `https://api.spotify.com/v1/me/top/tracks?offset=0&limit=50&time_range=${time_range}`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    
    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
        res.send(body);
    });
})

router.get('/construct-top-fifty-artists', (req, res) => {
    const access_token = req.cookies.access_token;
    var time_range = req.query.time_range;

    var options = {
        url: `https://api.spotify.com/v1/me/top/artists?offset=0&limit=50&time_range=${time_range}`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    
    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
        res.send(body);
    });
})

router.get('/index/playing-now', (req, res) => {
    const access_token = req.cookies.access_token;
    // const access_token = 'BQBDYhkcnkqJsrHuz0ZVt4o3NTgTo9A-j691EmstclvKZWFovKJPwDj2MgaubwX7ERauaX96K-HCKXwruG2wpvX0whqkfoM6lKjTVU_5TiAIBMvtQFKyRqi1ZG_74rGOA55nRSLQjhGnc-Fn4g3NZp-sHXLpv8FR31Fn3pvC7HGaYh2upBgAIDkSw0Bpp9OxxYoAuqR2DsRzQQrjrpldd_yohuepr-6_l-xAOablNisYq1PksxlbbZp8d9h7-XgiOWjyVXzfUF4'
    console.log('access_token: ', access_token);

    var options = {
        url: `https://api.spotify.com/v1/me/player/currently-playing?additional_types=track&market=BR`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    
    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
        if (body == undefined){
            res.send('error');
        } else{
            res.send(body);
        }
    });
})

router.get('/index/top-song', (req, res) => {
    // const access_token = 'BQAB--CixO6X0frR6B_eqDlOth34oCGsVXhSED1nrxtaAL0z2g0TwjSRfwAcyImBqfyVvbD70xBI5UlJJjQ1OnSVC0jS_9F6dky3LeEfk9srhJEdNC1vruulgyr_xNdg2y3H5xwXMXxathhSDKqlCZsK5fOdY3mxvmuq8k9LhNwmNmt5ao_6YufsMbpBnYivVK302tG1kjUKIk6_CFE-Bo8amSL7LU0XyvVWseGUZN5Z9bR90KnWg6eyW3a4ttID6Zgf53cI09c' //req.cookies.access_token;
    const access_token = req.cookies.access_token;

    var options = {
        url: `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&offset=0&limit=1`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    
    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
        res.send(body);
    });
})

router.get('/index/top-artist', (req, res) => {
    // const access_token = 'BQCnBuLPBM0gvscU6iUVn1HqlbUFvj0uiUIdgSLU6F5QPMD79rWVVp0TbjUabal5VNtpipwh3Sw4k73QjpOIscVFME4bwTDS6xXjTrA7A9tnqRIOtsPd1GJWPxiXLT9LflslZfI_1JQSKyxC80I-GdmbrVCCadVXn_0D2063kF63yAKx9QAmy2HAf_P-ESB5TOnlZm79kl4CxK4JAfDWEK7ic8DhJM_mm_1Y_wnBApebVBtL-TCwXWDLJM0v18-9vcrmJ6wRbsY'//req.cookies.access_token;
    const access_token = req.cookies.access_token;

    var options = {
        url: `https://api.spotify.com/v1/me/top/artists?time_range=short_term&offset=0&limit=1`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    
    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
        res.send(body);
    });
})

router.get('/index/recently-played', (req, res) => {
    const access_token = req.cookies.access_token;
    // var time_range = req.query.time_range;

    var options = {
        url: `https://api.spotify.com/v1/me/player/recently-played?offset=0&limit=50`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    
    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
        res.send(body);
    });
})

router.get('/favorite-genres', (req, res) => {
    const access_token = req.cookies.access_token;
    var time_range = 'long_term' //req.query.time_range;

    var options = {
        url: `https://api.spotify.com/v1/me/top/artists?offset=0&limit=50&time_range=${time_range}`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    
    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {

        res.send(body);
    });

})

router.get('/index/recommendations', (req, res) => {
    const access_token = req.cookies.access_token;
    var artist = req.query.seed_artists;
    c.log(artist)
    var track = req.query.seed_tracks;

    var options = {
        url: `https://api.spotify.com/v1/recommendations?seed_artists=${artist}&seed_tracks=${track}&limit=30`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    
    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
        res.send(body);
    });
})

router.post('/create-playlist', async (req, res) => {
    const access_token = req.cookies.access_token //'BQCqXVbNn7uIVy3SDoS_-YcKIM6PqrL1MrAOXusZsbwtvjnxBIvokNB_AsDmXP2iSFZsw6Lq72eZftdAvP-VXrFMiarIA2vYF0LIg43RSsk7oIR_2l2JYdOatzgN9NKudS35ci1PGi7J9hZVkAnkRGniZ-At3NPieauaAGJVgZdpguXI9H6e_LbOknp9nxbbntW0Hw7E5Ndeuj7MJFp_E2_kU8nAISLpnS81JMiZ8aHmaxdnxqOFIoG6vgThpe5vmV0bnc54cXc' ;

    var user_id = req.body.user_id;
    console.log(user_id)

    const name = req.body.name;
    const description = 'Criadas com ❤️ por Wecharts';

    var options = {
        method: "POST",
        url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        contentType: 'application/json',
        json: true, 
        body: {
            "name": name,
            "description": description,
            "public": false
        }
    }
    
    // use the access token to access the Spotify Web API
    request.post(options, function(error, response, body) {
        console.log(body)
        res.send(body);
    });
})

router.post('/put-tracks-on-playlist', async (req, res) => {
    const access_token = req.cookies.access_token //'BQCqXVbNn7uIVy3SDoS_-YcKIM6PqrL1MrAOXusZsbwtvjnxBIvokNB_AsDmXP2iSFZsw6Lq72eZftdAvP-VXrFMiarIA2vYF0LIg43RSsk7oIR_2l2JYdOatzgN9NKudS35ci1PGi7J9hZVkAnkRGniZ-At3NPieauaAGJVgZdpguXI9H6e_LbOknp9nxbbntW0Hw7E5Ndeuj7MJFp_E2_kU8nAISLpnS81JMiZ8aHmaxdnxqOFIoG6vgThpe5vmV0bnc54cXc' ;


    const uris = req.body.tracks;
    c.log(uris)
    const playlist_id = req.body.playlist_id;

    var options = {
        method: "POST",
        url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        contentType: 'application/json',
        json: true, 
        body: {
            "uris": uris,
            "position": 0
        }
    }
    
    // use the access token to access the Spotify Web API
    request.post(options, function(error, response, body) {
        console.log(body)
        res.send(body);
    });
})



router.get('/teste/recently-played', (req, res) => {
    const access_token = 'BQAvZ9RXrKfZ88WlkZOkCzB0vLktAxxvQdLFJHF2N4kgE8cODmXDMxfszXUhgtpifm-A4gEvnu1sUdunAjbuWrkl2xX8vfBQlaTVuP5Hk-IdArIbtQWYRIHZ9VPdkIHeZkCbs93G7HIpfobGADefAC7_tbbLw2BU6aE4EqoUk9Su7jugK7zb8vD_e1AnVko-d0DkGXp3EsCkPPZkG8EVYqtYchYM2mC18pYEdmC0jZzO19vEZONU8iAZYxn3j3Ky94OlQyc4Qyk';
    var ano = 31557600000;
    var after = Date.now() - ano;

    var options = {
        url: `https://api.spotify.com/v1/me/player/recently-played?before=${after}&limit=50`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    
    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
        res.send(body);
    });
})

// router.get('/teste/lyrics', (req, res) => {
//     var options = {
//         url: `https://www.musixmatch.com/lyrics/AURORA-66/black-water-lilies`,
//         // headers: { 'Authorization': 'Bearer ' + access_token },
//         // json: true
//     };
    
//     // use the access token to access the Spotify Web API
//     request.get(options, function(error, response, body) {
//         // const text = Teste.getLyrics(body)
//         res.send(body);
//     });
// })


router.get('/teste/lyrics', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://open.spotify.com/track/0rhI6gvOeCKA502RdJAbfs');
  
 const pageData = await page.evaluate(() => {
    return {
      text: document.querySelector("body").innerHTML,
    };
  });
  console.log(pageData.text)

  await browser.close();

  res.send({
    "text": pageData.text
  })
});


router.get('/index/track', (req, res) => {
    const access_token = req.cookies.access_token;
    var id = req.query.id;
    c.log(id)

    var options = {
        url: `https://api.spotify.com/v1/tracks/${id}?market=BR`,
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    };
    
    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
        res.send(body);
    });
})

// testar pegar play count das musicas a partir da pagina do spotify web
router.get('/data/playcount', (req, res) => {
    const id = req.query.albumid;

    
    var options = {
        url: `http://localhost:8080/albumPlayCount?albumid=${id}`,
    };
    
    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
        console.log(body);
        res.send(body);
    });
})


router.get('/teste/token', (req, res) => {
    const access_token = 'BQCCuE_fKAyxuliXj6F74uqcrEDW1hxNOvWUGdLwkFyYQ-m5XFOjeBU1F0M9RqR1cusXEWM135sB41YBN6VC5c4leJYy5BeHmRSqm4StNMCKtfSnlcUfuspxUW7GWaIHHZYZibA995ThaCYsZHYBwXD867Liuo9PnvRuGSzpIRxGfEAmS6joSJcDo0nDoFYL4O8jz3b4WXz9OnoAPQ6L-Hcma9EY-gCpATyvNtsGIYXyBsJ5GenrxhYCUnmheW4jPNASbromKOj8sgPRzQd71faOLIp9gTGt8nIqXE7pVFRt_ZK97mqd6benNA6VeQvPazv6TVcLdhPlHZI6PKqVA9zu0dZ7XQ' //req.cookies.access_token //'BQA0Xz0vZPvcfJO8iB1SmuVVGgQKeXJALQQvUccUX4wlpMEDxldUAA1mhPPcjBgdo_3Qx_k654qoOuSMUy-u8eHAdasgNMR-QV5mZRm5Te0Kdjdkd8X7vftxNjMwD01Tdj8OitQDo9BwrqzTtasMmV2R1fez72761P60UMmu3yEuqVkMP11VE3bmu1pi_VXFEwaOfivQHfsWS4wNHKRcpj9jpbqmOdVH6K43NUCpP1sku_wCmHjluPnmdEUpj6R8s3Ir-cVgBy_m';
    const id = req.query.id;
    console.log(id)
    var options = {
        url: `https://clienttoken.spotify.com/v1/clienttoken`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            "client_data":
                {
                    "client_version":"1.2.5.518.g12232155",
                    "client_id":"d8a5ed958d274c2e8ee717e6a4b0971d",
                    "js_sdk_data":{"device_brand":"unknown",
                    "device_model":"desktop","os":"Windows",
                    "os_version":"NT 10.0"}
                }
        })
    };
    
    // use the access token to access the Spotify Web API
    request.post(options, function(error, response, body) {
        console.log(body);
        res.send(body);
    });
})



export default router;
