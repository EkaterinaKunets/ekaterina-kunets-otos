const http = require('http');
const args = process.argv.slice(2);
const num = +args[0];
const type = args[1];

const params = {
    host: '127.0.0.1',
    port: 4204,
    method: 'GET'
};

const sendGetRequest = (params) => {
    return new Promise((resolve, reject) => {
        const request = http.request(params, (res) => {
            console.log('statusCode = ', res.statusCode);
            res.statusCode === 200 ? resolve() : reject(new Error('statusCode = ' + res.statusCode));
        });
        request.on('error', (err) => reject(err));
        request.end();
    });
};

const sendSyncRequests = async(num) => {
    for (let i = 0; i < num; i++) {
        await sendGetRequest(params).then(null, (err) => console.log(err));
    }
};

const sendAsyncRequests = async (num) => {
    let promises = [];
    for (let i = 0; i < num; i++) {
        promises.push(sendGetRequest(params).then(null, (err) => console.log(err)));
    }
    await Promise.all(promises);
};

if (Number.isInteger(num) && num % 1 === 0 && num > 0) {
    switch (type) {
        case 'sync':
            sendSyncRequests(num).then(() => console.log(`${ num } sync request were sent`));
            break;
        case 'async':
            sendAsyncRequests(num).then(() => console.log(`${ num } async request were sent`));
            break;
        default:
            console.error('Enter sync or async request type');
    }
}
console.error('Enter a positive integer for the second argument');
