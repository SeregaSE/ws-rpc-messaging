import validate from './response-error';

test('validate response-error', () => {
    // valid
    expect(validate({ jsonrpc: '2.0', error: { code: 1, message: 'test error' }, id: 1 })).toBe(true);
    // invalid
    const e1 = 'error field is required';
    const e2 = 'error.code field is required, int';
    const e3 = 'error.message field is required, string';
    const e4 = 'id field in not valid, expect string, int or null';
    expect(() => validate({ jsonrpc: '2.0', id: 1 })).toThrowError(e1);
    expect(() => validate({ jsonrpc: '2.0', error: {}, id: 1 })).toThrowError(e2);
    expect(() => validate({ jsonrpc: '2.0', error: { code: '1' }, id: 1 })).toThrowError(e2);
    expect(() => validate({ jsonrpc: '2.0', error: { code: 1 }, id: 1 })).toThrowError(e3);
    expect(() => validate({ jsonrpc: '2.0', error: { code: 1, message: null }, id: 1 })).toThrowError(e3);
    expect(() => validate({ jsonrpc: '2.0' })).toThrowError(e4);
});
