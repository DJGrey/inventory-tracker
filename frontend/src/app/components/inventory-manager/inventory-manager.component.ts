import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inventory-manager',
  templateUrl: './inventory-manager.component.html',
  styleUrls: ['./inventory-manager.component.scss'],
})
export class InventoryManagerComponent {
  @Input() staffId!: number;
}
