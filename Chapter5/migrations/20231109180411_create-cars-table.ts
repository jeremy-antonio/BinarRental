import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.bigIncrements("id").primary();
    table.string("name", 30).notNullable();
    table.string("price", 30).notNullable();
    table.text("car_foto_url");
    table.bigInteger("created_by_id");
    table.bigInteger("updated_by_id");
    table.bigInteger("deleted_by_id");
    table.timestamp("deleted_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
