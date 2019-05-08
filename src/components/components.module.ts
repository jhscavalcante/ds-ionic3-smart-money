import { NgModule } from "@angular/core";
import { BalancePanelComponent } from "./balance-panel/balance-panel";

import { IonicPageModule } from "ionic-angular";

@NgModule({
  declarations: [BalancePanelComponent],
  imports: [IonicPageModule],
  exports: [BalancePanelComponent]
})
export class ComponentsModule {}
