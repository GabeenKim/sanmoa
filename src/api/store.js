import { Router } from 'express';
import request from 'request';

const router = Router();

//주변관광정보
router.get('/search', async (req, res) => {
  let regionCode = '2';
  var url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList';
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
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
    '&' +
    encodeURIComponent('areaCode') +
    '=' +
    encodeURIComponent(regionCode); /*지역 */

  request(
    {
      url: url + queryParams,
      method: 'GET',
    },
    function (error, response, body) {
      //console.log("Status", response.statusCode);
      //console.log("Headers", JSON.stringify(response.headers));
      //console.log("Reponse received", body);
      //let info = JSON.parse(body);
      res.json(body);
    }
  );
});

export default router;
