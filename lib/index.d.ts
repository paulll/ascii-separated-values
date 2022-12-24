/**
 * Generate ASCII-Separated Values data.
 *
 * @param stream - Async Iterable of Array<String> with row cells. May be node Stream.
 * @returns  Generator producing ASV string (not buffer).
 */
export declare function stringify(stream: AsyncIterable<Array<String>>): AsyncGenerator<string, void, unknown>;
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
export declare function parse(stream: AsyncIterable<String>, validate?: boolean): AsyncGenerator<string[], void, unknown>;
//# sourceMappingURL=index.d.ts.map