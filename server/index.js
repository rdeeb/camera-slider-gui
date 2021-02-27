import express from 'express';
import UdpClient from "./udp-client";

const app = express();
const client = new UdpClient();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`🚀 Server running on port: ${PORT}`);
   client.send('J1CS', 600, 500, 200, 100);
   setTimeout(() => {
      client.send('J0CS', 0, 0, 0, 0);
   }, 19000);
});
