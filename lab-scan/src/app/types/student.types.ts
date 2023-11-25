import { LabGroups } from "."

export interface StudentBase {
    student_id: number
    student_identification_type: string
    student_report_number?: string
    student_full_name: string
    student_pc_number: string
    student_qr_code?: string
}

export interface StudentCreateRequest extends StudentBase {
    sacadem_register_date?: Date
    groups: LabGroups[]
    photo?: string
}   

export interface Identification {
    number_id: number
    name: string
}