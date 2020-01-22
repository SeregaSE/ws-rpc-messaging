import Message from './message';

test('Message class', () => {
    const message = new Message('2.0');

    expect(JSON.stringify(message)).toBe('{"jsonrpc":"2.0"}');
});
