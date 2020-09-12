import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Spotify extends BaseSchema {
  protected tableName = 'spotify'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('spotify_id')
      table.string('display_name')
      table.string('country')
      table.string('email')
      table.integer('followers').defaultTo(0)
      table.string('followers_href').nullable()
      table.string('type')
      table.string('uri')
      table.string('spotify_href')
      table.string('image')
      table.string('product')
      table.dateTime('birthdate')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
