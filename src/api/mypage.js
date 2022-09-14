import { Router } from 'express';
import userdata from '../../models/userDB';
import bcrypt from 'bcrypt';

const { verifyToken } = require('./middlewares');

const router = Router();

//조회
router.get('/', verifyToken, async (req, res) => {
  //해당주소로 post 요청 보낼 시, 글 생성-> 생성된 글의 ID만 나타내기
  const jwtUserId = req.decoded.id; //jwt 검증된 id
  const userInfo = await userdata.findOne({
    where: {
      id: jwtUserId,
    },
    attributes: [
      'name',
      'age',
      'email',
      'phone',
      'contry',
      'mileage',
      'content',
    ],
  });

  return res.json({
    userInfo,
  });
});

//수정 -모듈 이용
router.put('/', verifyToken, async (req, res) => {
  const jwtUserId = req.decoded.id;
  const { name, age, password, confPw, phone, contry, content } = req.body;

  const userInfo = await userdata.findOne({
    where: {
      id: jwtUserId,
    },
  });

  if (!userInfo) {
    return res.json({
      error: 'user does not exist',
    });
  }

  if (userInfo.id !== jwtUserId) {
    //jwt 검증된 id와 작성자가 다를 시 수정 금지.
    return res.json({
      error: 'Cannot modify informations',
    });
  }

  if (confPw !== password) {
    return res.json({
      error: '비밀번호가 일치하지 않습니다.',
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10); //10 : salt/pw bcrypt 이용해 hash로 암호화.

  const mysql = require('mysql2'); // mysql 모듈 로드
  const conn = {
    // mysql 접속 설정
    host: process.env.MYSQL_HOST,
    port: '3306',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  };
  let connection = mysql.createConnection(conn); // DB 커넥션 생성
  connection.connect(); // DB 접속

  let sql = `UPDATE userdatas SET name = "${name}", password = "${hashedPassword}", age = ${age}, phone = "${phone}",contry = "${contry}",content = "${content}" WHERE id = ${jwtUserId}`;

  connection.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
  });
  sql = `SELECT name, age, email, phone, contry, content FROM userdatas  WHERE id = ${jwtUserId}`;

  connection.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    return res.json({
      data: 'complete',
    });
  });

  connection.end(); // DB 접속 종료
});

export default router;
