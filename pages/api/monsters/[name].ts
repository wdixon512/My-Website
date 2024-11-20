import { NextApiRequest, NextApiResponse } from 'next';
import monstersJson from '../../../public/data/monsters.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  if (!name || typeof name !== 'string') {
    res.status(400).json({ error: 'Monster name is required.' });
    return;
  }

  const sanitizedName = name.replace(/-/g, ' ').replace(/_/g, ' ');
  const monster = monstersJson.monsters.find((mob) => mob.name.toLowerCase() === sanitizedName.toLowerCase());

  if (!monster) {
    res.status(404).json({ error: `Monster ${name} not found.` });
    return;
  }

  res.status(200).json(monster);
}
