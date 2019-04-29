import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { NewEntryPage } from "../new-entry/new-entry";

import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController, public sqlite: SQLite) {}

  addEntry() {
    console.log("Adicionar Lançamento");
    this.navCtrl.push(NewEntryPage); // abre uma tela
  }

  testeDb() {
    console.log("Início do Teste DB");

    this.sqlite
      .create({
        name: "data.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        console.log("DB criado");

        db.sqlBatch([
          [
            "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, amount DECIMAL, description TEXT)"
          ],
          [
            "INSERT INTO entries (amount, description) VALUES (?, ?)",
            [12, "teste 12"]
          ],
          [
            "INSERT INTO entries (amount, description) VALUES (?, ?)",
            [13, "teste 13"]
          ],
          ["UPDATE entries set amount = ? WHERE id = ?", [3, 10]]
        ])
          .then(() => {
            this.select(db).then((values: any) => {
              console.log(values.rows.length);
              console.log("select do sqlBatch");

              for (var i = 0; i < values.rows.length; i++) {
                console.log(JSON.stringify(values.rows.item(i)));
              }
            });
          })
          .catch(e =>
            console.error(
              "erro ao executar lote (sqlBatch) de processamento",
              JSON.stringify(e)
            )
          );

        /*
        this.createTable(db).then(() => {
          console.log("Tabelas criadas");

          const v1 = 99.2;
          const v2 = "Teste 4";

          this.insert(db, v1, v2).then(() => {
            console.log("Valores inseridos");

            this.select(db).then((values: any) => {
              console.log(values.rows.length);
              console.log("select 1");

              for (var i = 0; i < values.rows.length; i++) {
                console.log(JSON.stringify(values.rows.item(i)));
              }

              this.update(db, 999, "alterado", 5).then(() => {
                this.select(db).then((values: any) => {
                  console.log(values.rows.length);
                  console.log("select 2");

                  for (var i = 0; i < values.rows.length; i++) {
                    console.log(JSON.stringify(values.rows.item(i)));
                  }

                  this.delete(db, 6).then(() => {
                    this.select(db).then((values: any) => {
                      console.log(values.rows.length);
                      console.log("select 3");

                      for (var i = 0; i < values.rows.length; i++) {
                        console.log(JSON.stringify(values.rows.item(i)));
                      }
                    });
                  });
                });
              });
            });
          });
        });
        */
      })
      .catch(() => {
        console.error("Erro ao criar o BD.");
      });
  }

  createTable(db) {
    console.log("DB criado");

    return db
      .sqlBatch([
        "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, amount DECIMAL, description TEXT)"
      ])
      .catch(e => console.error("erro ao criar a tabela", JSON.stringify(e)));
  }

  insert(db, v1, v2) {
    const sql = "INSERT INTO entries (amount, description) VALUES (?, ?)";
    const data = [v1, v2];

    return db
      .executeSql(sql, data)
      .catch(e =>
        console.error("erro ao inserir na tabela", JSON.stringify(e))
      );
  }

  update(db, v1, v2, id) {
    const sql = "UPDATE entries set amount = ?, description = ? WHERE id = ?";
    const data = [v1, v2, id];

    return db
      .executeSql(sql, data)
      .catch(e =>
        console.error("erro ao atualizar registro na tabela", JSON.stringify(e))
      );
  }

  delete(db, id) {
    const sql = "DELETE FROM entries WHERE id = ?";
    const data = [id];

    return db
      .executeSql(sql, data)
      .catch(e =>
        console.error("erro ao excluir registro na tabela", JSON.stringify(e))
      );
  }

  select(db) {
    const sql = "SELECT id, amount, description FROM entries;";
    const data = [];

    return db
      .executeSql(sql, data)
      .catch(e =>
        console.error("erro ao buscar registros na tabela", JSON.stringify(e))
      );
  }
}
