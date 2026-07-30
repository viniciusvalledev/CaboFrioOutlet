import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';
import { requireAdmin, JWT_SECRET } from '../middleware/auth';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const { password } = req.body as { password?: string };
  if (!password) {
    return res.status(400).json({ error: 'Informe a senha.' });
  }

  const admin = await prisma.admin.findUnique({ where: { id: 1 } });
  if (!admin) {
    return res.status(500).json({ error: 'Nenhum admin configurado. Rode o seed do banco.' });
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Senha incorreta.' });
  }

  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

authRouter.get('/me', requireAdmin, (_req, res) => {
  res.json({ ok: true });
});
