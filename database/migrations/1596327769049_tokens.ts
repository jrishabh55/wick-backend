import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tokens extends BaseSchema {
  protected tableName = 'tokens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('type', ['spotify', 'netflix']).notNullable()
      table.text('access_token').notNullable()
      table.text('refresh_token').nullable()
      table.text('expires_in').nullable()
      table.text('token_type').nullable()
      table.text('scope').nullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
