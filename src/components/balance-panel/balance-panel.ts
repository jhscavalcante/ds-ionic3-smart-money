import { Component, Input } from "@angular/core";

@Component({
  selector: "balance-panel",
  templateUrl: "balance-panel.html"
})
export class BalancePanelComponent {
  @Input() currentBalance: number;

  constructor() {}
}
