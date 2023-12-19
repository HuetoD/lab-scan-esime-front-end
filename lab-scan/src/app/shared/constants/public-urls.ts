const AUTH_MODULE = 'auth'
const GUEST_MODULE = 'student'

export const PUBLIC_URLS = [
    `${AUTH_MODULE}/login`,
    `${AUTH_MODULE}/reset-password`,
    `${AUTH_MODULE}/encode-password`,
    `${AUTH_MODULE}/ping`,
    `${GUEST_MODULE}/**`
]