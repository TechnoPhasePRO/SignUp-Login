const express = require('express');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')})
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const userRouter = require('./routes/user');
mongoose.connect(`mongodb+srv://yraj01:yraj01@cluster0.x6n2j.mongodb.net/user?retryWrites=true&w=majority
`, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
	defaultLayout: 'layout',
	extname: 'hbs'
}));

app.set('view engine', '.hbs');

app.use('/', userRouter)


app.listen(port, () => console.log(`listening on port ${port}`));
