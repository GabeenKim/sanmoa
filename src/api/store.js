import { Router } from 'express';
import request from 'request';
const convert = require('xml-js');

const router = Router();

//관광정보 키워드 검색
router.get('/search', async (req, res) => {
  const searchWord = req.body.word; //나중에 위치 받아오면 그 주변 지역코드로 바꿔서
  console.log(searchWord);
  var url = 'http://apis.data.go.kr/B551011/KorService/searchKeyword';
  var queryParams =
    '?' +
    encodeURIComponent('ServiceKey') +
    '=e9q6FRryTM2vX8VQxrb8dJwbnlvpvHu447HuwfJQw0zl%2B7cnoIu6HdJElNMaGpaKQ3sQ2GAEsOad%2BOWNCwJ%2FVg%3D%3D'; /* Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('numOfRows') +
    '=' +
    encodeURIComponent('1000'); /* */
  queryParams +=
    '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileOS') +
    '=' +
    encodeURIComponent('ETC'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('AppTest'); /* */
  queryParams +=
    '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y');
  queryParams +=
    '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('A');
  queryParams +=
    '&' + encodeURIComponent('keyword') + '=' + encodeURI(searchWord);
  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    await function (error, response, body) {
      //console.log("Status", response.statusCode);
      //console.log("Headers", JSON.stringify(response.headers));
      //console.log("Reponse received", body);
      //let info = JSON.parse(body);
      res.send(convert.xml2json(body));
    }
  );
});
//카테고리별 검색 (음식/카페/숙박/레포츠)
router.get('/restaurant', async (req, res) => {
  var url = 'http://apis.data.go.kr/B551011/KorService/areaBasedList';
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    '=e9q6FRryTM2vX8VQxrb8dJwbnlvpvHu447HuwfJQw0zl%2B7cnoIu6HdJElNMaGpaKQ3sQ2GAEsOad%2BOWNCwJ%2FVg%3D%3D'; /* Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('numOfRows') +
    '=' +
    encodeURIComponent('100'); /* */
  queryParams +=
    '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileOS') +
    '=' +
    encodeURIComponent('ETC'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('AppTest'); /* */
  queryParams +=
    '&' + encodeURIComponent('cat1') + '=' + encodeURIComponent('A05');
  queryParams +=
    '&' + encodeURIComponent('cat2') + '=' + encodeURIComponent('A0502');
  queryParams +=
    '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');

  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    await function (error, response, body) {
      let info = JSON.parse(body);
      res.json(info);
    }
  );
});

router.get('/cafe', async (req, res) => {
  var url = 'http://apis.data.go.kr/B551011/KorService/areaBasedList';
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    '=e9q6FRryTM2vX8VQxrb8dJwbnlvpvHu447HuwfJQw0zl%2B7cnoIu6HdJElNMaGpaKQ3sQ2GAEsOad%2BOWNCwJ%2FVg%3D%3D'; /* Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('numOfRows') +
    '=' +
    encodeURIComponent('100'); /* */
  queryParams +=
    '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileOS') +
    '=' +
    encodeURIComponent('ETC'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('AppTest'); /* */
  queryParams +=
    '&' + encodeURIComponent('cat1') + '=' + encodeURIComponent('A05');
  queryParams +=
    '&' + encodeURIComponent('cat2') + '=' + encodeURIComponent('A0502');
  queryParams +=
    '&' + encodeURIComponent('cat3') + '=' + encodeURIComponent('A05020900');
  queryParams +=
    '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');

  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    await function (error, response, body) {
      let info = JSON.parse(body);
      res.json(info);
    }
  );
});

router.get('/stay', async (req, res) => {
  var url = 'http://apis.data.go.kr/B551011/KorService/areaBasedList';
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    '=e9q6FRryTM2vX8VQxrb8dJwbnlvpvHu447HuwfJQw0zl%2B7cnoIu6HdJElNMaGpaKQ3sQ2GAEsOad%2BOWNCwJ%2FVg%3D%3D'; /* Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('numOfRows') +
    '=' +
    encodeURIComponent('100'); /* */
  queryParams +=
    '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileOS') +
    '=' +
    encodeURIComponent('ETC'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('AppTest'); /* */
  queryParams +=
    '&' + encodeURIComponent('cat1') + '=' + encodeURIComponent('B02');
  queryParams +=
    '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');

  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    await function (error, response, body) {
      let info = JSON.parse(body);
      res.json(info);
    }
  );
});

router.get('/leport', async (req, res) => {
  var url = 'http://apis.data.go.kr/B551011/KorService/areaBasedList';
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    '=e9q6FRryTM2vX8VQxrb8dJwbnlvpvHu447HuwfJQw0zl%2B7cnoIu6HdJElNMaGpaKQ3sQ2GAEsOad%2BOWNCwJ%2FVg%3D%3D'; /* Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('numOfRows') +
    '=' +
    encodeURIComponent('100'); /* */
  queryParams +=
    '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileOS') +
    '=' +
    encodeURIComponent('ETC'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('AppTest'); /* */
  queryParams +=
    '&' + encodeURIComponent('cat1') + '=' + encodeURIComponent('A03');

  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    await function (error, response, body) {
      let info = JSON.parse(body);
      res.json(info);
    }
  );
});

//위치기반 검색 (추후 좌표값 요청으로 받으면 x,y 파라미터만 수정 후 반환! )

export default router;
