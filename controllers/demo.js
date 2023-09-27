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
      res.end( JSON.stringify(artistData));
      return JSON.stringify(artistData);
    })
    .catch((error) => {
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
      res.end( JSON.stringify(playlistTracks));
      return JSON.stringify(playlistTracks);
    })
    .catch((error) => {
      console.error('Error al obtener datos del artista:', error);
    });
  
}

//albums
const getAlbums = async (req, res) => {    
  try {
    const config = await getAuthFromClientCredentials();    

    const albums_id = req.params['id']; 
  
    const response = await axios.get(`https://api.spotify.com/v1/albums/${albums_id}`, config);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error en la solicitud:', error);
    res.status(500).json({ error: 'Error en la solicitud' });
  }
}

const getNameDescriptionFromPlaylist = async (req, res) => {    
  try {
    const config = await getAuthFromClientCredentials();

    const fields = req.query.fields;
    const market = req.query.market;

    const response = await axios.get(`https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n?market=${market}&fields=${fields}`, config);

    const { name, description } = response.data;
    res.status(200).json({ name, description });
  } catch (error) {
    console.error('Error en la solicitud:', error);
    res.status(500).json({ error: 'Error en la solicitud' });
  }
}


module.exports = {
  helloWorld,
  getArtist, 
  getPlaylistTracks,
  getAlbums,
  getNameDescriptionFromPlaylist
}
