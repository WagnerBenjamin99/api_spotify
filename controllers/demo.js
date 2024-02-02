const axios = require('axios').default;
const { request, response} = require('express');
const { getAuthFromClientCredentials } = require('../controllers/spotify-auth.js');

//devolver una cantidad de albums actuales - diego antonio
const getAlbums = async (req, res) => {    
  try {

    const config = await getAuthFromClientCredentials();    

    // confirmo que la configuracion de autenticacion no sea una variable vacia 
    if (!config) {
      throw new Error('Error al obtener la configuracion de autenticacion');
    }
  
    const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', config);

    const totalAlbums = response.data.albums.items;
    
    res.status(200).json(totalAlbums);
  } catch (error) {
    console.error('Error en la solicitud:', error);
    res.status(500).json({ error: 'Error en la solicitud' });
  }
}

// conseguir solo los mejores 5 artistas - diego antonio
const getTopArtists = async (req, res) => {
  try {
    const config = await getAuthFromClientCredentials();
    
    // confirmo que la configuracion de autenticacion no sea una variable vacia 
    if (!config) {
      throw new Error('Error al obtener la configuracion de autenticacion');
    }

    const cantidadArtistas = 5;
    
    // Obtengo la mejor lista
    const playlistResponse = await axios.get('https://api.spotify.com/v1/browse/categories/toplists/playlists', config);
    const playlistId = playlistResponse.data.playlists.items[0].id;

    // obtengo las canciones de esa lista
    const playlistDetailsResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, config);
    const tracks = playlistDetailsResponse.data.tracks.items;

    // saco los href de cada cancion
    const artistHrefs = tracks.slice(0, cantidadArtistas).map(item => item.track.artists[0].href);

    // solicito los href de los artistas que estan en la toplist
    const detailedArtists = await Promise.all(artistHrefs.map(href => axios.get(href, config)));

    // saco los datos de cada artista de la toplist
    const topArtists = detailedArtists.map(response => response.data);

    res.status(200).json(topArtists);
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
  getArtistAlbums,
  getAlbumesTracks,
  getAlbums,
  filterGenre,
  getTopArtists
}
