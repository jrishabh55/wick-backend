import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class NetflixData extends BaseSchema {
  protected tableName = 'netflix_data'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.date('last_watched')
      table.integer('user_id')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
