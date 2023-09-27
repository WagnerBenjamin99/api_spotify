const axios = require('axios').default

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const url = 'https://accounts.spotify.com/api/token';

const getAuthFromClientCredentials = async () => {

  try {
    const { data } = await axios.post(url, {
        grant_type: 'client_credentials'
      }, {
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),            
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    )    
    const config = {
      headers: {
        'Authorization': `Bearer ${data.access_token}`
      }
    };
    
    return config || '';
  } catch (error) {      
      return false;
  }
}

module.exports = {
    getAuthFromClientCredentials
}