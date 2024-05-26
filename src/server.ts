require("dotenv/config")

import app from "./app"
import dbs from "./config/connections"

console.log("NODE_ENV: ", process.env.NODE_ENV)

dbs.connect(async () => {
  console.log("Bancos conectados")
})

app.listen(process.env.APP_PORT, async () => {
  console.log(
    `O serviço ST-BACK está rodando em http://localhost:${process.env.APP_PORT}.`
  )
})

process.on("uncaughtException", async (err) => {
  console.log("Uncaught Exception: ", err)
  process.exit(1)
})
