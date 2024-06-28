import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_DIALECT,
} = process.env;

// Create a new instance of Sequelize with the necessary configurations
const sequelize = new Sequelize(DB_NAME as string, DB_USER as string, DB_PASS as string, {
  dialect: DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
  host: DB_HOST,
});

// Create a new instance of Sequelize with the necessary configurations
// const sequelize = new Sequelize('fullweb', 'root', '', {
//     dialect: 'mysql',
//     host: 'localhost',
// });

export default sequelize;
