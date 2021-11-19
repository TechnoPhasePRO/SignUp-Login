const User = require('../models/userModel');

exports.getSignup = (req, res) => {
    res.render('signup');
}
exports.createUser = async(req, res) => {
	if (! req.body.name || !req.body.userName || !req.body.email || !req.body.password) {
		res.render('signup', {err: "Please provide all credentials"});
		return;
	}
	const user = new User({
        name: req.body.name,
		userName: req.body.userName,
		email: req.body.email,
        password: req.body.password
	});
	let isDuplicate = false;
	await user.save().catch((reason) => {
		res.render('signup', {err: "A user with this user name or email already exists"});
		isDuplicate = true;
		return
	});
	if (isDuplicate) {
		return
	}
	res.redirect(`/profile/?userName=${req.body.userName}`);
}
exports.getLogin = (req, res) => {
	res.render('login');
}
exports.login = async(req, res)=> {
	if (!req.body.userName || !req.body.password) {
		res.render('login', {err: "Please provide all credentials"});
		return;
	}
	let user = await User.findOne({userName: req.body.userName});
	console.log(user);
	if (user == null) {
		res.render('login', {err: "that user doesn't exist"});
		return;
	}
	if (user.password == req.body.password) {
		res.render('profile', {user: user.toObject()});
		return;
	}
	res.render('login', {err: "the entered password is incorrect"});
}
exports.getProfile = async(req, res) => {
	let user = await User.findOne({userName: req.query.userName});
	if (user == null) {
		res.render('profile', {err: "that user doesn't exist"});
		return;
	}
	res.render('profile', {user: user.toObject()});
}


// const {Router} = require('express');
// const router = Router();
// const User = require('../models/userModel');
// const userController = require('../controllers/userController')

// router.get('/', (req, res) => {
// 	res.render('index');
// });


// router.get('/signup', (req, res) => {
// 	res.render('signup');
// });

// router.get('/login', (req, res) => {
// 	res.render('login');
// });

// router.get('/profile/:username', async (req, res) => {
// 	let user = await User.findOne({ userName: req.params.username });
// 	if (user) {
// 		res.render('profile', { user: user.toObject() });
// 	} else {
// 		res.render('index', { err: 'User not found' });
// 	}
// });

// router.post('/login', async(req, res)=> {

// 	if (!req.body.userName || !req.body.password) {
// 		res.render('login', {err: "Please provide all credentials"});
// 		return;
// 	}
// 	let user = await User.findOne({userName: req.body.userName});
// 	console.log(user);
// 	if (user == null) {
// 		res.render('login', {err: "that user doesn't exist"});
// 		return;
// 	}
// 	if (user.password == req.body.password) {
// 		res.render('profile', {user: user.toObject()});
// 		return;
// 	}
// 	res.render('login', {err: "the entered password is incorrect"});
// });


// router.post('/signup', async(req, res) => {
// 	if (!req.body.name || !req.body.userName || !req.body.email || !req.body.password) {
// 		res.render('signup', {err: "Please provide all credentials"});
// 		return;
// 	}
// 	const user = new User({
//         name: req.body.name,
// 		userName: req.body.userName,
// 		email: req.body.email,
// 		password: req.body.password
// 	});
// 	let isDuplicate = false;
// 	await user.save().catch((reason) => {
// 		res.render('signup', {err: "A user with this user name or password already exists"});
// 		isDuplicate = true;
// 		return
// 	});
// 	if (isDuplicate) {
// 		return
// 	}
// 	res.redirect(`/profile/${req.body.userName}`);
// });



// module.exports = router;
