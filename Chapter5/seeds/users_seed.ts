import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    { id: 1, name: "Rafid", email: "rafid@gmail.com", role: "Admin", password: "rafid123", profile_picture_url: "rafid.png" },
    { id: 2, name: "Ikhroma", email: "ikhroma@gmail.com", role: "User", password: "ikhroma123", profile_picture_url: "ikhroma.png" },
    { id: 3, name: "Brilly", email: "brilly@gmail.com", role: "User", password: "brilly123", profile_picture_url: "brilly.png" },
  ]);
}
