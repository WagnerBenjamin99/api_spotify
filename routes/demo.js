const { Router } = require('express');
const {  helloWorld, getArtist, getPlaylistTracks,getGenresRecomendation,getEpisodes } = require('../controllers/demo');

const rutas = Router();

rutas.get('', helloWorld);

rutas.get('/artist/:id', getArtist);
rutas.get('/playlist/:id', getPlaylistTracks);
rutas.get('/recommendations/available-genre-seeds', getGenresRecomendation);
rutas.get('/episodes/:id', getEpisodes);


module.exports = rutas;