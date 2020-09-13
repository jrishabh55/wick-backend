import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import spotifyApi from 'start/spotify'

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

  public async getCredentials () {
    const { accessToken, refreshToken } = this
    if (this.type === 'spotify') {
      const interval = this.updatedAt.diffNow('minutes').minutes

      if (interval + this.expiresIn >= 0) {
        return {
          accessToken,
          refreshToken,
        }
      }

      spotifyApi.setCredentials({ accessToken: this.accessToken, refreshToken: this.refreshToken })
      const tokenRes = (await spotifyApi.refreshAccessToken()).body
      this.accessToken = tokenRes.access_token
      this.expiresIn = tokenRes.expires_in
      this.scope = tokenRes.scope
      this.tokenType = tokenRes.token_type
      await this.save()

      return {
        accessToken: tokenRes.access_token,
        refreshToken: this.refreshToken,
      }
    }

    return {
      accessToken,
      refreshToken,
    }
  }
}
