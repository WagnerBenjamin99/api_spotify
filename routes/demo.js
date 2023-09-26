const { Router } = require('express');
const {  helloWorld, getArtist, getPlaylistTracks } = require('../controllers/demo');

const rutas = Router();

rutas.get('', helloWorld);

rutas.get('/artist/:id', getArtist);
rutas.get('/playlist/:id', getPlaylistTracks);


module.exports = rutas;