import express from 'express';
import controller from '../controllers/groups';

const router = express.Router();

router.get('/groups', controller.get);
router.post('/groups', controller.create);
router.patch('/group/:id', controller.update);

export default router;
