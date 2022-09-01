//search,length,location,
import { Router } from 'express';
import request from 'request';
const convert = require('xml-js');

const router = Router();
//일단 지도
router.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
//등산로 좌표/데이터, 총 경로(m),시점높이?,종점높이, 난이도
router.get('/route', async (req, res) => {
  var url = 'http://api.vworld.kr/req/data';
  let mountainNm = '철마산';
  let regionCode = '28245101';
  var queryParams =
    '?' +
    encodeURIComponent('key') +
    '=47B02C10-99B2-3469-AA99-49FBD50E3454'; /* Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('domain') +
    '=' +
    encodeURIComponent('http://localhost:4000'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('service') +
    '=' +
    encodeURIComponent('data'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('request') +
    '=' +
    encodeURIComponent('getfeature'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('data') +
    '=' +
    encodeURIComponent('LT_L_FRSTCLIMB'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('attrfilter') +
    '=' +
    encodeURIComponent(
      'emdCd:=:' + regionCode + '|mntn_nm:like:' + mountainNm
    ); /*읍면동코드 */
  queryParams +=
    '&' +
    encodeURIComponent('columns') +
    '=' +
    encodeURIComponent('sec_len,start_z,end_z,cat_nam,mntn_nm,ag_geom'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('geometry') +
    '=' +
    encodeURIComponent('true'); /* */
  queryParams +=
    '&' +
    encodeURIComponent('attribute') +
    '=' +
    encodeURIComponent('true'); /* */

  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    function (error, response, body) {
      //console.log("Status", response.statusCode);
      //console.log("Headers", JSON.stringify(response.headers));
      //console.log("Reponse received", body);
      let info = JSON.parse(body);
      res.json(info);
    }
  );
});

router.get('/location', async (req, res) => {
  let xLocation = 127.1086228;
  let yLocation = 37.4012191;
  var url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${xLocation}&y=${yLocation}`;
  var REST_API_KEY = '0d717e892d16c357d2902d6142f0ccd0';
  request(
    {
      url: url,
      headers: { Authorization: `KakaoAK ${REST_API_KEY}` },
      method: 'GET',
    },
    function (error, response, body) {
      //console.log("Status", response.statusCode);
      //console.log("Headers", JSON.stringify(response.headers));
      //console.log("Reponse received", body);
      let info = JSON.parse(body);

      res.json(info);
    }
  );
});

//산 정보
const mountain = '지리산'; // 추후 지리산은 query로 요청 받으면 전달
router.get('/search', async (req, res) => {
  var url =
    'http://openapi.forest.go.kr/openapi/service/trailInfoService/getforeststoryservice';
  var queryParams =
    '?' +
    encodeURIComponent('servicekey') +
    '=e9q6FRryTM2vX8VQxrb8dJwbnlvpvHu447HuwfJQw0zl%2B7cnoIu6HdJElNMaGpaKQ3sQ2GAEsOad%2BOWNCwJ%2FVg%3D%3D'; /* Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('mntnNm') +
    '=' +
    encodeURIComponent(mountain); /*산 정보*/
  queryParams +=
    '&' + encodeURIComponent('mntnAdd') + '=' + encodeURIComponent(''); /* */
  queryParams +=
    '&' +
    encodeURIComponent('mntnInfoAraCd') +
    '=' +
    encodeURIComponent(''); /* */

  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    function (error, response, body) {
      //console.log("Status", response.statusCode);
      //console.log("Headers", JSON.stringify(response.headers));
      //console.log("Reponse received", body);
      var xmlToJson = convert.xml2json(body, { compact: true, spaces: 4 });
      let info = JSON.parse(xmlToJson);
      res.json(info);
    }
  );
});

export default router;
