import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      username: "superadmin",
      email: "superadmin@gmail.com",
      password: "super123",
      role: "SUPERADMIN",
    },
    {
      username: "admin",
      email: "admin@gmail.com",
      password: "admin123",
      role: "ADMIN",
    },
  ]);
}
