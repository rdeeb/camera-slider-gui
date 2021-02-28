import express from 'express';
import bodyParser from 'body-parser';
import api from './Controllers/api';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json())
app.use('/api', api);

app.listen(PORT, () => {
   console.log(`🚀 API Server running on port: ${PORT}`);
});
