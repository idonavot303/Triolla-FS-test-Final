import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const cors = require('cors');

app.use(cors());

const PORT = 10000;

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  const events = await prisma.event.findMany();
  res.json(events);
});

app.post('/api/event', async (req: Request, res: Response) => {
  const { data } = req.body;
  const user = await prisma.event.create({
    data,
  });
  res.json(user);
});

app.put('/api/event/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: data,
    });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

app.delete('/api/event/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.event.delete({ where: { id: parseInt(id) } });
  res.status(204).send();
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
