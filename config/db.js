const mongoose=require('mongoose');

const config =require('config');

const db=config.get('mongoURI');


const connectDb = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log('MongoDB Connected!');
	} catch (e) {
		console.log(e.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDb;