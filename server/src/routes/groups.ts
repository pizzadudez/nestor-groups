import express from 'express';
import controller from '../controllers/groups';

const router = express.Router();

router.get('/', controller.get);
router.post('/', controller.create);
router.patch('/:id', controller.update);

export default router;
