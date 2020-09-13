import { pick } from 'lodash'

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
    total: tracks.total,
    limit: tracks.limit,
    next: tracks.next,
    previous: tracks.previous,
  }
}

export const serializePlaylists = (playlists: SpotifyApi.ListOfCurrentUsersPlaylistsResponse) => {
  return {
    items: playlists.items,
    total: playlists.total,
    next: playlists.next,
    previous: playlists.previous,
    limit: playlists.limit,
  }
}
