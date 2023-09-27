const { Router } = require('express');
const {  helloWorld, getArtist, getPlaylistTracks, getAlbums, getNameDescriptionFromPlaylist } = require('../controllers/demo');

const rutas = Router();

rutas.get('', helloWorld);

rutas.get('/artist/:id', getArtist);
rutas.get('/playlist/:id', getPlaylistTracks);
rutas.get('/playlist/:id/datos', getNameDescriptionFromPlaylist);
rutas.get('/album/:id', getAlbums);


module.exports = rutas;