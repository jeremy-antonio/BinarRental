import knex from "knex";

const knexInstance = knex({
  client: "postgresql",
  connection: {
    host: "localhost",
    database: "car_db",
    user: "postgres",
    password: "jeremy1020",
  },
});

export default knexInstance;
