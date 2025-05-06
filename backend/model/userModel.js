const db = require('./db');

const createUser = (user, callback) => {
  const sql = 'INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [user.name, user.email, user.password, user.role || 'user'], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM user WHERE email = ?';
  db.query(sql, [email], callback);
};

const getAllUsers = callback => {
  db.query('SELECT id, name, email, role FROM user', callback);
};
const updateUser = (id, user, callback) => {
  const sql = 'UPDATE user SET name = ?, email = ?, role = ? WHERE id = ?';
  db.query(sql, [user.name, user.email, user.role, id], callback);
};


module.exports = {
  createUser,
  findUserByEmail,
  getAllUsers,
  updateUser
};
