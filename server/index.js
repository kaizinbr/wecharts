import 'express-async-errors';
import 'dotenv/config'
import request from 'request'; // "Request" library
import express, { json } from 'express';
import morgan from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';
import querystring from 'querystring';
import cookieParser from 'cookie-parser';
import router from './routes.js'; 

import getUserId from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use('/', express.static('public'))
  .use(cors())
  .use(cookieParser());
  
app.use('/', router);


/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

// var express = require('express'); // Express web server framework
// var request = require('request'); // "Request" library
// var cors = require('cors');
// var querystring = require('querystring');
// import router from './routes.js'; 
// var cookieParser = require('cookie-parser');


var client_id = 'cc0b2308c9764162bd781deed153abf1'; // Your client id
var client_secret = 'dc43ce24f0e7466fab83ca4bd45018f8'; // Your secret
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

var access_token;
var refresh_token;
var token;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-top-read user-follow-read user-library-read playlist-modify-private user-read-currently-playing user-read-recently-played user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', async function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
          access_token = body.access_token,
          refresh_token = body.refresh_token;
          // define o access_token como cookie e o tempo de expiração (1 hora)
          var key = 'access_token';
          res.cookie(key, access_token, { maxAge: 3600 * 1000 });

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, async function(error, response, body) {
          console.log(body);
        });


        // we can also pass the token to the browser to make requests from there
         res.redirect('/'
         //mudança de lógica para melhor integração das páginas, agora o token é guardado como cookie e expira em 1 hora
          // '/home?' +
          // querystring.stringify({
          //   access_token: access_token,
          //   refresh_token: refresh_token,
          //   // data: data
          // })
          //+ 
          
          // JSON.stringify({            
          //   access_token: access_token,
          //   refresh_token: refresh_token
          // })
          );
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.get('/me', async function(req, res) {
  console.log('entrou no auth');
  const access_token = req.cookies.access_token;
  console.log('cookie: ', access_token);


  res.sendFile(path.join(__dirname, '/../public/me.html'));
  
});

app.get('/my-top-songs', async function(req, res) {
  console.log('entrou no auth');
  const access_token = req.cookies.access_token;
  console.log('cookie: ', access_token);


  res.sendFile(path.join(__dirname, '/../public/top-songs.html'));
  
});

app.get('/my-top-artists', async function(req, res) {
  console.log('entrou no auth');
  const access_token = req.cookies.access_token;
  console.log('cookie: ', access_token);


  res.sendFile(path.join(__dirname, '/../public/top-artists.html'));
  
});

app.get('/recently-played', async function(req, res) {
  console.log('entrou no auth');
  const access_token = req.cookies.access_token;
  console.log('cookie: ', access_token);


  res.sendFile(path.join(__dirname, '/../public/recently-played.html'));
  
});

app.get('/recommendations', async function(req, res) {
  console.log('entrou no auth');
  const access_token = req.cookies.access_token;
  console.log('cookie: ', access_token);


  res.sendFile(path.join(__dirname, '/../public/recommendations.html'));
  
});

app.get('/track', async function(req, res) {
  console.log('entrou no auth');
  const access_token = req.cookies.access_token;
  console.log('cookie: ', access_token);


  res.sendFile(path.join(__dirname, '/../public/track.html'));
  
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
});

