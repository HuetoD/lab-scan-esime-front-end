import { Injectable } from '@angular/core';
import { AttendanceResponse } from '../types';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly API = `${environment.api_url}/admin`;

  constructor(private http: HttpClient) {}

  public generateTemplate(
    subject_lab_id: number
  ): Observable<AttendanceResponse> {
    return this.http.get<AttendanceResponse>(`${this.API}/generate_template`, {
      params: { subject_lab_id },
    });
  }
}
