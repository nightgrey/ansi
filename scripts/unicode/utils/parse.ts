
// Helper function to parse code point ranges
export function parseRange(field: string): [from: number, to: number] {
    const dots = field.indexOf('..');
    if (dots !== -1) {
        return [
            parseInt(field.slice(0, dots), 16),
            parseInt(field.slice(dots + 2), 16)
        ];
    } else {
        const code = parseInt(field, 16);
        return [code, code];
    }
}
