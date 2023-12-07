import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.bigIncrements("id").primary();
    table.string("name", 30).notNullable();
    table.bigInteger("rent_per_day").notNullable();
    table.enum("size", ["S", "M", "L"]).notNullable();
    table.text("car_picture_url").notNullable();
    table.bigInteger("created_by").notNullable();
    table.bigInteger("updated_by").nullable();
    table.bigInteger("deleted_by").nullable();
    table.timestamp("created_at").notNullable();
    table.timestamp("updated_at").nullable();
    table.timestamp("deleted_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
