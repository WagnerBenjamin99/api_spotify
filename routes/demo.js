const { Router } = require('express');

const {  helloWorld, getArtist, getPlaylistTracks,getGenresRecomendation,getArtistAlbums,getAlbumesTracks } = require('../controllers/demo');




const rutas = Router();

rutas.get('/artist/:id', getArtist);
rutas.get('/playlist/:id', getPlaylistTracks);
rutas.get('/recommendations/available-genre-seeds', getGenresRecomendation);
rutas.get('/artist/:id/albums', getArtistAlbums);
rutas.get('/albums/:id', getAlbumesTracks);



module.exports = rutas;