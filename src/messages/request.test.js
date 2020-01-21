import RequestMessage from './request';

test('new RequestMessage (notification)', () => {
    const request = new RequestMessage('2.0', 'sum', [1, 4]);
    expect(request.method).toBe('sum');
    expect(request.params).toEqual([1, 4]);
    expect(request.id).toBeUndefined();
    expect(JSON.stringify(request)).toBe('{"jsonrpc":"2.0","method":"sum","params":[1,4]}');
});

test('new RequestMessage (request)', () => {
    const request = new RequestMessage('2.0', 'sum', [1, 4], '8f4s-dfnd-323f-dfsd-34md');
    expect(request.method).toBe('sum');
    expect(request.params).toEqual([1, 4]);
    expect(request.id).toBe('8f4s-dfnd-323f-dfsd-34md');
    expect(JSON.stringify(request)).toBe('{"jsonrpc":"2.0","method":"sum","params":[1,4],"id":"8f4s-dfnd-323f-dfsd-34md"}');
});

describe('RequestMessage validation test', () => {
    const create = (...args) => () => new RequestMessage(...args);

    test('RequestMessage method validation', () => {
        expect(create('2.0')).toThrowError('method must be not empty string');
        expect(create('2.0', '')).toThrowError('method must be not empty string');
        expect(create('2.0', null)).toThrowError('method must be not empty string');
    });

    test('RequestMessage params validation', () => {
        expect(create('2.0', 'sum', null)).toThrowError('params must be ommited | array | object, got null');
        expect(create('2.0', 'sum', '')).toThrowError('params must be ommited | array | object');
        expect(create('2.0', 'sum', 135)).toThrowError('params must be ommited | array | object');
    });

    test('RequestMessage id validation', () => {
        expect(create('2.0', 'sum', [1, 4], 1.1)).toThrowError('id must be integer, got 1.1');
        expect(create('2.0', 'sum', [1, 4], '')).toThrowError('id must be not empty string');
        expect(create('2.0', 'sum', [1, 4], { a: 1, b: 2 })).toThrowError('id must be ommited | int | string | null');
    });
});
