import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { NewEntryPage } from "../new-entry/new-entry";

import { DatabaseProvider } from "../../providers/database/database";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  entries = [];

  constructor(
    public navCtrl: NavController,
    public database: DatabaseProvider
  ) {}

  ionViewDidEnter() {
    this.loadData();
  }

  addEntry() {
    this.navCtrl.push(NewEntryPage); // abre a tela (Adicionar Lançamentos)
  }

  loadData() {
    console.log("Início do Teste DB");

    const sql = "SELECT * FROM entries;";
    const data = [];

    return this.database.db
      .executeSql(sql, data)
      .then((values: any) => {
        let data;
        this.entries = [];

        for (var i = 0; i < values.rows.length; i++) {
          data = values.rows.item(i);
          console.log(JSON.stringify(data));
          this.entries.push(data); // passando um objeto para o array
        }
      })
      .catch(e =>
        console.error(
          "[ENTRIES] erro ao buscar registros na tabela",
          JSON.stringify(e)
        )
      );
  }

  /*
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
  */
}
