const bcrypt = require('bcrypt');

const uuid = require('uuid');

const mailService = require('../authentication/mail.service');

const UserDto = require('../../dtos/user-dto');

const usersRepo = require('./user.db.repository');
const tokenService = require('../token/token.service');
const settingsService = require('../settings/setting.service');
const statisticService = require('../statistics/statistic.service');
const { AUTHENTICATION_ERROR } = require('../../errors/appErrors');

const userModel = require('../users/user.model');

// exec user registration
const registerUser = async (email, password) => {
  const isExistedInDB = await userModel.findOne({ email });

  if (isExistedInDB) {
    throw new Error(`user with ${email} alredy exists in db`);
  }

  // const hashedPassword = await bcrypt.hash(password, 1);

  const confirmationLink = uuid.v4();

  const userAccount = await userModel.create({
    email,
    password
  });

  await mailService.sendConfirmationMail(email, confirmationLink);

  const userDto = new UserDto(userAccount);

  // pair of tokens
  const tokens = await tokenService.getTokens(userDto.id);
  // await tokenService.upsert(tokens.token);

  return {
    ...tokens,
    user: userDto
  };
};

const authenticate = async ({ email, password }) => {
  try {
    const userEntity = await usersRepo.getUserByEmail(email);
    const userDto = new UserDto(userEntity);

    console.log(password);

    // const hashedPassword = await bcrypt.hash(password, 3);
    // const isValidated = await bcrypt.compare(password, userEntity.password);
    const isValidated = await bcrypt.compare(password, userEntity.password);
    console.log(isValidated);
    // console.log(userEntity.password);
    // console.log(hashedPassword);
    if (!isValidated) {
      console.log('not equal');
      throw new AUTHENTICATION_ERROR();
    }

    const tokens = await tokenService.getTokens(userEntity._id);
    // FIXME: return user dto
    return { ...tokens, user: userDto };
  } catch (error) {
    throw new Error(error);
  }
};

const get = id => usersRepo.get(id);

const save = user => usersRepo.save(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = async id => {
  await statisticService.remove(id);
  await settingsService.remove(id);
  await usersRepo.remove(id);
};

module.exports = {
  authenticate,
  get,
  save,
  update,
  remove,
  registerUser
};
