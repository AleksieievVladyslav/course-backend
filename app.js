import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { connect } from 'mongoose';
import {
  admin,
  user,
  organization,
  category,
  cloth,
} from './app/routers';
require('dotenv').config();

const app = express();

connect(`mongodb+srv://${process.env.MDB_LOGIN}:${process.env.MDB_PASSWORD}@cluster0-dnfdv.mongodb.net/database?retryWrites=true&w=majority`, { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`DB connected`));

app.use(cors())
app.use(morgan('dev'))
app.use(json())

app.use('/admin', admin);
app.use('/user', user);
app.use('/organization', organization);
app.use('/category', category);
app.use('/cloth', cloth);

export default app;