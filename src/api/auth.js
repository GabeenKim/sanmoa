import { Router } from 'express';
import userdata from '../../models/userDB';
import bcrypt from 'bcrypt';

const auth = Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./middlewares');

auth.get('/', async (req, res) => {
  const userDatas = await userdata.findAll({});
  if (!userDatas) {
    return res.json({
      data: [],
    });
  }
  res.json({
    data: userDatas,
  });
});

//회원가입
auth.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  const userDatas = await userdata.findAll({
    where: {
      email: email,
    },
  });
  if (!email && !password) {
    return res.json({ error: '정상적인 요청이 아닙니다.' });
  }
  if (userDatas.some((user) => user.email === email)) {
    return res.json({
      error: 'User already exist',
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10); //10 : salt/pw bcrypt 이용해 hash로 암호화.
  const userCreate = await userdata.create({
    email: email,
    name: name,
    password: hashedPassword,
  });

  return res.json({
    data: {
      user: {
        id: userCreate['id'],
      },
    },
  });
});

//로그인
auth.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userDatas = await userdata.findAll({
    where: {
      email: email,
    },
  });
  if (userDatas.length === 0) {
    return res.json({
      error: '존재하지 않는 회원입니다',
    });
  }
  const comparedPw = await bcrypt.compareSync(password, userDatas[0].password); //요청된 pw와 select해온 이메일의 pw 비교. boolean 값으로 반환받기 위해 compareSync 사용

  if (comparedPw) {
    const token = jwt.sign(
      {
        //jwt 생성
        id: userDatas[0].id, //추후 jwt 검증 시 유저 id를 사용하기 위함
        email: req.body.email,
        password: req.body.password,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '300m',
        issuer: 'nodebird',
      }
    );
    return res.json({
      code: 200,
      message: '토큰이 발급되었습니다',
      token,
    });
  }
  return res.json({
    error: '이메일또는 비밀번호가 일치하지 않습니다.',
  });
});
auth.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});

export default auth;
