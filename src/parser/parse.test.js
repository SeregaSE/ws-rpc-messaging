import parse from './parse';
import {
    ERROR,
    REQUEST,
    RESPONSE,
    NOTIFICATION,
} from '../constants';
import {
    Request,
    Notification,
    ResponseError,
    ResponseResult,
} from '../messages';

test('parse incoming data', () => {
    const cases = [
        {
            has: {
                jsonrpc: '2.0',
                method: 'subtract',
                params: [42, 23],
                id: 1,
            },
            want: [
                REQUEST,
                new Request('2.0', 'subtract', [42, 23], 1),
            ],
        },
        {
            has: {
                jsonrpc: '2.0',
                method: 'subtract',
                params: {
                    subtrahend: 23,
                    minuend: 42,
                },
                id: 1,
            },
            want: [
                REQUEST,
                new Request(
                    '2.0',
                    'subtract',
                    {
                        subtrahend: 23,
                        minuend: 42,
                    },
                    1,
                ),
            ],
        },
        {
            has: {
                jsonrpc: '2.0',
                method: 'update',
                params: [1, 2, 3, 4, 5],
            },
            want: [
                NOTIFICATION,
                new Notification(
                    '2.0',
                    'update',
                    [1, 2, 3, 4, 5],
                ),
            ],
        },
        {
            has: {
                jsonrpc: '2.0',
                error: {
                    code: -32601,
                    message: 'Method not found',
                },
                id: 1,
            },
            want: [
                ERROR,
                new ResponseError(
                    '2.0',
                    {
                        code: -32601,
                        message: 'Method not found',
                    },
                    1,
                ),
            ],
        },
        {
            has: {
                jsonrpc: '2.0',
                result: -19,
                id: 1,
            },
            want: [
                RESPONSE,
                new ResponseResult(
                    '2.0',
                    -19,
                    1,
                ),
            ],
        },
    ];

    cases.forEach((item) => {
        expect(parse(item.has)).toEqual(item.want);
    });
});
