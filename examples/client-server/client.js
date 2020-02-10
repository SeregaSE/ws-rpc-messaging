const { Client } = require('../../lib');

const client = new Client('ws://localhost:3000');

client.on('open', () => {
    client.request('sum', [1, 3, 5], (err, res) => {
        console.log(err, res);
    });

    client.request('sub', [10, 2, 3], (err, res) => {
        console.log(err, res);
    });

    client.request('multiply', [2, 2, 3], (err, res) => {
        console.log(err, res);
    });
});
