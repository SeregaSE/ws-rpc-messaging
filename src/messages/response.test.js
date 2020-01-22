import Response from './response';

test('Response class', () => {
    const error = new Response('2.0', 'error', { code: 1, message: 'user not found', data: 'user with id 57483534 not found' }, 1);

    expect(JSON.stringify(error)).toBe('{"jsonrpc":"2.0","error":{"code":1,"message":"user not found","data":"user with id 57483534 not found"},"id":1}');

    const success = new Response('2.0', 'result', 10, 1);

    expect(JSON.stringify(success)).toBe('{"jsonrpc":"2.0","result":10,"id":1}');
});
