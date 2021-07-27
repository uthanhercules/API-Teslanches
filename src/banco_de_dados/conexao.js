const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USUARIO,
  password: process.env.DB_SENHA,
  host: process.env.DB_HOST,
  database: process.env.DB_NOME,
  port: process.env.DB_PORTA,
});

const query = (text, param) => pool.query(text, param);

module.exports = {
  query,
};
