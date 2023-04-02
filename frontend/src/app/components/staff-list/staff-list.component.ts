import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent {
  constructor(private api: ApiService) {}

  @Output() select: EventEmitter<number> = new EventEmitter();

  staffList = this.api.getStaff();
}
