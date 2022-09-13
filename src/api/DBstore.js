import express from 'express';
import path from '../../models/path';
import mountaindata from '../../models/mountainDB';

const app = express();

const fs = require('fs');

let i = 0;
let j = 0;
let p = 0;
const mntFile = [
  'C:/Users/82103/Desktop/산/개화산/PMNTN_개화산_115000101.json',
  'C:/Users/82103/Desktop/산/고은산/PMNTN_고은산_114100501.json',
  'C:/Users/82103/Desktop/산/관악산/PMNTN_관악산_116200201.json',
  'C:/Users/82103/Desktop/산/관악산/PMNTN_관악산446봉기점_116200604.json',
  'C:/Users/82103/Desktop/산/구룡산/PMNTN_구룡산_116500101.json',
  'C:/Users/82103/Desktop/산/궁동산/PMNTN_궁동산_114100601.json',
  'C:/Users/82103/Desktop/산/답십리공원/PMNTN_답십리공원_112300204.json',
  'C:/Users/82103/Desktop/산/대모산/PMNTN_대모산_116500701.json',
  'C:/Users/82103/Desktop/산/대모산/PMNTN_대모산_116800201.json',
  'C:/Users/82103/Desktop/산/도봉산/PMNTN_도봉산_자운봉_113200102.json',
  'C:/Users/82103/Desktop/산/독바위산/PMNTN_독바위산_113801001.json',
  'C:/Users/82103/Desktop/산/망우산/PMNTN_망우산_112600301.json',
  'C:/Users/82103/Desktop/산/배봉산/PMNTN_배봉산_112300101.json',
  'C:/Users/82103/Desktop/산/백련산/PMNTN_백련산_113800101.json',
  'C:/Users/82103/Desktop/산/백련산/PMNTN_백련산_114100701.json',
  'C:/Users/82103/Desktop/산/범바위산/PMNTN_범바위산_116500104.json',
  'C:/Users/82103/Desktop/산/봉제산/PMNTN_봉제산_115000401.json',
  'C:/Users/82103/Desktop/산/북악산/PMNTN_북악산_111100101.json',
  'C:/Users/82103/Desktop/산/북한산/PMNTN_북한산_114100801.json',
  'C:/Users/82103/Desktop/산/불암산/PMNTN_불암산_113500101.json',
  'C:/Users/82103/Desktop/산/수락산/PMNTN_수락산_113500201.json',
  'C:/Users/82103/Desktop/산/수명산/PMNTN_수명산_115000701.json',
  'C:/Users/82103/Desktop/산/수중동산/PMNTN_수중동산_116200501.json',
  'C:/Users/82103/Desktop/산/아차산/PMNTN_아차산_112150201.json',
  'C:/Users/82103/Desktop/산/염창산/PMNTN_염창산_115000801.json',
  'C:/Users/82103/Desktop/산/용마산/PMNTN_용마산_112600501.json',
  'C:/Users/82103/Desktop/산/우면산/PMNTN_우면산_116500401.json',
  'C:/Users/82103/Desktop/산/우장산/PMNTN_우장산_115000501.json',
  'C:/Users/82103/Desktop/산/천장산/PMNTN_천장산_112300301.json',
  'C:/Users/82103/Desktop/산/청계산원터/PMNTN_청계산원터_116500804.json',
  'C:/Users/82103/Desktop/산/초안산/PMNTN_초안산_113500301.json',
  'C:/Users/82103/Desktop/산/호암산/PMNTN_호암산_115450101.json',
];

app.get('/', async (res, req) => {
  fs.readFile(
    'C:/Users/82103/Desktop/산/관악산/PMNTN_관악산_116200201.json',
    'utf8',
    async (error, jsonFile) => {
      if (error) return console.log(error);
      const jsonData = JSON.parse(jsonFile);

      for (i in jsonData.features) {
        const resultHead = jsonData.features[i].attributes;

        const MNTN_NM = resultHead.MNTN_NM;
        const MNTN_CODE = resultHead.MNTN_CODE;
        const PMNTN_SN = resultHead.PMNTN_SN;
        const PMNTN_NM = resultHead.PMNTN_NM;
        const PMNTN_DFFL = resultHead.PMNTN_DFFL;
        const PMNTN_LT = resultHead.PMNTN_LT;

        for (j in jsonData.features[i].geometry.paths[0]) {
          const pathX = jsonData.features[i].geometry.paths[0][j][0];
          const pathY = jsonData.features[i].geometry.paths[0][j][1];

          await path.create({
            MNTN_NM: MNTN_NM,
            PMNTN_SN: PMNTN_SN,
            paths_x: pathX,
            paths_y: pathY,
          });
        }
        await mountaindata.create({
          MNTN_NM: MNTN_NM,
          MNTN_CODE: MNTN_CODE,
          PMNTN_SN: PMNTN_SN,
          PMNTN_NM: PMNTN_NM,
          PMNTN_DFFL: PMNTN_DFFL,
          PMNTN_LT: PMNTN_LT,
        });
      }
    }
  );
});

export default app;
