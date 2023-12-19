import { RoleEnum } from "@shared/constants/roles.enum"

export interface Token {
    sub: string
    roles: RoleEnum[]
    iss: string
    exp: number
    iat: number
}