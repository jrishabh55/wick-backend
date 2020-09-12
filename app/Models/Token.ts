import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: 'spotify' | 'netflix'

  @column()
  public token: string

  @column()
  public user_id: number

  @column()
  public access_token: string

  @column()
  public refresh_token: string

  @column()
  public expires_in: number

  @column()
  public token_type: string

  @column()
  public scope: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
