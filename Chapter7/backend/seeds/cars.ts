import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      name: "Avanza",
      rent_per_day: "100",
      size: "M",
      car_picture_url: "car.jpg",
      created_by: "1",
      created_at: knex.fn.now(),
    },
    {
      name: "Honda",
      rent_per_day: "200",
      size: "L",
      car_picture_url: "car.jpg",
      created_by: "1",
      created_at: knex.fn.now(),
    },
  ]);
}
