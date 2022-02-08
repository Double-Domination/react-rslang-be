/* eslint-disable no-unused-vars */
// const bcrypt = require('bcrypt');

const userService = require('./user.service');

// custom user registration
const userRegistration = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await userService.registerUser(email, password);
    // may be need some additional flags for https
    res.cookie('refresh token', userData.refreshToken, {
      maxAge: 525960 * 60,
      httpOnly: true
    });
    return res.json(userData);
  } catch (error) {
    console.log('error in userRegistration code');
    throw new Error(error);
  }
};

// custom log in
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await userService.authenticate(email, password);
    res.cookie('refresh token', userData.refreshToken, {
      maxAge: 525960 * 60,
      httpOnly: true
    });
    return res.json(userData);
  } catch (error) {
    throw new Error(error);
  }
};

// custom log out
const userLogout = async (req, res, next) => {
  try {
  } catch (error) {}
};

// custom token refresh
const userTokenRefresh = async (req, res, next) => {
  try {
  } catch (error) {}
};

// custom uswr activation
const userActivation = async (req, res, next) => {
  try {
  } catch (error) {}
};

// custom test aut function
const testLogin = async (req, res, next) => {
  try {
    console.log('triggered');
    res.json(['test json responce', 'payload1', 'payload2']);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  testLogin,
  userLogin,
  userRegistration,
  userLogout,
  userTokenRefresh,
  userActivation
};
