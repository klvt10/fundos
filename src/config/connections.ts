import Postgres from "./postgres"

let postgres = new Postgres()

class Connections {
  clientPostgres: any

  constructor() {
    this.clientPostgres
  }

  async connect(callback: any) {
    let connected = false
    let attempt = 1
    const maxAttempts = 5

    while (!connected && attempt < maxAttempts) {
      try {
        this.clientPostgres = await postgres.connect()
        connected = true
      } catch (error) {
        console.log("Ainda nao conectou com postgres", error)
        attempt++
      }
    }

    if (!connected) {
      console.error(
        "Não foi possível se conectar ao banco de dados após",
        maxAttempts,
        "tentativas"
      )
    } else {
      console.log(
        `Conectado com sucesso ao Postgres após ${attempt} tentativas`
      )
    }

    return callback(true)
  }
}

const dbs = new Connections()

export default dbs
