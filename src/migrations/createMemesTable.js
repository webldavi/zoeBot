const db = require("../database")

const createMemesTable = () => {
  return {
    up() {
      const query = `CREATE TABLE
        tb_memes (url TEXT)`
      db.run(query)
    },
    down() {
      const query = "DROP TABLE tb_memes"
      db.run(query)
    }
  }
}

module.exports = createMemesTable