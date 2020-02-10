const {
    Client,
    CONNECTING,
    OPEN,
    NOT_FOUND_ERROR,
    INTERNAL_ERROR,
} = require('../lib');

test('client connection', () => new Promise((resolve) => {
    const client = new Client('ws://localhost:3000');

    expect(client.readyState).toBe(CONNECTING);

    client.on('open', () => {
        expect(client.readyState).toBe(OPEN);
        client.close();
    });

    client.on('close', resolve);
}));

test('client request', () => new Promise((resolve) => {
    const client = new Client('ws://localhost:3000');

    client.request('sum', [1, 2, 3, 4, 5], (error, result) => {
        expect(error).toBe(null);
        expect(result).toBe(15);
        client.close();
    });

    client.on('close', resolve);
}));

test('client bulk requests', () => new Promise((resolve) => {
    const client = new Client('ws://localhost:3000');
    client.on('close', resolve);

    let done = 0;

    const isDone = () => {
        done += 1;

        if (done === 4) {
            client.close();
        }
    };

    client.bulk([
        {
            method: 'sum',
            params: [1, 2, 3, 4, 5],
            callback: (error, result) => {
                expect(error).toBe(null);
                expect(result).toBe(15);
                isDone();
            },
        },
        {
            method: 'sum',
            params: [1, 2, 3, 4, 5, 6],
            callback: (error, result) => {
                expect(error).toBe(null);
                expect(result).toBe(21);
                isDone();
            },
        },
        {
            method: 'sum',
            params: { 0: 1, 1: 2 },
            callback: (error, result) => {
                expect(error.message).toBe(INTERNAL_ERROR.message);
                expect(result).toBe(undefined);
                isDone();
            },
        },
        {
            method: 'sub',
            params: [15, 5, 4, 3, -2],
            callback: (error, result) => {
                expect(error).toBe(null);
                expect(result).toBe(5);
                isDone();
            },
        },
        {
            method: 'sqrt',
            params: 4,
            callback: (error, result) => {
                expect(error.message).toBe(NOT_FOUND_ERROR.message);
                expect(result).toBe(undefined);
                isDone();
            },
        },
    ]);
}));
