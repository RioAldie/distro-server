import clothService from '../service/cloth-service.js';

const add = async (req, res, next) => {
  try {
    const result = await clothService.add(req.body);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const result = await clothService.getAll();

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};
export default {
  add,
  getAll,
};
