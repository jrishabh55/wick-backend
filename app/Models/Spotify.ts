import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Spotify extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public spotify_id: string

  @column()

  public email: string

  @column()
  public followers: string

  @column()
  public followers_href: string

  @column()
  public type: string

  @column()
  public uri: string

  @column()
  public spotify_href: string

  @column()
  public image: string

  @column()
  public product: 'premium' | 'free'

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
