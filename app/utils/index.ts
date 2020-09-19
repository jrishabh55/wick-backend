import { pick } from 'lodash'

const serializePaginationItems = (item: object, extra: string[] = []) => {
  return pick(item, ['total', 'limit', 'next', 'previous', ...extra])
}

export const serializeArtistObj = (artist: SpotifyApi.ArtistObjectSimplified) => {
  return pick(artist, ['href', 'id', 'name', 'uri', 'type'])
}

export const serializeTrack = (track: SpotifyApi.TrackObjectSimplified) => {
  return {
    ...pick(track, ['href', 'id', 'name', 'duration_ms', 'preview_url', 'uri', 'type', 'popularity', 'added_by']),
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

export const serializePlaylistTrackResponse = (tracks: SpotifyApi.PlaylistTrackResponse) => {
  return {
    items: tracks.items.map(({ track }) => {
      return {
        ...serializeTrack(track),
      }
    }),
    ...serializePaginationItems(tracks),
  }
}

export const serializePlaylists = (playlists: SpotifyApi.ListOfCurrentUsersPlaylistsResponse) => {
  return serializePaginationItems(playlists, ['total', 'limit', 'next', 'previous', 'items'])
}
