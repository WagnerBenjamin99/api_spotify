const { Router } = require('express');

const { getArtist, getPlaylistTracks, getAlbums, getTopArtists, getArtistAlbumes, getAlbumTracks,filterGenre } = require('../controllers/demo');


const rutas = Router();

rutas.get('/artist/:id', getArtist); // Benja
rutas.get('/playlist/:id', getPlaylistTracks); // Benja
rutas.get('/artistas-top', getTopArtists); // Diego
rutas.get('/albums-actuales', getAlbums); // Diego
rutas.get('/artistas/:id/albums', getArtistAlbumes); // Emi
rutas.get('/albums/:id/tracks', getAlbumTracks); // Emi
rutas.get('/track', filterGenre); // Benja


module.exports = rutas;