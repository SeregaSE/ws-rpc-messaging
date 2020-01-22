import Request from './request';

test('Request class', () => {
    const message = new Request('2.0', 'math.sum', [1, 2, 3, 4], 1);

    expect(JSON.stringify(message)).toBe('{"jsonrpc":"2.0","method":"math.sum","params":[1,2,3,4],"id":1}');
});
