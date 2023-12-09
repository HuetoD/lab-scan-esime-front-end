import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StudentBase } from "./../types/index";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'any' })
export class StudentService {

    constructor(private readonly http: HttpClient) {

    }

    findStudent(qr_code: string): Observable<StudentBase> {
        return this.http.get<StudentBase>(`https://r4gqt7d3-8081.usw3.devtunnels.ms/student/find-student`, { params: { qr_code } })
    }

}