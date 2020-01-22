import validate from './request';

test('validate request', () => {
    // valid
    expect(validate({ jsonrpc: '2.0', method: 'math.pi', id: 1 })).toBe(true);
    expect(validate({
        jsonrpc: '2.0', method: 'math.sum', params: [1, 2, 3], id: 1,
    })).toBe(true);
    expect(validate({
        jsonrpc: '2.0', method: 'math.sub', params: { from: 10, nums: [1, 2, 3] }, id: 1,
    })).toBe(true);
    // invalid
    const e1 = 'method field is not a string';
    const e2 = 'method field is required';
    const e3 = 'params field in not valid, array or object expected';
    const e4 = 'id field in not valid, expect string, int or null';
    expect(() => validate({ jsonrpc: '2.0' })).toThrowError(e1);
    expect(() => validate({ jsonrpc: '2.0', method: null })).toThrowError(e1);
    expect(() => validate({ jsonrpc: '2.0', method: [1, 2] })).toThrowError(e1);
    expect(() => validate({ jsonrpc: '2.0', method: '' })).toThrowError(e2);
    expect(() => validate({ jsonrpc: '2.0', method: 'math.sum', params: 4 })).toThrowError(e3);
    expect(() => validate({ jsonrpc: '2.0', method: 'math.sum', params: null })).toThrowError(e3);
    expect(() => validate({ jsonrpc: '2.0', method: 'math.pi' })).toThrowError(e4);
    expect(() => validate({ jsonrpc: '2.0', method: 'math.sum', params: [1, 2, 3] })).toThrowError(e4);
    expect(() => validate({ jsonrpc: '2.0', method: 'math.sub', params: { from: 10, nums: [1, 2, 3] } })).toThrowError(e4);
});
