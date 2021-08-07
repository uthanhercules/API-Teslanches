require('dotenv').config({ path: '../.env' });
const cors = require('cors');
const express = require('express');

const app = express();
const rotas = require('./rotas');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(rotas);

app.listen(8000);
