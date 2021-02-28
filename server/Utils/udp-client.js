import UdpServer from "./udp-server";

// This is the data port
const PORT = 2222;
const TELEMETRY = 2223;
const HOST = '192.168.4.1';
const SERVER_ADDRESS = '192.168.4.2';

export default class UdpClient {
    constructor() {
        this.telemetry = UdpServer.createServer('Telemetry', TELEMETRY, SERVER_ADDRESS);
        this.client = UdpServer.createServer('Client', PORT, SERVER_ADDRESS);
    }

    send(action, rail, xpos, ypos, speed ) {
        /*
          The payload is a 20 bytes packet
          First 4 bytes are the command (JXCS where X is a number from 0 to 5)
          Second 4 bytes is the rail length in mm (or how much you want to travel)
          Third 4 bytes is position of the Object in mm from rail (for object tracking)
          Fourth 4 bytes is position of the Object in mm from the camera (for object tracking)
          Fifth 4 bytes is the speed
        */
        const buf0 = Buffer.alloc(4, action);
        const buf1 = Buffer.alloc(4);
        const buf2 = Buffer.alloc(4);
        const buf3 = Buffer.alloc(4);
        const buf4 = Buffer.alloc(4);
        buf1.writeUInt32BE(rail);
        buf2.writeUInt32BE(xpos);
        buf3.writeUInt32BE(ypos);
        buf4.writeUInt32BE(speed);
        const data = Buffer.concat([buf0, buf1, buf2, buf3, buf4]);

        return new Promise((resolve, reject) => {
            this.client.send(data, PORT, HOST, (err) => {
                if (err) {
                    this.client.close();
                    return reject(err);
                } else {
                    console.log(` > Payload [${action}, ${rail}, ${xpos}, ${ypos}, ${speed}] sent!`);
                    return resolve();
                }
            });
        });
    }
}
