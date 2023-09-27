const axios = require('axios');
const { request, response} = require('express');
const { getAuthFromClientCredentials } = require('../controllers/spotify-auth.js');



const helloWorld = (req = request, res = response) => {
  res.send('Pagina raiz')
} 

const getArtist = async (req = request, res = response) => {    
  const access_token = await getAuthFromClientCredentials();    
  
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  };
  
  
  const artistId = req.params['id'];

  axios.get(`https://api.spotify.com/v1/artists/${artistId}`, config)
    .then((response) => {
      const artistData = response.data;
      console.log('Datos del artista:', artistData);
      //res.end( JSON.stringify(artistData));
  
      res.status(200).json(artistData);
    })
    .catch((error) => {
      res.status(404);
      console.error('Error al obtener datos del artista:', error);
    });
  
}

//Tracks

const getPlaylistTracks = async (req = request, res = response) => {    
  const access_token = await getAuthFromClientCredentials();    
  
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  };
  
  
  const playlist_id = req.params['id']; 
  
  axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, config)
    .then((response) => {
      const playlistTracks = response.data;
      console.log('Playlist tracks', playlistTracks);
      res.status(200).playlistTracks;
    })
    .catch((error) => {
      res.status(404);
      console.error('Error al obtener datos del artista:', error);
    });
  
}

module.exports = {
  helloWorld,
  getArtist, 
  getPlaylistTracks
}

