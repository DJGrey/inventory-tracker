import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReadAllStaffDto, ReadStaffDto } from 'src/app/models/read_staff.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getStaff(): Observable<ReadAllStaffDto> {
    return this.http.get<any>('/staff');
  }
}
