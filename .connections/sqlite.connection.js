const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { join } = require("path");

class SqliteDb {
  static _instance;

  connectionContact;
  connectionDapobudLocal;
  connectionDapobudServer;

  constructor() {
    Promise.all([
      open({
        filename: join(process.cwd(), "databases", "contact.sqlite"),
        driver: sqlite3.Database,
      }),
      open({
        filename: join(process.cwd(), "databases", "dapobud-local.sqlite"),
        driver: sqlite3.Database,
      }),
      open({
        filename: join(process.cwd(), "databases", "dapobud-server.sqlite"),
        driver: sqlite3.Database,
      }),
    ]).then(([connContact, connDapobudLocal, connDapobudServer]) => {
      this.connectionContact = connContact;
      this.connectionDapobudLocal = connDapobudLocal;
      this.connectionDapobudServer = connDapobudServer;
    });
  }

  static getInstance() {
    if (!SqliteDb._instance) {
      SqliteDb._instance = new SqliteDb();
    }
    return SqliteDb._instance;
  }
}

module.exports = SqliteDb;
