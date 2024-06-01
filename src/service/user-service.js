import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { userValidation } from '../validation/user-validation.js';
import { validate } from '../validation/validation.js';
import bcrypt from 'bcrypt';

const register = async (request) => {
  const user = validate(userValidation, request);

  // check user exist
  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, 'User already exist!');
  }

  user.password = await bcrypt.hash(user.password, 10);

  return await prismaClient.user.create({
    data: user,
    select: {
      username: true,
      email: true,
    },
  });
};

export default { register };
