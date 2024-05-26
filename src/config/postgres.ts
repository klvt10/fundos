import { Pool } from "pg"

class Postgres {
  async connect() {
    const psql = new Pool({
      host: process.env.PST_HOST,
      port: Number(process.env.PST_PORT),
      user: process.env.PST_USER,
      password: process.env.PST_PASS,
      database: process.env.PST_NAME,
      keepAlive: true,
      connectionTimeoutMillis: 600000,
      idleTimeoutMillis: 600000,
    })

    return psql
  }
}

export default Postgres
