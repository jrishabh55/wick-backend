import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { ModelAttributes } from '@ioc:Adonis/Lucid/Model'

interface SpotifyMe {
  id: string
  external_urls: {
    spotify: string
  },
  followers?: {
    href: string | null,
    total: number
  },
  images?: {
    height?: number
    url: string
    width?: number
  }[],
  explicit_content: any
  href: string
}

export default class Spotify extends BaseModel {
  public static table = 'spotify'

  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public displayName: string

  @column()
  public country: string

  @column()
  public birthdate: DateTime

  @column()
  public spotifyId: string

  @column()

  public email: string

  @column()
  public followers: number

  @column()
  public followersHref: string

  @column()
  public type: string

  @column()
  public uri: string

  @column()
  public spotifyHref: string

  @column()
  public image: string

  @column()
  public product: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static prepCreate (data: Partial<SpotifyMe & Spotify>) {
    const {
      external_urls: externalUrls,
      href,
      explicit_content: eC,
      followers,
      images = [],
      id,
      ...spotifyUser
    } = data

    return {
      ...spotifyUser,
      spotifyId: id,
      image: images[0]?.url,
      followers: followers?.total || 0,
      followersHref: followers?.href || null,
      spotifyHref: href,
    }
  }

  public static async create (data: Partial<SpotifyMe & Spotify>) {
    return super.create(this.prepCreate(data)) as any
  }

  public static async updateOrCreate (search: Partial<ModelAttributes<Spotify>>, data: Partial<SpotifyMe & Spotify>) {
    return super.updateOrCreate(search, this.prepCreate(data)) as any
  }
}
