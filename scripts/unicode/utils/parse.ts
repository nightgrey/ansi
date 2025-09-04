
// Helper function to parse code point ranges
export function range(field: string): [from: number, to: number] {
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

export function *lines(data: string) {
    for  (const raw of data.split('\n')) {
         const line = raw.trim();
        if (!line || line.startsWith("#")) continue;

        yield line;
    }
}


export function *parse(data: string) {
    for  (const raw of data.split('\n')) {
         const line = raw.trim();
        if (!line || line.startsWith("#")) continue;

        const fields = split(line);
        if (fields === null) continue;
        const [codes, ...rest] = fields;
        yield [range(codes), ...rest] as const;
    }
}

export function split(line: string) {
    const noComment = line.includes('#') ? line.slice(0, line.indexOf('#')) : line;
    const fields = noComment.split(/[; ]+/).filter(f => f.length > 0);
    if (fields.length < 2) return null;
    return fields;
}
