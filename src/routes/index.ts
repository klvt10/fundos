import path from "path"
import { Router } from "express"
import { processCSV } from "../services"

const router = Router()

const filePath = path.join(__dirname, "..", "files", "quotes.csv")

router.use("/getquotes", (req, res) => {
  const response = processCSV(filePath)

  res.json(response)
})

export default router
