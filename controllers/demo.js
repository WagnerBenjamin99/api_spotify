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
      res.status(404).json('Error al obtener datos del artista:', error);
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
      res.status(200).json(playlistTracks);
    })
    .catch((error) => {
   
      console.error('Error al obtener datos del artista:', error);
    });
   
}
//semillas-de-genero-disponibles
const getGenresRecomendation = async (req = request, res = response) => {    
  const access_token = await getAuthFromClientCredentials();    
  
  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  };
   
    
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

   
  const episodes_Id = req.params['id'];
  console.log(episodes_Id);

  axios.get(`https://api.spotify.com/v1/episodes/${episodes_Id}`, config)
    .then((response) => {
      const episodesData = response.data;
      console.log('Podcast:', episodesData);
      //res.end( JSON.stringify(artistData));
  
      res.status(200).json(episodesData);
    })
    .catch((error) => {
      res.status(404);
      console.error('Error al obtener datos del podcast:', error);
    });
  




const getAlbumesTracks = async (req = request, res = response) => {
  const access_token = await getAuthFromClientCredentials();

  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  };

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

const getAudiobook = async (req = request, res = response) => {
  const access_token = await getAuthFromClientCredentials();

  const config = {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  };

  const audioBook_id = req.params["id"];

  axios.get(`https://api.spotify.com/v1/audiobooks/${audioBook_id}`, config)
  .then((response) => {
    const audioBookData = response.data;
    console.log('Datos del audiobook:', audioBookData);
    res.status(200).json(audioBookData);
  })
  .catch((error) => {
    res.status(404);
    console.error('Error al obtener datos del album: ', error);
  })

}


module.exports = {
  helloWorld,
  getArtist, 
  getPlaylistTracks,
  getGenresRecomendation,
  getAlbumesTracks,
  getAudiobook

}

