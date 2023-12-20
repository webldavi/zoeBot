const db = require("../database")

const createUserMoneyTable = () => {
  return {
    up() {
      const query = `CREATE TABLE tb_users_money(id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT, user_money INT,  guild_id TEXT)`
      db.run(query)
    },
    down() {
      const query = "DROP TABLE tb_users_money"
      db.run(query)
    }
  }
}

module.exports = createUserMoneyTable