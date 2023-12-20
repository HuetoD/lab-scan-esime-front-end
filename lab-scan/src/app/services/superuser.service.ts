import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminDTO } from '../types';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'any' })
export class SuperUserService {
  private readonly BASE_URL_API = `${environment.api_url}/superuser`;

  constructor(private readonly http: HttpClient) {}

  ping(): Observable<string> {
    return this.http.get(`${this.BASE_URL_API}/ping`, { responseType: 'text' });
  }

  loadAdmins(): Observable<AdminDTO[]> {
    return this.http
      .get<AdminDTO[]>(`${this.BASE_URL_API}/load-admins`)
      .pipe(
        tap((admins) =>
          admins.forEach((admin) => (admin.password = '********'))
        )
      );
  }

  addAdmin(admin: AdminDTO): Observable<AdminDTO> {
    return this.http.post<AdminDTO>(`${this.BASE_URL_API}/add-admin`, admin);
  }

  removeAdmin(admin: AdminDTO): Observable<void> {
    return this.http.delete<void>(
      `${this.BASE_URL_API}/remove-admin/${admin.admin_id}`
    );
  }

  updateAdmin(admin : AdminDTO): Observable<AdminDTO>{
    return this.http.put<AdminDTO>(`${this.BASE_URL_API}/update-admin`, admin)
  }
}
