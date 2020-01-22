import validate from './message';

test('validate message', () => {
    // valid
    expect(validate({ jsonrpc: '2.0' })).toBe(true);
    // invalid
    const e1 = 'message is not an object';
    const e2 = 'jsonrpc field is not valid, 2.0 version expected';
    expect(() => validate()).toThrowError(e1);
    expect(() => validate('')).toThrowError(e1);
    expect(() => validate(1.01)).toThrowError(e1);
    expect(() => validate(undefined)).toThrowError(e1);
    expect(() => validate([])).toThrowError(e2);
    expect(() => validate({})).toThrowError(e2);
    expect(() => validate({ jsonrpc: '1.0' })).toThrowError(e2);
});
