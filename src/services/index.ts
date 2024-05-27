import dbs from "../config/connections"
import fs from "fs"
const csv = require("csv-parser")

const insertData = async (
  data: any,
  nomeFundo: any,
  codFundo: any,
  cota: any
) => {
  const query = `
    INSERT INTO cotas (data, fundo, cod, cota)
    VALUES ($1, $2, $3, $4);
  `
  await dbs.clientPostgres.query(query, [data, nomeFundo, codFundo, cota])
}

const dropTable = async () => {
  await dbs.clientPostgres.query("DROP TABLE COTAS")
  console.log("Tabela deletada")
}

const createTable = async () => {
  await dbs.clientPostgres.query(`
    CREATE TABLE IF NOT EXISTS cotas (
      data DATE,
      fundo VARCHAR(255),
      cod VARCHAR(255),
      cota DECIMAL(15, 10)
    );
  `)
  console.log("Tabela recriada")
}

const processCSV = async (filePath: any) => {
  return new Promise(async (resolve, reject) => {
    await dropTable()
    await createTable()

    const results: any = []
    let rowNumber = 0
    const fundos: any = []
    const codFundos: any = []

    fs.createReadStream(filePath)
      .pipe(csv({ headers: false, separator: "," }))
      .on("data", async (row: any) => {
        rowNumber++
        if (rowNumber === 1) {
          // Ler a linha de nomes dos fundos
          for (let i = 0; i < 60; i++) {
            fundos.push(row[i])
          }
        } else if (rowNumber === 2) {
          // Ler a linha de códigos dos fundos
          for (let i = 0; i < 60; i++) {
            codFundos.push(row[i])
          }
        } else if (rowNumber > 2) {
          // Processar as linhas de dados
          const date = row[0]
          for (let i = 1; i < 60; i++) {
            if (row[i]) {
              const cota = row[i].replace(",", ".")
              await insertData(
                date,
                fundos[i - 1],
                codFundos[i - 1],
                parseFloat(cota)
              )
            }
          }
        }
      })
      .on("end", () => {
        console.log("CSV file successfully processed and data inserted")
        resolve(true)
      })
      .on("error", (error: any) => {
        console.error(`Error reading CSV file: ${error.message}`)
      })
  })
}

export { processCSV }
