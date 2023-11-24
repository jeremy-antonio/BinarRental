import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    { name: "Avanza", price: "100", car_foto_url: "car.jpg" },
    { name: "BMW", price: "200", car_foto_url: "car.jpg" },
    { name: "Honda", price: "300", car_foto_url: "car.jpg" },
    { name: "Toyota", price: "400", car_foto_url: "car.jpg" },
    { name: "Suzuki", price: "500", car_foto_url: "car.jpg" },
  ]);
}
