import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    { id: 1, name: "Avanza", price: "100", car_foto_url: "car.jpg" },
    { id: 2, name: "BMW", price: "200", car_foto_url: "car.jpg" },
    { id: 3, name: "Honda", price: "300", car_foto_url: "car.jpg" },
    { id: 4, name: "Toyota", price: "400", car_foto_url: "car.jpg" },
    { id: 5, name: "Suzuki", price: "500", car_foto_url: "car.jpg" },
  ]);
}
