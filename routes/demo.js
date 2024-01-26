const { Router } = require('express');

const { getArtist, getPlaylistTracks, getAlbums, getTopArtists,getGenresRecomendation,getArtistAlbums,getAlbumesTracks, filterGenre } = require('../controllers/demo');




const rutas = Router();

rutas.get('/artist/:id', getArtist);
rutas.get('/playlist/:id', getPlaylistTracks);
rutas.get('/artistas', getTopArtists);
rutas.get('/album/:id', getAlbums);
rutas.get('/recommendations/available-genre-seeds', getGenresRecomendation);
rutas.get('/artist/:id/albums', getArtistAlbums);
rutas.get('/albums/:id', getAlbumesTracks);
rutas.get('/track', filterGenre);



module.exports = rutas;