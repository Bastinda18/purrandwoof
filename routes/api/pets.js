const express = require('express');
const router = express.Router();
const sharp = require('sharp');

const multer = require('multer');

const auth = require('../../middleware/auth');

const config = require('config');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Pet = require('../../models/Pet');

//@route POST api/pets
//@desc Create a pet
//@access Private

router.post(
	'/',
	[
		auth,
		check('name', 'Name is required').not().isEmpty(),

		check('type', 'Type is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const { name, type, age, gender, breed, color, description } = req.body;

			//Build pets object

			const petFields = {};
			petFields.user = req.user.id;
			petFields.location = user.location;
			if (name) petFields.name = name;
			if (type) petFields.type = type;
			if (age) petFields.age = age;
			if (gender) petFields.gender = gender;
			if (breed) petFields.breed = breed;
			if (color) petFields.color = color;
			if (description) petFields.description = description;

			try {
				//Create
				pet = new Pet(petFields);
				await pet.save();
				res.json(pet);
			} catch (err) {
				console.error(err.message);
				res.status(500).send('Server Error');
			}
		} catch (err) {
			console.error(err);
			res.status(500).send('Server Error');
		}
	}
);

//@route GET api/pets
//@desc Get all pets
//@access Public

router.get('/', auth, async (req, res) => {
	try {
		const pets = await Pet.find().sort({ date: -1 }).select('-image');
		res.json(pets);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route GET api/pets/me
//@desc Get current users pets profiles
//@access Private

router.get('/me', auth, async (req, res) => {
	try {
		const myPets = await Pet.find({ user: req.user.id }).sort({ date: -1 }).select('-image');
		if (myPets.length === 0) {
			return res.status(400).json({ msg: 'There is no pets for this user' });
		}
		res.json(myPets);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route DELETE api/pets/:id
//@desc Delete a pet
//@access Private

router.delete('/:id', auth, async (req, res) => {
	try {
		const pet = await Pet.findById(req.params.id);

		if (!pet) {
			return res.status(404).json({ msg: 'Pet not found' });
		}

		//Check on a user
		if (pet.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}
		await pet.remove();

		const myPets = await Pet.find({ user: req.user.id }).sort({ date: -1 }).select('-image');

		res.json(myPets);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Pet not found' });
		}
		res.status(500).send('Server Error');
	}
});

//@route GET api/pets/:id
//@desc Get pets by pet id
//@access Public

router.get('/:id', async (req, res) => {
	try {
		const pet = await Pet.findById(req.params.id).select('-image');
		if (!pet) {
			return res.status(404).json({ msg: 'Pet not found' });
		}
		res.json(pet);
	} catch (err) {
		console.error(err.message);
		if (error.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Pet not found' });
		}
		res.status(500).send('Server Error');
	}
});

//@route POST api/pets/:id/picture
//@desc Create a pet avatar
//@access Private
const upload = multer({
	limits: {
		fileSize: 3000000
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('File must have .jpg or .png format'));
		}
		cb(undefined, true);
	}
});

router.post(
	'/:id/picture',
	auth,
	upload.single('image'),
	async (req, res) => {
		const buffer = await sharp(req.file.buffer)
			.resize({ width: 250, height: 250 })
			.png()
			.toBuffer();
		try {
			const pet = await Pet.findById(req.params.id);

			if (!pet) {
				return res.status(404).json({ msg: 'Pet not found' });
			}

			//Check on a user
			if (pet.user.toString() !== req.user.id) {
				return res.status(401).json({ msg: 'User not authorized' });
			}
			//Update

			pet.image = buffer;
			await pet.save();
			return res.json(pet);
		} catch (err) {
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ msg: 'Pet not found' });
			}
			res.status(500).send('Server Error');
		}
	},
	(error, req, res, next) => {
		res.status(400).send({ msg: error.message });
	}
);

//@route Delete api/pets/:id/picture
//@desc Delete a pet avatar
//@access Private
router.delete('/:id/picture', auth, async (req, res) => {
	try {
		const pet = await Pet.findById(req.params.id);

		if (!pet) {
			return res.status(404).json({ msg: 'Pet not found' });
		}

		//Check on a user
		if (pet.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}
		//Update

		pet.image = undefined;
		await pet.save();
		return res.json(pet);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Pet not found' });
		}
		res.status(500).send('Server Error');
	}
});
//@route GET api/pets/:id/picture
//@desc get a pet avatar
//@access Public

