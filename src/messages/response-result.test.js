import ResponseResult from './response-result';

test('ResponseResult class', () => {
    const message = new ResponseResult('2.0', 10, 1);

    expect(JSON.stringify(message)).toBe('{"jsonrpc":"2.0","result":10,"id":1}');
});
