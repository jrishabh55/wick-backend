import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Token from './Token'
import Spotify from './Spotify'
import Connection from './Connection'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name?: string

  @column()
  public username: string

  @column()
  public photo?: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @hasMany(() => Token)
  public token: HasMany<typeof Token>

  @hasMany(() => Connection)
  public connection: HasMany<typeof Connection>

  @hasOne(() => Spotify)
  public spotify: HasOne<typeof Spotify>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
    if (user.$dirty.username) {
      user.username = user.username.toLocaleLowerCase()
    }
  }
}
