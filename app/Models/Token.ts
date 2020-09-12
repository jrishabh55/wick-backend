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
  public userId: number

  @column()
  public accessToken: string

  @column()
  public refreshToken: string

  @column()
  public expiresIn: number

  @column()
  public tokenType: string

  @column()
  public scope: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public getCredentials () {
    const { accessToken, refreshToken } = this
    return {
      accessToken,
      refreshToken,
    }
  }
}
