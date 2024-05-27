import path from "path"
import { Router } from "express"
import { processCSV } from "../services"

const router = Router()

const filePath = path.join(__dirname, "..", "files", "quotes.csv")

router.use("/getquotes", async (req, res) => {
  await processCSV(filePath)

  res.json("Banco de dados atualizado")
})

export default router
