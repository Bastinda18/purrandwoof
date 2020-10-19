const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PetSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},

	name: {
		type: String,
		require: true
	},
	type: {
		type: String,
		require: true
	},
	age: {
		type: String
	},
	gender: {
		type: String
	},
	breed: {
		type: String
	},
	color: {
		type: String
	},
	description: {
		type: String
	},
	image: {
		type: Buffer
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user'
			}
		}
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user'
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Pet = mongoose.model('pet', PetSchema);
