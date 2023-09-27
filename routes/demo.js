const { Router } = require('express');

const {  helloWorld, getArtist, getPlaylistTracks,getGenresRecomendation,getArtistAlbums,getAlbumesTracks, getAudiobook  } = require('../controllers/demo');




const rutas = Router();

rutas.get('', helloWorld);

rutas.get('/artist/:id', getArtist);
rutas.get('/playlist/:id', getPlaylistTracks);
rutas.get('/recommendations/available-genre-seeds', getGenresRecomendation);
rutas.get('/artist/:id/albums', getArtistAlbums);
rutas.get('/albums/:id', getAlbumesTracks);
rutas.get('/audiolibros/:id', getAudiobook);


module.exports = rutas;