import jwt from 'jsonwebtoken';

export const generateToken = (userId, role = 'buyer') => {
  const secret = process.env.JWT_SECRET || 'farmdirect_jwt_secret_dev_key_2026';
  return jwt.sign({ id: userId, role }, secret, {
    expiresIn: '30d'
  });
};
