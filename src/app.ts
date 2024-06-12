import express from 'express';
import cors from 'cors';
import api from './api';

const app = express();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'SeriesHub API',
  });
});

app.use('/api/v1', api);
export default app;
