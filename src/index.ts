class InconsistentRowLengthError extends Error {};

/**
 * Generate ASCII-Separated Values data.
 * 
 * @param stream - Async Iterable of Array<String> with row cells. May be node Stream.
 * @returns  Generator producing ASV string (not buffer).
 */
export async function* stringify(stream: AsyncIterable<Array<String>>) {
    for await (const line of stream) {
        yield `${line.join('\x1f')}\x1e`;
    }
}

/**
 * Parse ASCII-separated values string stream.
 * @example
 * ```
 * import asv from '@paulll/ascii-separated-values'
 * await pipeline(
 *    fs.createReadStream('file.txt', 'utf-8'),
 *    asv.parse,
 *    async function* (stream) {
 *      for await (const line of stream) {
 *        console.log(line);     
 *      }
 *    }
 * );
 * ```
 * @param stream Async iterable of String entries, may be node Stream. Does not work with buffers.
 * @param validate Enable row length consistency check.
 * @returns Generator producing arrays of row fields.
 * @throws InconsistentRowLengthError
 * This exception is thrown only if validate parameter is set to true (default).
 */
export async function* parse(stream: AsyncIterable<String>, validate=true) {
    let partialRow = '';
    let rowLength = 0;

    for await (const chunk of stream) {
        const rows = `${partialRow}${chunk}`.split('\x1e');
        const newPartialRow = rows.pop();

        if (newPartialRow !== undefined) {
            partialRow = newPartialRow;
        }

        for (const row of rows) {
            const parsedRow = row.split('\x1f');

            if (rowLength == 0) { rowLength = parsedRow.length; }
            if (validate && rowLength != parsedRow.length) {
                throw new InconsistentRowLengthError(`Inconsistent row length. Expected ${rowLength} columns, given: ${JSON.stringify(parsedRow)}`);
            }

            yield parsedRow;
        }
    }

    if (partialRow.length) {
        const parsedRow = partialRow.split('\x1f');

        if (validate && rowLength != parsedRow.length) {
            throw new InconsistentRowLengthError(`Inconsistent trailing row length. Expected ${rowLength} columns, given: ${JSON.stringify(parsedRow)}.\nLooks like truncated/unflushed input.`);
        }

        yield parsedRow;
    }
}