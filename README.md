## Mi primera app en node.js con exprees
Integración con la API de Spotify
Esta aplicación Node.js proporciona integración con la API de Spotify para obtener información sobre artistas, listas de reproducción, géneros, álbumes y pistas. Utiliza la biblioteca Axios para realizar solicitudes a la API y Express.js para el enrutamiento. A continuación, se presenta una breve descripción de los endpoints disponibles y cómo utilizarlos.



## ENDPOINTS

## Obtener informacion de un album
Endpoint:
/api/v1/albums/id_del_album
Description:
Obtener informacion especifica de un album de spotify.

Ejemplo:
Solicitud:
GET /api/v1/albums/id_del_album

Respuesta:
{
  "albumData": { ... }
}

## Obtener Información de un Artista
Endpoint:
/api/v1/artist/:id
Descripción:
Obtener información sobre un artista especifico en Spotify.

Ejemplo:
Solicitud:
GET /api/v1/artist/id-del-artista

Respuesta:
{
  "artistData": { ... } 
}

## Obtener Canciones de una Lista de Reproducción
Endpoint:
/api/v1/playlist/:id/tracks
Descripción:
Obtener canciones de una lista de reproducción específica de Spotify.

Ejemplo:
Solicitud:
GET /api//v1/playlist/id_de_la_lista_de_reproduccion/tracks

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
GET /api/v1/genres/recommended

Respuesta:
{
  "genresRecommended": [ ... ]
}

## Obtener Álbumes de un Artista
Endpoint:
/api/v1/artist/:id/albums
Descripción:
Obtener álbumes de un artista específico en Spotify.

Ejemplo:
Solicitud:
GET /api/v1/artist/id_del_artista/albums

Respuesta:
{
  "albumesData": { ... }
}

## Obtener Canciones de un Álbum
Endpoint:
/api/v1/album/:id/tracks
Descripción:
Obtener canciones de un álbum específico de Spotify.

Ejemplo:
Solicitud:
GET /api/v1/album/id-del-album/tracks

Respuesta:
{
  "albumTracks": { ... }
}

## Obtener canciones filtradas por genero

Endpoint:
/api/v1/?genre=genero_que_desea_filtrar
Descripcion:
Obtener canciones filtrando por el genero que desea, busqueda realizada en spotify.

Ejemplo:
Solicitud:
GET /api/v1/?genre=genero_que_desea_filtrar

Respuesta:
{
  "tracks" : { ... }
}