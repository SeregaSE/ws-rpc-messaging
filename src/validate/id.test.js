import validate from './id';

test('validate id', () => {
    const message = 'id field in not valid, expect string, int or null';
    // valid
    expect(validate(1)).toBe(true);
    expect(validate(null)).toBe(true);
    expect(validate('jfgu-43r4-dsfn-43rn-e3nd')).toBe(true);
    // invalid
    expect(() => validate()).toThrowError(message);
    expect(() => validate('')).toThrowError(message);
    expect(() => validate([])).toThrowError(message);
    expect(() => validate({})).toThrowError(message);
    expect(() => validate(1.01)).toThrowError(message);
    expect(() => validate(undefined)).toThrowError(message);
});
