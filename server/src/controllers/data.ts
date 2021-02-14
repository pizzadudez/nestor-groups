import { Request, Response } from 'express';
import GroupModel from '../models/Group';
import PersonModel from '../models/Person';

const get = async (req: Request, res: Response) => {
  try {
    const groups = await GroupModel.get();
    const persons = await PersonModel.get();
    res.status(200).json({ groups, persons });
  } catch (err) {
    console.log(err.stack);
    res.status(500).send('Internal server error.');
  }
};

export default { get };
