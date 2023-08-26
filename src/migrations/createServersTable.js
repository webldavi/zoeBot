const db = require("../database")

const createServerTable = () => {
  return {
    up() {
      const query = `CREATE TABLE
        tb_servers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          server_id INTEGER,
          name TEXT,
          welcome_channel INT
        )`
      db.run(query)
      
    },
    down() {
      const query = "DROP TABLE tb_servers"
      db.run(query)
    }
  }
}

module.exports = createServerTable