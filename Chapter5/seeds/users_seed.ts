import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    { name: "Super Admin", email: "superadmin@gmail.com", role: "super admin", password: "super123", profile_picture_url: "super.png" },
    { name: "Admin", email: "admin@gmail.com", role: "admin", password: "admin123", profile_picture_url: "admin.png" },
    { name: "User", email: "user@gmail.com", role: "user", password: "user123", profile_picture_url: "user.png" },
  ]);
}
