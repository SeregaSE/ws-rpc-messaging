module.exports = () => new Promise((resolve) => {
    if (global.__WSS__) {
        global.__WSS__.on('close', () => {
            console.log('wss server stopped');
            resolve();
        });
        global.__WSS__.close();
    } else {
        resolve();
    }
});
