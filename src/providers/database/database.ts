import { Injectable } from "@angular/core";

import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Injectable()
export class DatabaseProvider {
  private dbConnection: SQLiteObject;

  constructor(public sqlite: SQLite) {
    this.initDB();
  }

  get db(): SQLiteObject {
    return this.dbConnection;
  }

  private initDB() {
    console.log("init db");

    this.sqlite
      .create({
        name: "data.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        this.dbConnection = db;
        console.log("bd criado");

        //this.dropTables();
        this.createTables();
      })
      .catch(e =>
        console.error("erro ao inicializar banco de dados", JSON.stringify(e))
      );
  }

  private createTables() {
    console.log("creating tables...");
    this.dbConnection
      .sqlBatch([
        [
          "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, color CHARACTER(9) default '#ffffff', is_default BOOLEAN);"
        ],
        [
          "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, amount DECIMAL NOT NULL, description TEXT, entry_at DATETIME NOT NULL, is_init BOOLEAN, category_id INTEGER);"
        ]
      ])
      .then(() => {
        console.log("tabelas criadas com sucesso");
        this.loadRecords();
      })
      .catch(e => console.error("erro ao criar tabelas", JSON.stringify(e)));
  }

  private loadRecords() {
    console.log("loading default data ...");

    this.dbConnection
      .executeSql("SELECT COUNT(id) AS qtd FROM categories", [])
      .then((data: any) => {
        console.log("QTDE categories", data.rows.item(0).qtd);

        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {
          this.dbConnection
            .sqlBatch([
              ["INSERT INTO categories (name) values (?)", ["Categoria 1"]],
              ["INSERT INTO categories (name) values (?)", ["Categoria 2"]],
              ["INSERT INTO categories (name) values (?)", ["Categoria 3"]]
            ])
            .then(() => console.log("categories default inseridas"))
            .catch(e =>
              console.error(
                "error ao inserir categories default",
                JSON.stringify(e)
              )
            );
        }
      })
      .catch(e =>
        console.error(
          "error ao obter a quantidade de categories",
          JSON.stringify(e)
        )
      );
  }

  /*
  private dropTables() {
    this.dbConnection
      .sqlBatch([["DROP TABLE entries;"], ["DROP TABLE categories;"]])
      .then(() => console.log("tabelas excluídas com sucesso"))
      .catch(e => console.error("erro ao excluir tabelas", JSON.stringify(e)));
  }
  */
}
