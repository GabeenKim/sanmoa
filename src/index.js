import express from 'express';
import api from './api';
import cors from 'cors';

const app = express();
const port = 4000;
const { sequelize } = require('../models');
const dotenv = require('dotenv'); //.env 파일에 정보를 저장하고 환경변수로 등록해주는 모듈
dotenv.config(); // .env 파일을 읽어온다.
sequelize
  .sync({ force: true })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.log(err);
  });

const corsOptions = {
  origin: '*',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello');
});
app.use('/api', api);

app.listen(port, () => {
  console.log(`서버실행 => http://localhost:${port}`);
});
