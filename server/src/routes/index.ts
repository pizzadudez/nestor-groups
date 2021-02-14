import express from 'express';
import GroupsRouter from './groups';
import PersonsRouter from './persons';
import DataRouter from './data';

const router = express.Router();

router.use('/groups', GroupsRouter);
router.use('/persons', PersonsRouter);
router.use('/data', DataRouter);

export default router;
