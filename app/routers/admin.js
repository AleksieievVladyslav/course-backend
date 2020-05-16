import { Router } from 'express';
import { admin as controller } from '../controllers';
import { releaseToken } from '../middleware';

export const admin = Router()
  .get('/', releaseToken, controller.get)
  .post('/', controller.post)
  .delete('/', releaseToken, controller.delete)
  .put('/', releaseToken, controller.update)
  .post('/login', controller.login);
