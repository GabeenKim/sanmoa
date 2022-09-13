import { Router } from 'express';
import userdata from '../../models/userDB';
// import cors from 'cors'; //여기에 불러와야 auth 라우터에 적용이 안 돼서,,?

const { verifyToken } = require('./middlewares');

const router = Router();

//조회
router.get('/', verifyToken, async (req, res) => {
  //해당주소로 post 요청 보낼 시, 글 생성-> 생성된 글의 ID만 나타내기
  const jwtUserId = req.decoded.id; //jwt 검증된 id
  console.log(jwtUserId);
  const userInfo = await userdata.findOne({
    where: {
      id: jwtUserId,
    },
    attributes: ['name', 'email', 'mileage'],
  });

  return res.json({
    userInfo,
  });
});

//생성 - 모듈 이용
router.post('/', verifyToken, async (req, res) => {
  //해당주소로 post 요청 보낼 시, 글 생성-> 생성된 글의 ID만 나타내기
  const jwtUserId = req.decoded.id; //jwt 검증된 id
  const { content } = req.body;

  const postCreate = await board.create({
    content: content,
    userdatumId: jwtUserId,
  });

  return res.json({
    data: {
      post: {
        id: postCreate['id'],
      },
    },
  });
});

//수정 -모듈 이용
router.put('/:postId', verifyToken, async (req, res) => {
  const jwtUserId = req.decoded.id;
  const { content } = req.body;
  const { postId } = req.params;

  const postDatas = await board.findOne({
    //id가 postId와 동일한 것 중 한 개만 읽어온다.(글의 존재여부, 작성자 식별을 위함))
    where: {
      id: postId,
    },
  });

  if (!postDatas) {
    //해당 글이 없을 시
    return res.json({
      error: 'That Post does not exist',
    });
  }
  if (postDatas.UserId !== jwtUserId) {
    //jwt 검증된 id와 작성자가 다를 시 수정 금지.
    return res.json({
      error: 'Cannot modify post',
    });
  }

  await board.update(
    {
      //동일 작성자, 동일 글일 경우에만 내용을 수정한다.
      content: content,
    },
    {
      where: {
        userdatumId: jwtUserId,
        id: postId,
      },
    }
  );

  return res.json({
    data: {
      id: postDatas['id'],
    },
  });
});

export default router;
