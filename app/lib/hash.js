import bcrypt from 'bcrypt';

 module.exports= async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    // Handle any errors that may occur during hashing
    throw error;
  }
}