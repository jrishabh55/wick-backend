import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Netflix extends BaseModel {
  public static table = 'netflix_data'

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column({ columnName: 'last_watched' })
  public lastWatched: DateTime

  @column({ serializeAs: null })
  public user_id: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
