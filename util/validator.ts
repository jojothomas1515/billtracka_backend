import { BadRequest } from '../error/errors.js';

export function passwordValidator(password: string) {
  const containUppercase = /[A-Z]/;
  const containLowercase = /[a-z]/;
  const containDigit = /\d/;
  const validLength = /.{8,}/;
  if (!validLength.test(password)) {
    throw new BadRequest('Password must be of 8 or more length');
  }
  if (!containUppercase.test(password)) {
    throw new BadRequest('Password must contain uppercase character');
  }
  if (!containLowercase.test(password)) {
    throw new BadRequest('Password must contain lowercase character');
  }
  if (!containDigit.test(password)) {
    throw new BadRequest('Password must contain numeric character');
  }
}
