import { StudentBase } from "."

export interface AttendanceBase extends StudentBase {
    attendance_id: number
    observations: string
    attendance: boolean
}

export interface AttendanceResponse extends AttendanceBase {
    teacher_full_name: string
    group_name: string
    laboratory_name: string
    when: string
    ws_code?: string
}