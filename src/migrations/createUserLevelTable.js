const db = require("../database")

const createUserLevelTable = () => {
  return {
    up() {
      const query = `CREATE TABLE
      tb_users_level (id INTEGER PRIMARY KEY AUTOINCREMENT,
                      user_id TEXT, guild_id, xp_qty INT, level INT)`
      db.run(query)
    },
    down() {
      const query = "DROP TABLE tb_users_level"
      db.run(query)
    }
  }
}

module.exports = createUserLevelTable