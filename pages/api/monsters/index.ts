import { NextApiRequest, NextApiResponse } from 'next';
import monstersJson from '../../../public/data/monsters.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(monstersJson);
}
