import express from 'express';
import controller from '../controllers/persons';

const router = express.Router();

router.get('/', controller.get);
router.post('/', controller.create);
router.patch('/:id', controller.update);

export default router;
