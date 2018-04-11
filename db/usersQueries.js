const bcrypt = require('bcrypt');
const { db, queryDb } = require('./db');
const validator = require('validator');
const xss = require('xss'); // eslint-disable-line
/** * Get validation error asynchronously.
 * @param {Object} user - Note to create
 * @param {string} user.username - Username of user
 * @param {string} user.password- Password of user
 * @param {string} user.name - Name of user *
 * @returns Array including objects including field and error if valdiation errors are found.
 * */
async function validateNewUser({ username, password, name } = {}) {
  const user = await findByUsername(username);
  const validationArray = [];
  if (user) {
    validationArray.push({
      field: 'username',
      error: 'Notendanafn er þegar skráð',
    });
  }
  if (!validator.isByteLength(username, { min: 3 })) {
    validationArray.push({
      field: 'username',
      error: 'Notendanafn verður að vera amk 3 stafir',
    });
  }
  if (
    typeof password !== 'string' ||
    !validator.isByteLength(password, { min: 6 })
  ) {
    validationArray.push({
      field: 'username',
      error: 'Lykilorð verður að vera amk 6 stafir',
    });
  }
  if (!validator.isByteLength(name, { min: 1 })) {
    validationArray.push({ field: 'name', error: 'Nafn má ekki vera tómt' });
  }
  return validationArray;
}
/**
 * Read all users.
 *  @returns {Promise} Promise representing an array of all user objects
 */

async function readAll() {
  const query = 'SELECT * FROM users';
  try {
    const result = await queryDb(query, []);
    return result.rows;
  } catch (e) {
    console.error(e);
    return null;
  }
}
/**
 * Create a user asynchronously.
 * @param {Object} user - Note to create
 * @param {string} user.username - Username of user
 *  @param {string} user.password- Password of user
 *  @param {string} user.name - Name of user
 *  @param {string} user.age - Age of user
 *  @returns {Promise} Promise representing the object result of creating the note */

async function create({ username, password, name, age } = {}) {
  const query =
    'INSERT INTO users (username, password,name, age) VALUES ($1, $2, $3, $4) RETURNING *';
  const user = { username, password, name, age };
  const validation = await validateNewUser(user);
  if (validation.length > 0) {
    return {
      success: false,
      validation,
      data: null,
      message: 'Read validation message.',
    };
  }
  const hashedPassword = await bcrypt.hash(password, 11);
  const cleanArray = [xss(username), xss(hashedPassword), xss(name), xss(age)];
  const result = await queryDb(query, cleanArray);
  const { id } = result.rows[0];
  return {
    success: true,
    validation: [],
    data: { id, username, password, name, age },
    message: 'User created.',
  };
}
/**
 *  Get user by username.
 * @param {string} username - Username of user
 * @returns {Promise} Promise representing the note object or null if not found
 * */

async function findByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = $1';
  const result = await queryDb(query, [xss(username)]);
  console.log('result.rowCount', result.rowCount);
  if (result.rowCount > 0) {
    return result.rows[0];
  }
  return null;
}
async function comparePasswords(password, hash) {
  const result = await bcrypt.compare(password, hash);
  return result;
}
async function findByUsernameAndPassword({ username, password } = {}) {
  const user = await findByUsername(username);
  const passwordIsCorrect = await comparePasswords(password, user.password);
  if (passwordIsCorrect) {
    return user;
  }
  return null;
}
module.exports = { readAll, create, findByUsername, findByUsernameAndPassword };
