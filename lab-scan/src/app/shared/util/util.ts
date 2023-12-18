export function to_local_YYYY_MM_DD(date?: Date | undefined): string {
    return !!date && date instanceof Date
        ? date.toLocaleDateString('sv-SE')
        : to_local_YYYY_MM_DD(new Date())
}