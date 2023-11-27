import { configDotenv } from 'dotenv';
configDotenv();

export const VERIFICATION_URL: string = process.env.VERIFY_URL
  ? process.env.VERIFY_URL
  : 'http://localhost:3000/api/auth/verify';

export const JWTSECRET: string = process.env.JWTSECRET
  ? process.env.JWTSECRET
  : 'billtracka';
export const JWTREFRESHSECRET: string = process.env.JWTREFRESHSECRET
  ? process.env.JWTREFRESHSECRET
  : 'billtracka';

export const RESETPASSWORD_URL: string = process.env.RESETPASSWORD_URL
  ? process.env.RESETPASSWORD_URL
  : 'http://localhost:3000/api/auth/reset-password';

export const PAYSTACK_SECRET_KEY: string = process.env.PAYSTACK_SECRET_KEY
  ? process.env.PAYSTACK_SECRET_KEY
  : 'sk_test_8f0b7b0b4b2b3b2b3b2b3b2b3b2b3b2b3b2b3b2b';
