import { Request, Response } from 'express';
import GroupModel from '../models/Group';

const create = async (req: Request, res: Response) => {
  try {
    await GroupModel.create(req.body);
    res.status(200).json({ message: 'success' });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send('Internal server error.');
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await GroupModel.update(id, req.body);
    res.status(200).json({ message: 'success' });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send('Internal server error.');
  }
};
const get = async (req: Request, res: Response) => {
  try {
    const groups = await GroupModel.get();
    res.status(200).json(groups);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send('Internal server error.');
  }
};

export default { create, update, get };
