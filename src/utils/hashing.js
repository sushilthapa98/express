import bcrypt from 'bcrypt';

const SALT_FACTOR = 10;

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(SALT_FACTOR);
  return bcrypt.hash(password, salt);
}
