const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Pet = require('../../models/Pet');

//@route  GET api/profile/me
//@desc   Test route
//@access Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
			'name',
			'avatar'
		]);
		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route POST api/profile
//@desc Create or update user profile
//@access Private

router.post(
	'/',
	[ auth, [ check('location', ' Location is required').not().isEmpty() ] ],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { location, finder, adopter, company, facebook, twitter, instagram } = req.body;

		//Build profile object

		const profileFields = {};

		profileFields.user = req.user.id;
		if (location) profileFields.location = location;

		profileFields.finder = finder;
		profileFields.adopter = adopter;
		profileFields.company = company;

		//Build social object
		profileFields.social = {};

		if (facebook) profileFields.social.facebook = facebook;
		if (twitter) profileFields.social.twitter = twitter;
		if (instagram) profileFields.social.instagram = instagram;

		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				//Update
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}
			//Create
			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

//@route Get api/profile
//@desc Get all profiles
//@access Public

router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', [ 'name', 'avatar' ]);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route Get api/profile/user/:user_id
//@desc Get profile by User Id
//@access Public

router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [
			'name',
			'avatar'
		]);
		if (!profile) {
			return res.status(400).json({ msg: 'Profile not found' });
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' });
		}
		res.status(500).send('Server Error');
	}
});

//@route DELETE api/profile/user/:user_id
//@desc Delete profile User &posts
//@access Private

router.delete('/', auth, async (req, res) => {
	try {
		//Remove user pets
		await Pet.deleteMany({ user: req.user.id });
		//Remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		//Remove User
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
