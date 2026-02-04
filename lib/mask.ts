export function maskName(name?: string) {
    if (!name) return "Unknown";
    return name[0] + "*".repeat(name.length - 1);
}
