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
    
    if (!config) {
      throw new Error('Error al obtener la configuracion de autenticacion');
    }

    const cantidadArtistas = 5;
    
    const playlistResponse = await axios.get('https://api.spotify.com/v1/browse/categories/toplists/playlists', config);
    const playlistId = playlistResponse.data.playlists.items[0].id;

    const playlistDetailsResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, config);
    const tracks = playlistDetailsResponse.data.tracks.items;

    const uniqueArtistsSet = new Set();
    const topArtists = [];

    for (const item of tracks) {
      const artistHref = item.track.artists[0].href;

      if (!uniqueArtistsSet.has(artistHref)) {
        uniqueArtistsSet.add(artistHref);
        topArtists.push(artistHref);

        if (topArtists.length === cantidadArtistas) {
          break;
        }
      }
    }

    const detailedArtists = await Promise.all(topArtists.map(href => axios.get(href, config)));

    res.status(200).json(detailedArtists.map(response => response.data));
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

//Benja Genero

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
    const axios = require('axios');
  }
     


    //artist albums canciones Emi
    const getArtistAlbumes = async (req = request, res = response) => {    
      const config = await getAuthFromClientCredentials();    
      
      const artist_Id = req.params['id'];
      
      axios.get(`https://api.spotify.com/v1/artists/${artist_Id}/albums`, config)
          .then((response) => {
              const albumTracksData = response.data;
              console.log('Álbumes del artista:', albumTracksData);
              res.status(200).json(albumTracksData);
          })
          .catch((error) => {
              console.error('Error al obtener datos de los álbumes:', error);
              res.status(500).json({ error: 'Error al obtener datos de los álbumes ' })
          });
  }
  
    
    //album tracks (canciones del album de un artista se pasa el id del album ) Emi
    const getAlbumTracks = async (req, res) => {
      try {
        // Obtener la configuración de autenticación
        const config = await getAuthFromClientCredentials();
        
        // Verificar si se obtuvo la configuración
        if (!config || !config.headers) {
          throw new Error('Error al obtener la configuración de autenticación');
        }
    
        // Obtener el ID del álbum desde los parámetros de la solicitud
        const albumId = req.params.id;
        
        // Realizar la solicitud a la API de Spotify para obtener las pistas del álbum
        const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, config);
        
        // Obtener los datos de las pistas del álbum de la respuesta
        const albumTracks = response.data;
        
        // Enviar los datos de las pistas del álbum como respuesta
        res.status(200).json(albumTracks);
      } catch (error) {
        // Manejar errores
        console.error('Error al obtener datos del álbum:', error);
        res.status(500).json({ error: 'Error al obtener datos del álbum' });
      }
    }


  module.exports = {
    getArtist,//Benja 
    getPlaylistTracks,//Benja
    getTopArtists,//Diego
    getAlbums,//Diego
    getArtistAlbumes,//Emi
    getAlbumTracks,//Emi    
    filterGenre,//Benja    
  
  }

