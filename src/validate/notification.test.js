import validate from './notification';

test('validate notification', () => {
    // valid
    expect(validate({ jsonrpc: '2.0', method: 'math.pi' })).toBe(true);
    expect(validate({ jsonrpc: '2.0', method: 'math.sum', params: [1, 2, 3] })).toBe(true);
    expect(validate({ jsonrpc: '2.0', method: 'math.sub', params: { from: 10, nums: [1, 2, 3] } })).toBe(true);
    // invalid
    const e1 = 'method field is not a string';
    const e2 = 'method field is required';
    const e3 = 'params field in not valid, array or object expected';
    expect(() => validate({ jsonrpc: '2.0' })).toThrowError(e1);
    expect(() => validate({ jsonrpc: '2.0', method: null })).toThrowError(e1);
    expect(() => validate({ jsonrpc: '2.0', method: [1, 2] })).toThrowError(e1);
    expect(() => validate({ jsonrpc: '2.0', method: '' })).toThrowError(e2);
    expect(() => validate({ jsonrpc: '2.0', method: 'math.sum', params: 4 })).toThrowError(e3);
    expect(() => validate({ jsonrpc: '2.0', method: 'math.sum', params: null })).toThrowError(e3);
});
