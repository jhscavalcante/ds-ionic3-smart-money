import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { DatabaseProvider } from "../../providers/database/database";

@IonicPage()
@Component({
  selector: "page-new-entry",
  templateUrl: "new-entry.html"
})
export class NewEntryPage {
  categories = [];
  entryForm: FormGroup;

  entry = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public database: DatabaseProvider,
    private builder: FormBuilder
  ) {
    this.entryForm = builder.group({
      amount: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9,.]+")
        ])
      ),
      category_id: new FormControl("", Validators.required)
    });
  }

  ionViewDidLoad() {
    this.loadData();
  }

  submitForm() {
    console.log("Enviando dados...");
    console.log(JSON.stringify(this.entry));

    this.insertBD();

    this.navCtrl.pop();
  }

  goBack() {
    console.log("Cancelando...");
    this.navCtrl.pop(); //fecha a tela
  }

  loadData() {
    console.log("Início do Teste DB");

    const sql = "SELECT * FROM categories;";
    const data = [];

    return this.database.db
      .executeSql(sql, data)
      .then((values: any) => {
        let data;
        this.categories = [];

        for (var i = 0; i < values.rows.length; i++) {
          data = values.rows.item(i);
          console.log(JSON.stringify(data));
          this.categories.push(data); // passando um objeto para o array
        }
      })
      .catch(e =>
        console.error(
          "[ENTRIES] erro ao buscar registros na tabela",
          JSON.stringify(e)
        )
      );
  }

  insertBD() {
    console.log("Início da gravação do BD");

    const sql = "INSERT INTO entries (amount, entry_at) VALUES (?, ?)";
    const data = [this.entry["amount"], 1];

    return this.database.db
      .executeSql(sql, data)
      .then(() => console.log("[ENTRIES] insert realizado com sucesso"))
      .catch(e =>
        console.error("[ENTRIES] erro ao inserir na tabela", JSON.stringify(e))
      );
  }
}
