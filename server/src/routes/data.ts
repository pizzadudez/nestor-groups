import express from 'express';
import controller from '../controllers/data';

const router = express.Router();

router.get('/', controller.get);

export default router;
