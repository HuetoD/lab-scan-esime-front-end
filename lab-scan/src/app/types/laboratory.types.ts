import { GroupResponse as GroupDTO } from "."

export interface LaboratoryDTO {
    lab_id: number
    lab_name: string
}

export interface LabGroups {
    [key: string] : GroupDTO[]
}