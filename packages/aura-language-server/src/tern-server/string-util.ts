function isAlphaNumberic(code: number) {
    if (code > 47 && code < 58) {
        // numeric
        return true;
    }
    if ((code > 64 && code < 91) || (code > 96 && code < 123)) {
        // alpha
        return true;
    }
    if (code === 95 || code === 45) {
        // _ and -
        return true;
    }
    return false;
}

export function findWord(str: string, offset: number) {
    let start: number = -1;
    let end: number = -1;

    let pos: number = offset;
    let c: number;

    while (pos >= 0) {
        c = str.charCodeAt(pos);
        if (c === 10 || c === 13) {
            // \n and \r
            break;
        } else if (!isAlphaNumberic(c)) {
            pos++;
            break;
        }
        --pos;
    }
    start = pos;

    pos = offset;
    const length = str.length;

    while (pos < length) {
        c = str.charCodeAt(pos);
        if (c === 10 || c === 13) {
            // \n and \r
            break;
        } else if (!isAlphaNumberic(c)) {
            break;
        }
        ++pos;
    }
    end = pos;

    if (start > -1 && end > -1) {
        return {
            start,
            end,
        };
    }
}
export function countPreviousCommas(str: string, offset: number) {
    let commas: number = 0;
    let pos: number = offset;
    let c: number;
    while (pos >= 0) {
        c = str.charCodeAt(pos);
        if (c === 10 || c === 13 || c === 40) {
            // \n and \r and ()
            break;
        } else if (c === 44) {
            // ,
            commas++;
        }
        --pos;
    }
    return commas;
}
export function findPreviousLeftParan(str: string, offset: number) {
    let start: number = -1;
    let pos: number = offset;
    let c: number;
    while (pos >= 0) {
        c = str.charCodeAt(pos);
        if (c === 10 || c === 13) {
            // \n and \r
            break;
        } else if (c === 40) {
            start = pos;
            break;
        }
        --pos;
    }
    return start;
}

export function findPreviousWord(str: string, offset: number) {
    let start: number = -1;
    let end: number = -1;

    let seenWordBoundary: boolean = false;
    let boundaryOffset: number = 0;

    let pos: number = offset;
    let c: number;

    while (pos >= 0) {
        c = str.charCodeAt(pos);
        if (c === 10 || c === 13) {
            // \n and \r
            break;
        } else if ((c === 46 || c === 40) && !seenWordBoundary) {
            // . and (
            seenWordBoundary = true;
            boundaryOffset = offset - pos + 1;
        } else if (!isAlphaNumberic(c)) {
            pos++;
            break;
        }
        --pos;
    }
    if (!seenWordBoundary) {
        return {
            start: offset,
            end: offset,
        };
    }
    start = pos;

    pos = offset;
    const length: number = str.length;

    while (pos < length) {
        c = str.charCodeAt(pos);
        if (c === 10 || c === 13) {
            // \n and \r
            break;
        } else if (!isAlphaNumberic(c)) {
            break;
        }
        ++pos;
    }
    end = pos;

    if (start > -1 && end > -1) {
        return { start, end: end - boundaryOffset };
    }
}
