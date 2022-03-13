const service = require('../services/userService');
const { readToken } = require('../auth');

const readOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await service.readOne(id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

const readAll = async (req, res) => {
  try {
    const users = await service.readAll();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

const createOne = async (req, res) => {
  try {
    const user = req.body;
    const token = await service.createOne(user);
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { authorization: token } = req.headers;
    const { email } = readToken(token);
    await service.deleteOne(email);
    return res.status(204).send();
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

module.exports = { readOne, readAll, createOne, deleteOne };