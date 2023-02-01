async function getUserId(access_token){
    var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };



      // use the access token to access the Spotify Web API
      request.get(options, async function(error, res, body) {
        console.log(body);
        var user = 'user_id';
        res.cookie(user, body.id, { maxAge: 3600 * 1000 });
        // res.send(body);
      });
}

export default getUserId;