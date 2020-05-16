import { Router } from 'express';
import { cloth as controller } from '../controllers';
import { releaseToken } from '../middleware';

export const cloth = Router()
  .get('/info/:id', controller.get)
  .get('/organization/', releaseToken, controller.getAllByOrganization)
  .get('/user/', releaseToken, controller.getAllByUser)
  .post('/', releaseToken, controller.post)
  .delete('/:clothId', releaseToken, controller.delete)
  .put('/:clothId', releaseToken, controller.update)
  .patch('/:clothId', controller.updateState);
