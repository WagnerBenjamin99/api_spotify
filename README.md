## Mi primera app en node.js con exprees
Integración con la API de Spotify
Esta aplicación Node.js proporciona integración con la API de Spotify para obtener información sobre artistas, listas de reproducción, géneros, álbumes y pistas. Utiliza la biblioteca Axios para realizar solicitudes a la API y Express.js para el enrutamiento. A continuación, se presenta una breve descripción de los endpoints disponibles y cómo utilizarlos.



## ENDPOINTS
## Obtener Información de un Artista
Endpoint:
/api/artist/:id
Descripción:
Obtener información sobre un artista especifico en Spotify.

Ejemplo:
Solicitud:
GET /api/artist/id-del-artista

Respuesta:
{
  "artistData": { ... } 
}

## Obtener Canciones de una Lista de Reproducción
Endpoint:
/api/playlist/:id/tracks
Descripción:
Obtener canciones de una lista de reproducción específica de Spotify.

Ejemplo:
Solicitud:
GET /api/playlist/id-de-la-lista-de-reproduccion/tracks

Respuesta:
{
  "playlistTracks": { ... }
}

## Obtener Géneros Recomendados
Endpoint:
/api/genres/recommended
Descripción:
Obtener una lista de géneros musicales recomendados de Spotify.

Ejemplo:
Solicitud:
GET /api/genres/recommended

Respuesta:
{
  "genresRecommended": [ ... ]
}

## Obtener Álbumes de un Artista
Endpoint:
/api/artist/:id/albums
Descripción:
Obtener álbumes de un artista específico en Spotify.

Ejemplo:
Solicitud:
GET /api/artist/id-del-artista/albums

Respuesta:
{
  "albumesData": { ... }
}

## Obtener Canciones de un Álbum
Endpoint:
/api/album/:id/tracks
Descripción:
Obtener canciones de un álbum específico de Spotify.

Ejemplo:
Solicitud:
GET /api/album/id-del-album/tracks

Respuesta:
{
  "albumTracks": { ... }
}