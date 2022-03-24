import dotenv from 'dotenv';

dotenv.config()

export const configuration = {
  port: Number(process.env.PORT || 3000),
  production: process.env.PRODUCTION === 'true',
}
