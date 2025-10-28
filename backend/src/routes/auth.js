import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

router.get('/', (_req, res) => {
  res.json({ message: 'Auth route connected successfully.' });
});

router.post('/register', (req, res) => {
  const { name = 'User', email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'MISSING_FIELDS' });
  const user = { id: 'u-' + Math.random().toString(36).slice(2), name, email };
  const accessToken = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ accessToken, user });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'MISSING_FIELDS' });
  const user = { id: 'u-dev', name: email.split('@')[0] || 'User', email };
  const accessToken = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ accessToken, user });
});

export default router;
