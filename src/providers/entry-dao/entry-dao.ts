import { Injectable } from "@angular/core";
import { DatabaseProvider } from "../database/database";

@Injectable()
export class EntryDaoProvider {
  constructor(public database: DatabaseProvider) {}

  insert(amount, category_id) {
    const sql =
      "INSERT INTO entries (amount, entry_at, category_id) VALUES (?, ?, ?)";
    const data = [amount, 1, category_id];

    return this.database.db
      .executeSql(sql, data)
      .catch(e =>
        console.error("[ENTRIES] erro ao inserir", JSON.stringify(e))
      );
  }

  update(entry, id) {
    const sql = "UPDATE entries set amount = ?, category_id = ? WHERE id = ?";
    const data = [entry["amount"], entry["category_id"], id];

    return this.database.db
      .executeSql(sql, data)
      .catch(e =>
        console.error("[ENTRIES] erro ao atualizar", JSON.stringify(e))
      );
  }

  delete(id) {
    const sql = "DELETE FROM entries WHERE id = ?";
    const data = [id];

    return this.database.db
      .executeSql(sql, data)
      .catch(e =>
        console.error("[ENTRIES] erro ao excluir", JSON.stringify(e))
      );
  }

  deleteAll() {
    const sql = "DELETE FROM entries";
    const data = [];

    return this.database.db
      .executeSql(sql, data)
      .catch(e =>
        console.error(
          "[ENTRIES] erro ao excluir todos os dados",
          JSON.stringify(e)
        )
      );
  }

  get(id) {
    const sql = "SELECT * FROM entries WHERE id = ?";
    const data = [id];

    return this.database.db
      .executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          const item = data.rows.item(0);
          return item;
        }

        return null;
      })
      .catch(e => console.error("[ENTRIES] erro no get", JSON.stringify(e)));
  }

  getAll() {
    const sql = "SELECT * FROM entries ORDER BY entry_at";
    const data = [];

    return this.database.db
      .executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          let entries: any[] = [];

          for (var i = 0; i < data.rows.length; i++) {
            const item = data.rows.item(i);
            entries.push(item);
          }
          return entries;
        }

        return null;
      })
      .catch(e => console.error("[ENTRIES] erro no getAll", JSON.stringify(e)));
  }

  getBalance() {
    const sql = "SELECT SUM(amount) AS balance FROM entries";
    const data = [];

    return this.database.db
      .executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0) {
          const item = data.rows.item(0);
          return item.balance;
        }

        return null;
      })
      .catch(e =>
        console.error("[ENTRIES] erro no getBalance", JSON.stringify(e))
      );
  }
}
