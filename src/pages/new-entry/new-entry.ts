import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

import { CategoryDaoProvider } from "../../providers/category-dao/category-dao";
import { AccountProvider } from "../../providers/account/account";

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
    public account: AccountProvider,
    public categoryDao: CategoryDaoProvider,
    private builder: FormBuilder
  ) {
    this.entryForm = this.builder.group({
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
    this.categoryDao.getAll().then((data: any[]) => {
      this.categories = data;
      console.log("categories", JSON.stringify(this.categories));
    });
  }

  insertBD() {
    this.account
      .addEntry(this.entry["amount"], this.entry["category_id"])
      .then(() => {
        console.log("[ENTRIES] insert realizado com sucesso");
      });
  }
}
