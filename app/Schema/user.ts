import { schema, rules } from '@ioc:Adonis/Core/Validator'

const table = 'users'

export const registerSchema = schema.create({
  username: schema.string({}, [
    rules.minLength(6),
    rules.maxLength(20),
    rules.regex(/[A-Za-z0-9_]/),
    rules.unique({ table, column: 'username' }),
  ]),
  name: schema.string.optional({}, [rules.minLength(2)]),
  password: schema.string({}, [
    rules.minLength(6),
    rules.maxLength(20),
    rules.confirmed(),
  ]),
  email: schema.string({}, [
    rules.email(),
    rules.unique({ table, column: 'email' }),
  ]),
})
