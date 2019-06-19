const SerialPort = require('serialport');
const dgram = require('dgram');

const serialPort = 'COM6';
const baudRate = 115200;
const port = new SerialPort(serialPort, { baudRate });

const server = dgram.createSocket('udp4');

server.on('message', msg => {
    console.log(`${msg}`);
    const padLeft = (nr, n, str) => Array(n-String(nr).length+1).join(str||'0')+nr;
    const binary = `${msg}`.split('').reduce((s, b) => s += padLeft(parseInt(b, 32).toString(2), 5), 'B');
    console.log(binary);
    port.write(`${binary}|`);
});

server.bind(49161);

// errors handling
server.on('error', err => {
    console.warn(`udp error: \n${err.stack}`);
    server.close();
});

port.on('error', err => {
    console.log('Error: ', err.message);
});