import ResponseError from './response-error';

test('ResponseError class', () => {
    const message = new ResponseError('2.0', { code: 1, message: 'user not found', data: 'user with id 57483534 not found' }, 1);

    expect(JSON.stringify(message)).toBe('{"jsonrpc":"2.0","error":{"code":1,"message":"user not found","data":"user with id 57483534 not found"},"id":1}');
});
