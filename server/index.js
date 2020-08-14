const path = require('path');
const express = require('express');

const app = express();

app.use('/item/:id', express.static(path.resolve(__dirname, './../public')));

app.listen(3000, () => console.log(`ReBurke listening at 3000`));