router.get('/:id/picture', async (req, res) => {
	try {
		const pet = await Pet.findById(req.params.id);

		if (!pet) {
			return res.status(404).json({ msg: 'Pet not found' });
		}
		if (!pet.image) {
			return res.status(404).json({ msg: 'Image not found' });
		}

		res.set('Content-Type', 'image/png');

		res.send(pet.image);
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Pet not found' });
		}
		res.status(500).send('Server Error');
	}
});

//@route PATCH api/pets/:id
//@desc Update a pet
//@access Private

router.patch('/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = [ 'name', 'type', 'age', 'gender', 'breed', 'color', 'description' ];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}

	try {
		const pet = await Pet.findById(req.params.id).select('-image');

		if (!pet) {
			return res.status(404).json({ msg: 'Pet not found' });
		}

		//Check on a user
		if (pet.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}
		//Update

		updates.forEach((update) => (pet[update] = req.body[update]));
		await pet.save();
		return res.json(pet);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Pet not found' });
		}
		res.status(500).send('Server Error');
	}
});

//++++++++++++++++++++LIKES AND COMMENTS++++++++++++++++++++++++

//@route PUT api/pets/like/:id
//@desc Like Pet
//@access Private

router.put('/like/:id', auth, async (req, res) => {
	try {
		const pet = await Pet.findById(req.params.id).select('-image');
		//Check if the pet already been liked by this user
		if (
			pet.likes.filter((like) => {
				return like.user.toString() === req.user.id;
			}).length > 0
		) {
			return res.status(400).json({ msg: 'Pet already liked' });
		}

		pet.likes.unshift({ user: req.user.id });

		await pet.save();
		res.json(pet.likes);
	} catch (e) {
		console.error(e.message);
		res.status(500).send('Server Error');
	}
});

//@route PUT api/pets/unlike/:id
//@desc Like Pet
//@access Private

router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const pet = await Pet.findById(req.params.id).select('-image');
		//Check if the pet already been liked by this user
		if (
			pet.likes.filter((like) => {
				return like.user.toString() === req.user.id;
			}).length === 0
		) {
			return res.status(400).json({ msg: 'Pet has not yet been liked' });
		}

		//Get remove index

		const removeIndex = pet.likes.map((like) => like.user.toString()).indexOf(req.user.id);

		pet.likes.splice(removeIndex, 1);

		await pet.save();
		res.json(pet.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route POST api/pets/comment/:id
//@desc Comment on a pet
//@access Private
router.post(
	'/comment/:id',
	[ auth, check('text', 'Text is required').not().isEmpty() ],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');

			const pet = await Pet.findById(req.params.id).select('-image');

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			};

			pet.comments.unshift(newComment);

			await pet.save();

			res.json(pet.comments);
		} catch (e) {
			console.error(e);
			res.status(500).send('Server Error');
		}
	}
);

//@route UPDATE api/pets/comment/:id/:comment_id
//@desc UPDATE comment
//@access Private

router.patch(
	'/comment/:id/:comment_id',
	[ auth, check('text', 'Text is required').not().isEmpty() ],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		}
		try {
			const pet = await Pet.findById(req.params.id).select('-image');

			//Pull out comment
			const comment = pet.comments.find((comment) => comment.id === req.params.comment_id);

			//Make sure comment exists
			if (!comment) {
				return res.status(404).json({ msg: 'Comment does not exist' });
			}

			//Check user

			if (comment.user.toString() !== req.user.id) {
				return res.status(401).json({ msg: 'User not authorized' });
			}

			comment.text = req.body.text;

			await pet.save();
			res.json(pet.comments);
		} catch (e) {
			console.error(e);
			res.status(500).send('Server Error');
		}
	}
);

//@route DELETE api/pets/comment/:id/:comment_id
//@desc Delete comment
//@access Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		const pet = await Pet.findById(req.params.id).select('-image');

		//Pull out comment
		const comment = pet.comments.find((comment) => comment.id === req.params.comment_id);

		//Make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}

		//Check user

		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		const removeIndex = pet.comments
			.map((comment) => comment.user.toString())
			.indexOf(req.user.id);

		pet.comments.splice(removeIndex, 1);

		await pet.save();
		res.json(pet.comments);
	} catch (e) {
		console.error(e);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
