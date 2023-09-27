const { Router } = require('express');
const {  helloWorld, getArtist, getPlaylistTracks, getAlbumesTracks, getAudiobook } = require('../controllers/demo');

const rutas = Router();

rutas.get('', helloWorld);

rutas.get('/artist/:id', getArtist);
rutas.get('/playlist/:id', getPlaylistTracks);
rutas.get('/albums/:id', getAlbumesTracks);
rutas.get('/audiolibros/:id', getAudiobook)


module.exports = rutas;