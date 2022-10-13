import { Router } from 'express';
import auth from './auth';
import board from './board';
import mypage from './mypage';
import sanmoa from './sanmoa';
import store from './store';
import DBstore from './DBstore';
import comment from './comment';

const api = Router();

api.use('/DBstore', DBstore);
api.use('/auth', auth);
api.use('/board', board);
api.use('/mypage', mypage);
api.use('/sanmoa', sanmoa);
api.use('/store', store);
api.use('/comment', comment);

export default api;
