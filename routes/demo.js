const { Router } = require('express');

const { getArtist, getPlaylistTracks, getAlbums, getTopArtists, getArtistAlbums, getAlbumesTracks, filterGenre } = require('../controllers/demo');


const rutas = Router();

rutas.get('/artist/:id', getArtist);
rutas.get('/playlist/:id', getPlaylistTracks);
rutas.get('/artistas-top', getTopArtists);
rutas.get('/albums-actuales', getAlbums);
rutas.get('/artist/:id/albums', getArtistAlbums);
rutas.get('/albums/:id', getAlbumesTracks);
rutas.get('/track', filterGenre);

module.exports = rutas;