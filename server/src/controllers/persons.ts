import { Request, Response } from 'express';
import PersonModel from '../models/Person';

const create = async (req: Request, res: Response) => {
  try {
    await PersonModel.create(req.body);
    res.status(200).json({ message: 'success' });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send('Internal server error.');
  }
};
const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await PersonModel.update(id, req.body);
    res.status(200).json({ message: 'success' });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send('Internal server error.');
  }
};
const get = async (req: Request, res: Response) => {
  try {
    const persons = await PersonModel.get();
    res.status(200).json(persons);
  } catch (err) {
    console.log(err.stack);
    res.status(500).send('Internal server error.');
  }
};

export default { create, update, get };
