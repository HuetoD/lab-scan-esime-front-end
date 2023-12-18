import { GroupResponse, LabGroups } from "."

export class StudentBase {
    student_id: number = 0
    student_identification_type: string
    student_report_number: string
    student_full_name: string = ''
    student_pc_number: string = ''
    student_qr_code?: string
}

export class StudentRequest extends StudentBase {
    sacadem_register_date?: Date
    groups: Map<string, GroupResponse[]> = new Map()
    semester_id: number
    photo?: string
}

export interface IdentificationResponse {
    number_id: number
    name: string
}