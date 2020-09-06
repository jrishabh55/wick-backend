import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Spotify extends BaseSchema {
  protected tableName = 'spotify'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('spotify_id').unique()
      table.string('name')
      table.string('email').unique()
      table.integer('followers')
      table.string('followers_href').nullable()
      table.string('type')
      table.string('uri')
      table.string('spotify_href')
      table.string('image')
      table.enum('product', ['premium', 'free'])
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
