import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "myLocation.sqlite";

const SQL_CREATE = `
  CREATE TABLE IF NOT EXISTS locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
  );
`;

let db = null;

// Abre (ou reaproveita) a conexão com o banco.
// Na primeira abertura, cria as tabelas caso ainda não existam.
export default function openDB() {
  if (!db) {
    db = SQLite.openDatabaseSync(DATABASE_NAME);

    db.withTransactionSync(() => {
      db.execSync(SQL_CREATE);
    });
  }

  return db;
}
