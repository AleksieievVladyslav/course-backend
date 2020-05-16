import { Router } from 'express';
import { organization as controller } from '../controllers';
import { releaseToken } from '../middleware';

export const organization = Router()
  .get('/', releaseToken, controller.get)
  .post('/', controller.post)
  .delete('/', releaseToken, controller.delete)
  .put('/', releaseToken, controller.update);
