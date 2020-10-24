import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import spotifyApi from 'start/spotify'

interface CardType {
  type: string
  title: string
  subTitle: string
  footer: string
  items: {
    name: string
    description: string | null
  }[]
}

export default class UsersController {
  public async cards ({ auth }: HttpContextContract) {
    await auth.authenticate()
    const user = auth.user
    if (!user) {
      return
    }

    const cards: Record<string, any>[] = []

    await user.preload('token')

    const spotifyObj = user.token.find((tk) => tk.type === 'spotify')
    if (spotifyObj) {
      spotifyApi.setCredentials(await spotifyObj.getCredentials())

      const data = await spotifyApi.getUserPlaylists()

      const playlists = data.body

      const playlistCard: CardType = {
        type: 'hero-list',
        title: 'My Playlists',
        subTitle: 'Playlist Most played',
        footer: 'Made with Wick',
        items: playlists.items.map((it) => ({
          name: it.name,
          description: it.description,
          images: it.images,
        })),
      }

      cards.push(playlistCard)

      const {
        body: recentSongsData,
      } = await spotifyApi.getMyRecentlyPlayedTracks()

      const recentSongsCard: CardType = {
        type: 'basic-list-20',
        title: 'Most Recent 20',
        subTitle: '',
        footer: 'Made with Wick',
        items: recentSongsData.items.map((item) => {
          const artists = item.track.artists
            .map((artist) => artist.name)
            .join(', ')

          const {
            album,
          }: {
            album: SpotifyApi.AlbumObjectSimplified
          } = (item as any).track

          return {
            name: item.track.name,
            description: `${artists} / ${album.name}`,
            images: album.images,
          }
        }),
      }

      cards.push(recentSongsCard)
    }

    // const netflixObj = user.token.find((tk) => tk.type === 'netflix')

    return { status: 'success', data: { cards } }
  }
}
