import { Router } from 'express';
import { user as controller } from '../controllers';
import { releaseToken } from '../middleware';

export const user = Router()
  .get('/', releaseToken, controller.get)
  .post('/', controller.post)
  .delete('/', releaseToken, controller.delete)
  .put('/', releaseToken, controller.update)
  .post('/login', controller.login);
