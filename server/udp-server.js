import udp from 'dgram';

export default class UdpServer {
    static createServer (NAME, PORT, ADDRESS)  {
        const server = udp.createSocket('udp4');
        server.on('message', (msg, info) => {
            console.log(`${NAME} MSG received:`);
            console.log(` > Data received from client: ${msg.toString()}`);
            console.log(' > Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
        });
        server.on('listening',() => {
            const address = server.address();
            console.log(`${NAME} Server started `);
            console.log(` > UDP server running at ${address.address}:${address.port}`);
            console.log(` > Server is ${address.family}`);
        });
        server.on('error',function(error){
            console.log(`${NAME} found an error:`);
            console.log(` > ${error}`);
            server.close();
        });
        server.bind(PORT, ADDRESS);
        return server;
    };
}
