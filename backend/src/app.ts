import express, {Express, Request, Response} from 'express';
import bodyParser from 'body-parser';

// Import routes
import authRoute from './routes/auth';
import userProtected from './authorisedRoute/authUser';
import authRoute2 from './routes/auth2';
import sequelize from './database/dbConfig';

const port = 8000;
const app: Express = express();

// Middleware
app.use(bodyParser.json());

// routes middleware 
app.use('/api/', authRoute);
app.use('/api/', userProtected);
app.use('/api/user', authRoute2);

// Sync Database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err: Error) => {
    console.error('Error synchronizing database:', err);
  });

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
})

