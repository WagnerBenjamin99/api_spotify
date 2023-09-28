const axios = require('axios').default;
const { request, response} = require('express');
const { getAuthFromClientCredentials } = require('../controllers/spotify-auth.js');

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

    const playlist_id = req.params['id'];
    const { fields, market } = req.query;

    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}?market=${market}&fields=${fields}`, config);

    const { name, description } = response.data;
    res.status(200).json({ name, description });
  } catch (error) {
    console.error('Error en la solicitud:', error);
    res.status(500).json({ error: 'Error en la solicitud' });
  }
}

//artist
const getArtist = async (req = request, res = response) => {    
  const config = await getAuthFromClientCredentials();    
  
  const artistId = req.params['id'];

  axios.get(`https://api.spotify.com/v1/artists/${artistId}`, config)
    .then((response) => {
      const artistData = response.data;
  
      res.status(200).json(artistData);
    })
    .catch((error) => {
      console.error('Error al obtener datos del artista:', error);
      res.status(500).json({ error: 'Error al obtener datos del artista' });
    });
  
}


//Playlist tracks
const getPlaylistTracks = async (req = request, res = response) => {    
  const config = await getAuthFromClientCredentials();    
  
  const playlist_id = req.params['id']; 
  
  axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, config)
    .then((response) => {
      const playlistTracks = response.data;
      console.log('Playlist tracks', playlistTracks);
      res.status(200).json(playlistTracks);
    })
    .catch((error) => {
      console.error('Error al obtener datos de la lista de reproducción:', error);
      res.status(500).json({ error: 'Error al obtener datos de la lista de reproducción' });
    });
    
}

//semillas-de-genero-disponibles
const getGenresRecomendation = async (req = request, res = response) => {    
  const config = await getAuthFromClientCredentials();       
    
  axios.get(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, config)
    .then((response) => {
      const genres_recomended = response.data;
      console.log('Genres Recomended', genres_recomended);
      res.status(200).json(genres_recomended);
    })
    .catch((error) => {
      res.status(404);
      console.error('Error al obtener el Genero Musical:', error);
    });
   
}


//artist albums
const getArtistAlbums = async (req = request, res = response) => {    
  const config = await getAuthFromClientCredentials();    
  
  const artist_Id = req.params['id'];

  axios.get(`https://api.spotify.com/v1/artist/${artist_Id}/albums `, config)
    .then((response) => {
      const albumesData = response.data;
      console.log('Albumes del artista:', albumesData);
      //res.end( JSON.stringify(artistData));
  
      res.status(200).json(albumesData);
    })
    .catch((error) => {
      res.status(404);
      console.error('Error al obtener datos de los albumes:', error);
    });
}

//album tracks
const getAlbumesTracks = async (req = request, res = response) => {
  const config = await getAuthFromClientCredentials();

  const album_id = req.params["id"];

  axios.get(`https://api.spotify.com/v1/albums/${album_id}/tracks`, config)
  .then((response) => {
    const albumTracks = response.data;
    console.log('Datos del album:', albumTracks);
    res.status(200).json(albumTracks);
  })
  .catch((error) => {
    res.status(404);
    console.error('Error al obtener datos del album: ', error)
  })

}

const filterGenre = async (req = request, res = response) => {
  const config = await getAuthFromClientCredentials();
  const genre = req.query['genre'];

  axios.get(`https://api.spotify.com/v1/search?q=genre:${genre}&type=track`, config)
  .then((response) => {
    res.status(200).json(response.data.tracks);
  })
  .catch((error) => {
    res.status(404);
    console.error('Error al procesar su busqueda ', error)
  })


}



module.exports = {
  getArtist, 
  getPlaylistTracks,
  getGenresRecomendation,
  getArtistAlbums,
  getAlbumesTracks,
  getAlbums,
  getNameDescriptionFromPlaylist, 
  filterGenre
}
