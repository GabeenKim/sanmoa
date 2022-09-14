import { Router } from 'express';
import userdata from '../../models/userDB';
// import cors from 'cors'; //여기에 불러와야 auth 라우터에 적용이 안 돼서,,?

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
  const { age, phone, contry, content } = req.body;

  const userInfo = await userdata.findOne({
    //id가 postId와 동일한 것 중 한 개만 읽어온다.(글의 존재여부, 작성자 식별을 위함))
    where: {
      id: jwtUserId,
    },
  });

  if (!userInfo) {
    //해당 글이 없을 시
    return res.json({
      error: 'user does not exist',
    });
  }

  console.log(jwtUserId);

  if (userInfo.id !== jwtUserId) {
    //jwt 검증된 id와 작성자가 다를 시 수정 금지.
    return res.json({
      error: 'Cannot modify informations',
    });
  }

  const mysql = require('mysql2'); // mysql 모듈 로드
  const conn = {
    // mysql 접속 설정
    host: '54.180.118.33',
    port: '3306',
    user: 'sanmoadb',
    password: '1234',
    database: 'sanmoadb',
  };
  let connection = mysql.createConnection(conn); // DB 커넥션 생성
  connection.connect(); // DB 접속

  let sql = `UPDATE userdatas SET age = ${age}, phone = "${phone}",contry = "${contry}",content = "${content}" WHERE id = ${jwtUserId}`;

  connection.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
  });
  sql = `SELECT name,age, email, phone,contry, content FROM userdatas  WHERE id = ${jwtUserId}`;

  connection.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    return res.json({
      data: '수정되었습니다.',
    });
  });

  connection.end(); // DB 접속 종료
});

export default router;
