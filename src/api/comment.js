import { Router } from 'express';
import commentdata from '../../models/commentDB';
import board from '../../models/boardDB';
import userdata from '../../models/userDB';
// import cors from 'cors'; //여기에 불러와야 auth 라우터에 적용이 안 돼서,,?

const post = Router();
const { verifyToken } = require('./middlewares');

//생성 - 모듈 이용
post.post('/', verifyToken, async (req, res) => {
  //해당주소로 post 요청 보낼 시, 글 생성-> 생성된 글의 ID만 나타내기
  const jwtUserId = req.decoded.id; //jwt 검증된 id
  const { content, postdatumId } = req.body;

  if (!content) {
    return {
      error: '댓글을 작성해주세요.',
    };
  }

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

  let sql = `INSERT INTO commentdatas (content, userdatumId, postdatumId) VALUES ("${content}", "${jwtUserId}", "${postdatumId}")`;

  connection.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
  });
  sql = `SELECT * FROM commentdatas  WHERE postdatumId = "${postdatumId}"`;

  connection.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    return res.json({
      data: '작성되었습니다',
    });
  });

  connection.end(); // DB 접속 종료*/
});

//수정 -모듈 이용
post.put('/:postId', verifyToken, async (req, res) => {
  const jwtUserId = req.decoded.id;
  const { content } = req.body;
  const { postId } = req.params;

  const postDatas = await commentdata.findOne({
    attributes: ['id', 'content', 'userdatumId', 'commendate', 'postdatumId'],
    //id가 postId와 동일한 것 중 한 개만 읽어온다.(글의 존재여부, 작성자 식별을 위함))
    where: {
      id: postId,
    },
  });
  console.log(postDatas.dataValues.userdatumId);

  if (!postDatas) {
    //해당 글이 없을 시
    return res.json({
      error: '해당 글이 존재하지 않습니다',
    });
  }
  console.log(jwtUserId);
  if (postDatas.dataValues.userdatumId !== jwtUserId) {
    //jwt 검증된 id와 작성자가 다를 시 수정 금지.
    return res.json({
      error: '작성자가 아니기에 해당 댓글은 수정하실 수 없습니다.',
    });
  }
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

  let sql = `UPDATE commentdatas SET content = "${content}" WHERE userdatumId = "${jwtUserId}" AND id = "${postId}" `;

  connection.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
  });
  sql = `SELECT * FROM commentdatas  WHERE id = ${jwtUserId}`;

  connection.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    return res.json({
      data: '수정되었습니다',
    });
  });

  connection.end(); // DB 접속 종료*/
});

//삭제 -모듈 이용
post.delete('/:postId', verifyToken, async (req, res) => {
  const jwtUserId = req.decoded.id;
  const { postId } = req.params;

  const postDatas = await commentdata.findOne({
    attributes: ['id', 'content', 'userdatumId', 'commendate', 'postdatumId'],
    //id가 postId와 동일한 것 중 한 개만 읽어온다.(글의 존재여부, 작성자 식별을 위함))
    where: {
      id: postId,
    },
  });

  if (!postDatas) {
    //없는 글을 요청했을 시
    return res.json({
      error: '해당 글이 존재하지 않습니다.',
    });
  }

  if (postDatas.dataValues.userdatumId !== jwtUserId) {
    //jwt 검증된 id와 작성자가 다를 시 삭제 금지.
    return res.json({
      error: '작성자가 아니기에 삭제하실 수 없습니다.',
    });
  }

  postDatas.destroy({
    //동일 작성자, 동일 글일 경우에만 내용을 삭제한다.
    where: {
      id: postId,
      userdatumId: jwtUserId,
    },
  });
  res.json({
    data: '성공적으로 삭제되었습니다.',
  });
});

export default post;
