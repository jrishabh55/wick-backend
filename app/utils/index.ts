import { pick } from 'lodash'

export const serializeTracks = (tracks: SpotifyApi.UsersRecentlyPlayedTracksResponse) => {
  return {
    total: tracks.total,
    cursors: tracks.cursors,
    items: tracks.items.map(({ track, played_at }) => {
      return {
        played_at,
        artists: track.artists.map(artist => pick(artist, ['href', 'id', 'name', 'uri', 'type'])),
        ...pick(track, ['href', 'id', 'name', 'duration_ms', 'preview_url', 'uri', 'type', 'popularity']),
      }
    }),
  }
}
