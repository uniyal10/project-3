import { Client } from "pg"

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "123",
  port: 5432
})

client.connect()
export default client
