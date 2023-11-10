import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.bigIncrements("id").primary();
    table.string("name", 30).notNullable();
    table.string("price", 30).notNullable();
    table.text("car_foto_url");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
