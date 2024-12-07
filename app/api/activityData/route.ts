import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://github-readme-stats.vercel.app/api?username=anuraghazra');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch data');
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'});
  }
}