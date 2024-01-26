const axios = require('axios').default;
const { request, response} = require('express');
const { getAuthFromClientCredentials } = require('../controllers/spotify-auth.js');

//conseguir al azar una cantidad especifica de albums - diego antonio
const getAlbums = async (req, res) => {    
  try {
    const config = await getAuthFromClientCredentials();    

    const cantidadAlbums = req.params["quantity"]; 
  
    const response = await axios.get(`https://api.spotify.com/v1/browse/new-releases?limit=${cantidadAlbums}`, config);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error en la solicitud:', error);
    res.status(500).json({ error: 'Error en la solicitud' });
  }
}
// conseguir solo los mejores 5 artistas - diego antonio
const getTopArtists = async (req, res) => {
  try {
    const config = await getAuthFromClientCredentials(); 
    
    const cantidadArtists = 5;
    
    const response = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=${cantidadArtists}`, config);
    
    res.status(200).json(response.data); 
  } catch (error) {
    console.error('Error en la solicitud:', error);
    res.status(500).json({ error: 'Error en la solicitud' });
  }
}

//artist
const getArtist = async (req = request, res = response) => {    
  const config = await getAuthFromClientCredentials();    
  console.log(config);
  
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
    .then(response => {
      if (response.status !== 200) {
        console.log("Error al procesar la respuesta");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data;
      if (data.tracks && data.tracks.items) {
        const pistas = data.tracks.items;
        const resultado = pistas.map(pista => ({
          nombre: pista.name,
          artistas: pista.artists.map(artist => artist.name),
          album: pista.album.name,
          imagen: pista.album.images.length > 0 ? pista.album.images[0].url : null,
        }));
        console.log(resultado)
        res.status(200).json(resultado);
      } else {
        console.log("No se encontraron pistas para el género especificado.");
        res.status(404).json({ error: "No se encontraron pistas para el género especificado." });
      }
    })
    .catch(error => {
      console.error('Error al procesar su búsqueda', error);
      res.status(500).json({ error: 'Error al procesar su búsqueda' });
    });
};




module.exports = {
  getArtist, 
  getPlaylistTracks,
  getGenresRecomendation,
  getArtistAlbums,
  getAlbumesTracks,
  getAlbums,
  filterGenre,
  getTopArtists
}
