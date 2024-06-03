import bcrypt from 'bcrypt';
import { prismaClient } from '../application/database';

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: 'test',
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: 'test',
      password: await bcrypt.hash('rahasia', 10),
      email: 'test@gmail.com',
      token: 'test',
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: 'test',
    },
  });
};
export const removeTestCloth = async () => {
  await prismaClient.cloth.deleteMany({
    where: {
      name: 'test-cloth',
    },
  });
};
