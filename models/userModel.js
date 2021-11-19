

const { Schema, model } = require('mongoose');

let user = new Schema({
	name: { type: String, required: true },
	userName: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
},
	{
		toObject: {
			virtuals: true
		}
	});

	user.statics.findUser = async function(userName) {
		let user = await User.findOne({userName: req.body.userName})
		
		console.log(this);

	}

module.exports = model('users', user);