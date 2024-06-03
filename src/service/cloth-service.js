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

export default {
  add,
};
