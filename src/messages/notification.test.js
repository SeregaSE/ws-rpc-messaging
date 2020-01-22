import Notification from './notification';

test('Notification class', () => {
    const message = new Notification('2.0', 'math.sum', [1, 2, 3, 4]);

    expect(JSON.stringify(message)).toBe('{"jsonrpc":"2.0","method":"math.sum","params":[1,2,3,4]}');
});
