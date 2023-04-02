import { Component } from '@angular/core';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Inventory Tracker';

  staffId?: number;

  constructor(private api: ApiService) {}

  setStaffId(event: number) {
    this.staffId = event;
  }
}
