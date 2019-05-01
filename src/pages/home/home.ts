import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { NewEntryPage } from "../new-entry/new-entry";

import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  dados = [];

  constructor(public navCtrl: NavController, public sqlite: SQLite) {}

  addEntry() {
    console.log("Adicionar Lançamento");
    this.navCtrl.push(NewEntryPage); // abre uma tela
  }

  addData() {
    console.log("Início do Teste DB");

    this.sqlite
      .create({
        name: "data.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        console.log("DB criado");

        const sql = "SELECT * FROM entries;";
        const data = [];

        return db
          .executeSql(sql, data)
          .then((values: any) => {
            let registro;
            let info;

            for (var i = 0; i < values.rows.length; i++) {
              registro = values.rows.item(i);

              console.log(JSON.stringify(registro));
              info = registro["description"] + ": " + registro["amount"];
              this.dados.push(info);
            }
          })
          .catch(e =>
            console.error(
              "erro ao buscar registros na tabela",
              JSON.stringify(e)
            )
          );
      });
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

        this.createTable(db).then(() => {
          console.log("Tabelas criadas");

          this.select(db).then((values: any) => {
            for (var i = 0; i < values.rows.length; i++) {
              console.log(JSON.stringify(values.rows.item(i)));
            }

            this.balance(db).then((values: any) => {
              if (values.rows.length > 0) {
                const item = values.rows.item(0);
                console.log("Saldo atual: ", JSON.stringify(item.balance));
              }
            });
          });
        });
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

  balance(db) {
    const sql = "SELECT sum(amount) as balance FROM entries;";
    const data = [];

    return db
      .executeSql(sql, data)
      .catch(e =>
        console.error("erro ao buscar o balance na tabela", JSON.stringify(e))
      );
  }
}
