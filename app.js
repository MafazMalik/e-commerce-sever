const express = require('express');
const app = express();

const authApi = require('./routes/auth/auth.routes');
const productApi = require('./routes/product/product.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.append('Access-Control-Allow-Headers', '*');
    next();
});

app.listen(3000);

app.use('/api/auth', authApi);
app.use('/api/product', productApi);