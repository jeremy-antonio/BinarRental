import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.unique(["username", "email"]);
    table.bigIncrements("id").primary();
    table.string("username", 30).notNullable();
    table.string("email", 30).notNullable();
    table.text("password").notNullable();
    table.enum("role", ["ADMIN", "SUPERADMIN"]).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
