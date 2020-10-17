import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Connections extends BaseSchema {
  protected tableName = 'connections'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.string('service_name')
      table.dateTime('last_sync')
      table.boolean('connected')
      table.string('status')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  };
}
