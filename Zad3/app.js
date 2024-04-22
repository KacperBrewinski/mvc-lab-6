const express = require('express');
const session = require('express-session');
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

const app = express();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/books', bookRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
