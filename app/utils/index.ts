import { pick } from 'lodash'

export const serializeArtistObj = (artist: SpotifyApi.ArtistObjectSimplified) => {
  return pick(artist, ['href', 'id', 'name', 'uri', 'type'])
}

export const serializeTrack = (track: SpotifyApi.TrackObjectSimplified) => {
  return {
    ...pick(track, ['href', 'id', 'name', 'duration_ms', 'preview_url', 'uri', 'type', 'popularity']),
    artists: track.artists.map(serializeArtistObj),
  }
}

export const serializeTracks = (tracks: SpotifyApi.UsersRecentlyPlayedTracksResponse) => {
  return {
    items: tracks.items.map(({ track, played_at }) => {
      return {
        played_at,
        ...serializeTrack(track),
      }
    }),
    total: tracks.total,
    cursors: tracks.cursors,
  }
}
