import { prismaClient } from '../application/database.js';
import { addClothValidation } from '../validation/cloth-validation.js';
import { validate } from '../validation/validation.js';
import { v4 as uuid } from 'uuid';

const add = async (request) => {
  const cloth = validate(addClothValidation, request);

  cloth.createAt = new Date().toISOString();

  cloth.id = uuid().toString();

  console.log('cloth', cloth);
  return await prismaClient.cloth.create({
    data: cloth,
    select: {
      name: true,
    },
  });
};

const getAll = async () => {
  const clothes = await prismaClient.cloth.findMany({
    select: {
      name: true,
      image: true,
      price: true,
      stock: true,
      id: true,
    },
  });

  console.log('clothes', clothes);
  return clothes;
};

export default {
  add,
  getAll,
};
