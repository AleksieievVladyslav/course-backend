import { Router } from 'express';
import { category as controller } from '../controllers';

export const category = Router()
  .get('/', controller.getAll)
  .get('/:id', controller.get)
  .post('/', controller.post)
  .delete('/:id', controller.delete)
  .put('/:id', controller.update);
