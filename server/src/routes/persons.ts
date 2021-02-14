import express from 'express';
import controller from '../controllers/persons';

const router = express.Router();

router.get('/persons', controller.get);
router.post('/persons', controller.create);
router.patch('/person/:id', controller.update);

export default router;
