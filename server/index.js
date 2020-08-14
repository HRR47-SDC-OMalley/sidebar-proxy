const path = require('path');
const express = require('express');
const app = express();

const PORT = '3000';

const SLN_HOST = 'localhost';
const SLN_PORT = '3005';

app.use('/item/:id', express.static(path.resolve(__dirname, './../public')));

// Get the static files for Sln from the service
app.get('*/sln-assets/:asset', (req, res) => {
  res.redirect(`//${SLN_HOST}:${SLN_PORT}/sln-assets/${req.params.asset}`);
});

app.listen(PORT, () => console.log(`ReBurke listening at ${PORT}`));
