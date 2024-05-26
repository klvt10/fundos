import express from "express"
import cors from "cors"
import routes from "./routes"

class App {
  server: any
  constructor() {
    this.server = express()
    this.server.set("views", __dirname + "/views")
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(express.json({ limit: "50mb" }))
    this.server.use(
      cors({
        origin: ["http://localhost:3000", "https://app.tradespy.com.br"],
      })
    )
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server
