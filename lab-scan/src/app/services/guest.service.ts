import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LaboratoryDTO } from '../types/laboratory.types';
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { GroupResponse } from "../types/group.types";
import { to_local_YYYY_MM_DD } from "@shared/util/util";
import { StudentBase, StudentRequest } from "../types/student.types";

@Injectable({ providedIn: 'root' })
export class GuestService {

    static readonly SEMESTER: number = 24

    private readonly API = `${environment.api_url}/student`

    constructor(private readonly http: HttpClient) { }

    ping(): Observable<string> {
        return this.http.get(`${this.API}/ping`, { responseType: 'text' })
    }

    getIdentifiers(): Observable<string[]> {
        return this.http.get<string[]>(`${this.API}/load-all-identifiers`)
    }


    getLabs(): Observable<LaboratoryDTO[]> {
        return this.http.get<LaboratoryDTO[]>(`${this.API}/get-labs`)
    }

    getGroups(laboratory: string, semester: number, date: Date): Observable<GroupResponse[]> {
        return this.http.get<GroupResponse[]>(`${this.API}/get-groups`, {
            params: {
                laboratory,
                semester,
                date: to_local_YYYY_MM_DD(date)
            }
        })
    }

    getGroupsOfTheWeek(laboratory: string, semester: number = GuestService.SEMESTER): Observable<GroupResponse[]> {
        return this.http.get<GroupResponse[]>(`${this.API}/get-groups-of-the-week`, {
            params: { laboratory, semester }
        })
    }

    save(student: StudentRequest): Observable<StudentBase> {
        student.semester_id = GuestService.SEMESTER
        return this.http.post<StudentBase>(`${this.API}/save-student`, this.refactor(student))
    }

    update(student: StudentRequest): Observable<string> {
        student.semester_id = GuestService.SEMESTER
        return this.http.put(`${this.API}/update-student`, this.refactor(student), { responseType: 'text' })
    }

    findByStudentReportNumber(reportNumber: string): Observable<StudentRequest> {
        return this.http.get<StudentRequest>(`${this.API}/find-student-by-report-number`, { params: { reportNumber } }).pipe(
            tap(response => {
                response.groups = new Map<string, GroupResponse[]>(Object.entries(response.groups))
            })
        )
    }

    private refactor(student: StudentRequest): StudentRequest {
        const convMap = {}
        student.groups.forEach((value, key) => convMap[key] = value)
        return {
            ...student,
            groups: convMap as any
        }
    }

}