import validate from './response-result';

test('validate response-result', () => {
    // valid
    expect(validate({ jsonrpc: '2.0', result: 0, id: 1 })).toBe(true);
    expect(validate({ jsonrpc: '2.0', result: 10, id: 1 })).toBe(true);
    expect(validate({ jsonrpc: '2.0', result: 10.01, id: 1 })).toBe(true);
    expect(validate({ jsonrpc: '2.0', result: [], id: 1 })).toBe(true);
    expect(validate({ jsonrpc: '2.0', result: {}, id: 1 })).toBe(true);
    expect(validate({ jsonrpc: '2.0', result: '', id: 1 })).toBe(true);
    expect(validate({ jsonrpc: '2.0', result: null, id: 1 })).toBe(true);
    // invalid
    const e1 = 'result field is required';
    const e4 = 'id field in not valid, expect string, int or null';
    expect(() => validate({ jsonrpc: '2.0', id: 1 })).toThrowError(e1);
    expect(() => validate({ jsonrpc: '2.0' })).toThrowError(e4);
});
